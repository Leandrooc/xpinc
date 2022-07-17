import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export default class Client {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'text' })
    name: string;

  @Column({ type: 'text' })
    email: string;

  @Column({ type: 'decimal' })
    balance: number;
}
