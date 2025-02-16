import { Injectable } from '@nestjs/common';
//import { CreateProductDto } from './dto/create-product.dto';
//import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }
  // Varias posibilidades

  /*  findOne(id: number): Promise<Product | null> {
    return this.productsRepository.findOne({ where: { id } });
  } */
  //*********************

  /* async findOne(id: number): Promise<Product> {
  return this.productsRepository.findOneOrFail({ where: { id } });
} */
  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(
    createProductDto: CreateProductDto,
    imageUrl: string,
  ): Promise<Product> {
    console.log(createProductDto);
    const product = this.productsRepository.create({
      ...createProductDto,
      imageUrl,
    });
    return this.productsRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<void> {
    await this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
