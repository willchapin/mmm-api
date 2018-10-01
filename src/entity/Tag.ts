import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(["name"])
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
