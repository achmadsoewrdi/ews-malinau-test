import { DataSource } from "typeorm";
import { Reading } from "./entity/Reading";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Reading],
  synchronize: false,
  logging: false,
});

export async function getInitializedDataSource(): Promise<DataSource> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
