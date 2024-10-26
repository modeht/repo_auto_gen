import { IsDate, IsString, IsNumber, IsOptional, IsEnum, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { AddPromoCodeEntityCartEntityDto } from '../../carts/generated-dtos/add-promo-code-entity-cart-entity.dto';
import { AddPromoCodeEntityOrderItemEntityDto } from '../../orders/generated-dtos/add-promo-code-entity-order-item-entity.dto';
import { AddPromoCodeEntityBrandProfileEntityDto } from '../../users/generated-dtos/add-promo-code-entity-brand-profile-entity.dto';
import { AddPromoCodeEntityShopperProfileEntityDto } from '../../users/generated-dtos/add-promo-code-entity-shopper-profile-entity.dto';
import { AddPromoCodeEntityProductEntityDto } from '../../products/generated-dtos/add-promo-code-entity-product-entity.dto';
import { ProductEntity } from '../../products/entities/product.entity'
import { BrandProfileEntity } from '../../users/entities/brand-profile.entity'
import { ShopperProfileEntity } from '../../users/entities/shopper-profile.entity'
import { CartEntity } from '../../carts/entities/cart.entity'
import { OrderItemEntity } from '../../orders/entities/order-item.entity'
import { PromotionStatusEnum, PromotionTypeEnum } from '../entities/enums'



export class AddPromoCodeEntityDto {
@IsDate()
@Type(()=>Date)
deletedAt: Date;

@IsString()
code: string;

@IsString()
title: string;

@IsNumber()
@IsOptional()
minPurchaseAmount?: number | null;

@IsNumber()
@IsOptional()
perUserLimit?: number | null;

@IsNumber()
@IsOptional()
totalLimit?: number | null;

@IsDate()
@Type(()=>Date)
start: Date;

@IsDate()
@Type(()=>Date)
end: Date;

@IsNumber()
discountPercentage: number;

@IsEnum(PromotionTypeEnum)
type: PromotionTypeEnum;

@IsEnum(PromotionStatusEnum)
status: PromotionStatusEnum;

@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddPromoCodeEntityCartEntityDto)
carts?: AddPromoCodeEntityCartEntityDto[]| null;

@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddPromoCodeEntityOrderItemEntityDto)
orderItems?: AddPromoCodeEntityOrderItemEntityDto[]| null;

@IsOptional()
@ValidateNested()
@Type(() => AddPromoCodeEntityBrandProfileEntityDto)
brand?: AddPromoCodeEntityBrandProfileEntityDto| null;

@IsOptional()
@ValidateNested()
@Type(() => AddPromoCodeEntityShopperProfileEntityDto)
shopperProfile?: AddPromoCodeEntityShopperProfileEntityDto| null;

@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddPromoCodeEntityProductEntityDto)
products?: AddPromoCodeEntityProductEntityDto[]| null;

@IsNumber()
brandId: number;

@IsNumber()
shopperId: number;

@IsNumber()
ussageCount: number;

@IsNumber()
totalMoneyDeducted: number;
}
