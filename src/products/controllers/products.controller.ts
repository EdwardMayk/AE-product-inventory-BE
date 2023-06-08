import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Put,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ProductsService } from '../services/products.services';
import { Products } from '../entities/products.entity';
import { ProductsInput, UpdateProductsInput } from '../dto/products-input';
import { Param } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CartItemDTO } from '../dto/cart-item.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('products')
  async findAll(): Promise<Products[]> {
    return this.productsService.findAll();
  }

  @Get('products/:uuid')
  async findByUuid(@Param('uuid') uuid: string): Promise<Products> {
    const product = await this.productsService.findByUuid(uuid);
    if (!product) {
      throw new NotFoundException(`Product with UUID ${uuid} not found`);
    }
    return product;
  }

  @Post('products')
  async create(@Body() args: ProductsInput) {
    const products = this.productsService.create(args);
    return products;
  }

  @Put('update/:uuid')
  async update(@Body() args: UpdateProductsInput, @Param('uuid') uuid: string) {
    const products = this.productsService.update(args, uuid);
    return products;
  }

  @Delete('delete/:uuid')
  async delete(@Param('uuid') uuid: string) {
    return this.productsService.delete(uuid);
  }

  @Post('addToCart')
  async addToCart(@Body() items: CartItemDTO[]): Promise<any> {
    try {
      await this.productsService.addToCart(items);
      return { message: 'Products added to cart successfully' };
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to add products to cart', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('cart')
  async getCart(): Promise<any> {
    try {
      const cart = await this.productsService.getCartItems();
      return cart;
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to get cart', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('cart/:uuid')
  async deleteCartItem(@Param('uuid') uuid: string): Promise<any> {
    try {
      await this.productsService.deleteCartItem(uuid);
      return { message: 'Cart item deleted successfully' };
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to delete cart item', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
