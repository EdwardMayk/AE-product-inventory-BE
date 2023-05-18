import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class ProductsInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  brand_car: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price_buy: number;

  //price_sell
  @IsNotEmpty()
  @IsNumber()
  price_sell: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsString()
  image: string;
}

export class UpdateProductsInput extends PartialType(ProductsInput) {}
