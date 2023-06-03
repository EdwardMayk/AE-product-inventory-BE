import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CartItemDTO {
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  //collection concept
  @IsNotEmpty()
  @IsString()
  collection: string;

  //amount
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
