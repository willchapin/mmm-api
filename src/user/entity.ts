import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import { Purchase } from '../purchase/entity';

@Entity()
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() // index here
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => Purchase, purchase => purchase.user)
    purchaces: Purchase[];

}
