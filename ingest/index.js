const {Pool} = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const BATCH_SIZE = 500;

// awaitForDb()
async function waitForDb(){
    let connected = false;
    let retries = 5;
    while(!connected && retries > 0){
        try{
            console.log('[MENUNGGU CONNECT KE DATABASE]');
            const client = await pool.connect();
            client.release();
            connected = true;
            console.log('[BERHASIL CONNECT KE DATABASE]');
        }catch(err){
            console.log(`[GAGAK CONNECT KE DB] sisa percobaan: ${retries - 1}`);
            retries -= 1;
            await new Promise(res=> setTimeout(res,2000));
        }
    }

    if(!connected){
        throw new Error("[GAGAL TERHUBUNG KE DATABASE] setelah percobaan beberapa kali");
    }
}

// BuildBatchValue(): Mengubah array json menjadi quert string
function buildBatchValue(batch){
    let valuesString = [];
    let flatValues = [];
    let index = 1;

    for(const row of batch){
        // mengubah string menjadi parameter: ($1, $2, $3, $4)
        valuesString.push(`($${index++}, $${index++}, $${index++}, $${index++})`);
        flatValues.push(row.sensor_id, row.value, row.unit, row.timestamp);
    }

    return {queryText: valuesString.join(', '), values:flatValues}
}

// insertBatch(): Eksekusi perintah insert per 500 data
async function insertBatch(batch){
    const {queryText, values} = buildBatchValue(batch);
    const query = `
        INSERT INTO readings (sensor_id, value, unit, timestamp)
        VALUES ${queryText}
        ON CONFLICT (sensor_id, timestamp) DO NOTHING;
    `;

    await pool.query(query, values);
}

// main(): fungsi utama penggerak fungsi sebelumnya
async function main(){
    try{
        await waitForDb();

        console.log('[MEMBACA FILE READING JSON]');
        const dataPath = path.join(__dirname, 'readings.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const readings = JSON.parse(rawData);

        console.log(`[DITEMUKANN!] total ${readings.length} data. [MEMULAI PROSES BULK INSERT]`)

        let insertedBatch = 0;

        for(let i = 0; i< readings.length; i+=BATCH_SIZE){
            const batch = readings.slice(i, i + BATCH_SIZE);
            await insertBatch(batch);
            insertedBatch++;
        }

        console.log(`[INGEST SELESI]: ${readings.length} records berhasil di proses`);
    }catch(error){
        console.error("[KESALAHAN] terjadi kesalahan saat mengeksekusi ingest:", error);
    }finally{
        await pool.end();
    }
}

main();