import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../user/entity';

@Entity()
export class Session {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @Column()
    token: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

}
