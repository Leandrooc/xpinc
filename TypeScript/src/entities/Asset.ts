import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import AssetInCustody from './AssetInCustody';

@Entity('assets')
export default class Asset {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'text' })
    name: string;

  @Column({ type: 'integer' })
    quantity: number;

  @Column('decimal', { precision: 20, scale: 6 })
    value: number;

  @OneToMany(() => AssetInCustody, (AssetInC) => AssetInC.assetId)
    assetInCustody: AssetInCustody[];
}
