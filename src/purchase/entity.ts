import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/entity';
import { Tag } from '../tag/entity';

@Entity()
export class Purchase {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
    })
    timestamp: Date;

    @Column()
    description: string;

    @Column()
    cost: number; // cents

    @ManyToOne(type => User, user => user.purchaces)
    user: User;

    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];

}
