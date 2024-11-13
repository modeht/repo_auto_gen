import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateProductVariantEntityDto } from './generated-dtos/create/create-product-variant-entity.dto'
import { ProductVariantEntity } from './entities/product-variant.entity'

@Injectable()
export class ProductVariantService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateProductVariantEntityDto){
				return await this.service.create(ProductVariantEntity, CreateProductVariantEntityDto, body);
			}
		
}
