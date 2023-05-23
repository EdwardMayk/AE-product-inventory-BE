import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.services';
import { Products } from './entities/products.entity';
import { CartItem } from './entities/cart_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, CartItem])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
