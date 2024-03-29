import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Products } from '../entities/products.entity';
import { v4 as uuidv4 } from 'uuid';
import { ProductsInput, UpdateProductsInput } from '../dto/products-input';
import { CartItem } from '../entities/cart_item.entity';
import { CartItemDTO } from '../dto/cart-item.dto';

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
  async findByUuids(uuids: string[]): Promise<Products[]> {
    return this.productsRepository.find({
      where: { uuid: In(uuids) },
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

  async addToCart(items: CartItemDTO[]): Promise<any> {
    const products = await this.findByUuids(items.map((item) => item.uuid));
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
        cartItem.uuid = uuidv4();
        cartItem.quantity = item.quantity;
        cartItem.amount = item.amount;
        cartItem.collection = item.collection;
        cartItem.address = item.address;
        cartItem.dni = item.dni;
        cartItem.date = item.date;
        cartItem.name = item.name;
        cartItem.marca = item.marca;
        cartItem.placa = item.placa;

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

  async getCartItems(): Promise<CartItem[]> {
    return this.cartItemsRepository.find();
  }

  async deleteCartItem(uuid: string): Promise<any> {
    const cartItem = await this.cartItemsRepository.findOne({
      where: { uuid: uuid },
    });
    if (!cartItem) {
      return 'CartItem not found';
    }

    const product = await this.productsRepository.findOne({
      where: { uuid: cartItem.product.uuid },
    });

    product.stock += cartItem.quantity;
    await this.productsRepository.save(product);

    return this.cartItemsRepository.delete({ uuid: uuid });
  }
}
