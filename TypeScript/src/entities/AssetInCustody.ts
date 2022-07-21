import {
  Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import Asset from './Asset';
import Client from './Client';

@Entity('assets_in_custody')
export default class AssetInCustody {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'integer' })
    quantity: number;

  @ManyToOne(() => Client, (client: Client) => client.assetInCustody)
  @JoinColumn({ name: 'client_id' })
    clientId: number;

  @ManyToOne(() => Asset, (asset: Asset) => asset.assetInCustody)
  @JoinColumn({ name: 'asset_id' })
    assetId: number;
}
