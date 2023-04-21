import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { ProductsService } from '../services/products.services';
import { Products } from '../entities/products.entity';
import { ProductsInput, UpdateProductsInput } from '../dto/products-input';
import { Param } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('get-all')
  async findAll(): Promise<Products[]> {
    return this.productsService.findAll();
  }

  @Get('/:uuid')
  async findByUuid(@Param('uuid') uuid: string): Promise<Products> {
    const product = await this.productsService.findByUuid(uuid);
    if (!product) {
      throw new NotFoundException(`Product with UUID ${uuid} not found`);
    }
    return product;
  }

  @Post()
  async create(@Body() args: ProductsInput) {
    const products = this.productsService.create(args);
    return products;
  }

  @Post('update')
  async update(@Body() args: UpdateProductsInput) {
    const products = this.productsService.update(args);
    return products;
  }

  @Delete('delete/:uuid')
  async delete(@Param('uuid') uuid: string) {
    return this.productsService.delete(uuid);
  }
}
