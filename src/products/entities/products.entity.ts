import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  AfterInsert,
  AfterRemove,
} from 'typeorm';

@Entity({ name: 'products' })
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  brand_car: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'float', nullable: true })
  price_buy: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image: string;

  //price
  @Column({ type: 'float' })
  price_sell: number;

  // // Método para disminuir el stock cuando se agrega un item al carrito
  // @AfterInsert()
  // decreaseStockAfterInsert() {
  //   if (this.stock > 0) {
  //     this.stock -= 1;
  //   }
  // }

  // // Método para aumentar el stock cuando se elimina un item del carrito
  // @AfterRemove()
  // increaseStockAfterRemove() {
  //   this.stock += 1;
  // }

  @Column()
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column()
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column()
  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
  })
  deletedAt: Date;
}
