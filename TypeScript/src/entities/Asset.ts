import {
  Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import Client from './Client';

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

  @ManyToMany(() => Client, (client) => client.assets)
  @JoinTable({
    name: 'assets_in_custody',
    joinColumn: {
      name: 'client_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'asset_id',
      referencedColumnName: 'id',
    },
  })
    clients: Client[];
}
