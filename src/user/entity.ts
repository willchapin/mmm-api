import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Purchase } from '../purchase/entity';

@Entity()
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @OneToMany(type => Purchase, purchase => purchase.user)
    purchaces: Purchase[];

}
