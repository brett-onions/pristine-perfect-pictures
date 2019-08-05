import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Photographer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 75})
    firstName: string;

    @Column({ length: 75})
    lastName: string;

    @Column('double')
    rate: number;

    @OneToOne(type => User, {cascade: true})
    @JoinColumn()
    user: User;
}
