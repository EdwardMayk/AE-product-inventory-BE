import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../entities/products.entity';
import { v4 as uuidv4 } from 'uuid';
import { ProductsInput, UpdateProductsInput } from '../dto/products-input';
import { CartItem } from '../entities/cart_item.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(CartItem)
    private readonly cartItemsRepository: Repository<CartItem>,
  ) {}

  async findByUuid(uuid: string): Promise<Products> {
    return this.productsRepository.findOne({
      where: { uuid: uuid },
    });
  }

  async findAll(): Promise<Products[]> {
    return this.productsRepository.find();
  }

  async create(args: ProductsInput) {
    const uuid = uuidv4();
    const newProduct = this.productsRepository.create({
      ...args,
      uuid,
    });
    return this.productsRepository.save(newProduct);
  }

  async update(args: UpdateProductsInput, uuid: string): Promise<any> {
    if (uuid) {
      const product = await this.productsRepository.findOne({
        where: { uuid: uuid },
      });
      if (product) {
        const updatedProduct = this.productsRepository.create({
          ...product,
          ...args,
        });
        return this.productsRepository.save(updatedProduct);
      }
    }
  }

  async delete(uuid: string): Promise<any> {
    const product = await this.productsRepository.findOne({
      where: { uuid: uuid },
    });
    if (!product) {
      return 'Product not found';
    }

    return this.productsRepository.delete({ uuid: uuid });
  }

  async addToCart(items: { uuid: string; quantity: number }[]): Promise<any> {
    const products = await this.productsRepository.findByIds(
      items.map((item) => item.uuid),
    );

    const insufficientStockItems = [];

    for (const item of items) {
      const product = products.find((p) => p.uuid === item.uuid);

      if (!product) {
        throw new NotFoundException(`Product not found: ${item.uuid}`);
      }

      if (product.stock < item.quantity) {
        insufficientStockItems.push(product.name);
      } else {
        const cartItem = new CartItem();
        cartItem.product = product;
        cartItem.quantity = item.quantity;

        // Guardar el objeto "CartItem" en la base de datos utilizando TypeORM
        await this.cartItemsRepository.save(cartItem);

        // Actualizar el stock del producto
        product.stock -= item.quantity;
        await this.productsRepository.save(product);
      }
    }

    if (insufficientStockItems.length > 0) {
      throw new BadRequestException(
        `Insufficient stock for items: ${insufficientStockItems.join(', ')}`,
      );
    }
  }
}
