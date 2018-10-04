import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user/entity';

@Entity()
export class Session {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

}
