import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateApartmentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  areaSize: number;

  @IsString()
  @IsNotEmpty()
  roomNo: string;

  @IsNotEmpty()
  @IsUrl()
  previewImage: string;
}
