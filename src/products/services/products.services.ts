import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../entities/products.entity';
import { v4 as uuidv4 } from 'uuid';
import { ProductsInput, UpdateProductsInput } from '../dto/products-input';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
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

  async update(args: UpdateProductsInput): Promise<any> {
    const uuid = args.uuid;
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
}
