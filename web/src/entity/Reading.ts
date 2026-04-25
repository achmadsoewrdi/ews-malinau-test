import { Entity, PrimaryGeneratedColumn, Column, Index, Unique } from "typeorm";

@Entity("readings")
@Index(["sensorId", "timestamp"])
@Unique(["sensorId", "timestamp"])
export class Reading {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id!: number; // <-- Tambahkan tanda !

  @Column({ name: "sensor_id", type: "varchar", length: 10 })
  sensorId!: string; // <-- Tambahkan tanda !

  @Column({ type: "numeric", precision: 8, scale: 2 })
  value!: number; // <-- Tambahkan tanda !

  @Column({ type: "varchar", length: 10, default: "cm" })
  unit!: string; // <-- Tambahkan tanda !

  @Column({ type: "timestamptz" })
  timestamp!: Date; // <-- Tambahkan tanda !
}
