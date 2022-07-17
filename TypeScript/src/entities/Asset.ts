import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('assets')
export default class Asset {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'text' })
    name: string;

  @Column({ type: 'integer' })
    quantity: number;

  @Column({ type: 'decimal' })
    value: number;
}
