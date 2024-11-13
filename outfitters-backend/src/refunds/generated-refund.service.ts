import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AbstractService } from '../globals/services/abstract-service'
import { CreateRefundEntityDto } from './generated-dtos/create/create-refund-entity.dto'
import { RefundEntity } from './entities/refund.entity'

@Injectable()
export class RefundService {
  
  constructor(private datasource: DataSource, private service: AbstractService){}
  
			async createRow(body: CreateRefundEntityDto){
				return await this.service.create(RefundEntity, CreateRefundEntityDto, body);
			}
		
}
