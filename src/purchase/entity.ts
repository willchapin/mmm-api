import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/entity';
import { Tag } from '../tag/entity';

@Entity()
export class Purchase {

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