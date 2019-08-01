import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

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
}
