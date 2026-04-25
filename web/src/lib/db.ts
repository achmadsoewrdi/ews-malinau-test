import { DataSource } from "typeorm";
import { getInitializedDataSource } from "../data-source";

export async function getDataSource(): Promise<DataSource> {
  return getInitializedDataSource();
}
