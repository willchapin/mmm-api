import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Purchace } from './Purchase';

@Entity()
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @OneToMany(type => Purchace, purchace => purchace.user)
    purchaces: Purchace[];

}
