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

  @Column({ type: 'int' })
  quantity: number;
}
