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

  //name of client
  @IsNotEmpty()
  @IsString()
  name: string;

  //address
  @IsNotEmpty()
  @IsString()
  address: string;

  //dni or ruc
  @IsNotEmpty()
  @IsString()
  dni: string;

  //placa
  @IsNotEmpty()
  @IsString()
  placa: string;

  //marca
  @IsNotEmpty()
  @IsString()
  marca: string;

  //date
  @IsNotEmpty()
  @IsString()
  date: string;
}
