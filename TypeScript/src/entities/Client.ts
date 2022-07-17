import {
  Column, Entity, ManyToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import Asset from './Asset';

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

  @ManyToMany(() => Asset, (asset) => asset.clients)
    assets: Asset[];
}
