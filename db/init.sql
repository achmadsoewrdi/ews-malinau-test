-- Membuat tabel readings jika belum ada
CREATE TABLE IF NOT EXISTS readings (
    id SERIAL PRIMARY KEY,
    sensor_id VARCHAR(50) NOT NULL,
    value NUMERIC(8, 2) NOT NULL,
    unit VARCHAR(10) NOT NULL DEFAULT 'cm',
    timestamp TIMESTAMPTZ NOT NULL
);

-- Index untuk mempercepat query saat mengambil data 24 jam terakhir per sensor
CREATE INDEX IF NOT EXISTS idx_readings_sensor_timestamp 
ON readings (sensor_id, timestamp DESC);

-- Unique index untuk memastikan data tidak ter-duplikasi (idempotent)
CREATE UNIQUE INDEX IF NOT EXISTS idx_readings_unique 
ON readings (sensor_id, timestamp);
