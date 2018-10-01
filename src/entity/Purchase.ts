import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';
import { Tag } from './Tag';

@Entity()
export class Purchace {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @ManyToOne(type => User, user => user.purchaces)
    user: User;

    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];

}
