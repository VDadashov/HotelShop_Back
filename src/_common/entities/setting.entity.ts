import { Entity, Column } from "typeorm";
import { BaseEntity } from "./_base/base.entity";

@Entity("settings")
export class Setting extends BaseEntity {
  @Column({ type: "varchar", unique: true })
  key: string;

  @Column({ type: "jsonb" })
  value: any;
}
