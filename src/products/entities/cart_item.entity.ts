import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Products } from './products.entity';

@Entity({ name: 'cart_items' })
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @ManyToOne(() => Products)
  product: Products;

  @Column({ type: 'int', nullable: true })
  quantity: number;

  @Column({ type: 'int', nullable: true })
  amount: number;

  @Column({ type: 'varchar', nullable: true })
  collection: string;

  //name of client
  @Column({ type: 'varchar', nullable: true })
  name: string;

  //address
  @Column({ type: 'varchar', nullable: true })
  address: string;

  //dni or ruc
  @Column({ type: 'varchar', nullable: true })
  dni: string;

  //placa
  @Column({ type: 'varchar', nullable: true })
  placa: string;

  //marca
  @Column({ type: 'varchar', nullable: true })
  marca: string;

  //date
  @Column({ type: 'varchar', nullable: true })
  date: string;
}
