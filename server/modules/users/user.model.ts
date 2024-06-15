import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 50,
    nullable: false,
    type: "varchar",
  })
  email: string;

  @Column({
    nullable: false,
    type: "varchar",
  })
  password: string;
}
