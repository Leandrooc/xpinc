import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import AssetInCustody from './AssetInCustody';

@Entity('clients')
export default class Client {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'text' })
    name: string;

  @Column({ type: 'text' })
    email: string;

  @Column({ type: 'text' })
    password: string;

  @Column('decimal', { precision: 20, scale: 6, default: 0 })
    balance: number;

  @OneToMany(() => AssetInCustody, (AssetInC) => AssetInC.clientId)
    assetInCustody: AssetInCustody[];
}
