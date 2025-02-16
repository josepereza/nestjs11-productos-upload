import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => {
    // Convierte el valor a número
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      throw new Error('Price must be a valid number');
    }
    return numericValue;
  })
  price: number;
}
