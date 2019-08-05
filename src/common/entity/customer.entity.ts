import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    firstName: string;

    @Column({length: 50})
    lastName: string;

    @OneToOne(type => User, {cascade: true})
    @JoinColumn()
    user: User;
}
