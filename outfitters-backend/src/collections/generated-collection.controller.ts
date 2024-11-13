import { Controller, Post, Body } from '@nestjs/common';
import { CreateCollectionEntityDto } from './generated-dtos/create/create-collection-entity.dto'
import { CollectionService } from './generated-collection.service'

@Controller('collection')
export class CollectionController {
  
  constructor(private service: CollectionService){}
  
			@Post()
			async create(@Body() body: CreateCollectionEntityDto){
				return this.service.createRow(body);
			}
		
}
