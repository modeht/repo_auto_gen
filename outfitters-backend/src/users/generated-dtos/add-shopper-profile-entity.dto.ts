import { IsString, IsOptional, IsDate, IsEnum, IsNumber, IsBoolean, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Relation } from '../../globals/decorators/relation.decorator';
import { IsOptionalIf } from '../../globals/validators/is-option-if.validator';
import { GenderEnum } from '../entities/shopper-profile.entity'
import { AddShopperProfileEntityUserEntityDto } from '../generated-dtos/add-shopper-profile-entity-user-entity.dto';
import { AddShopperProfileEntityProductReviewEntityDto } from '../../products/generated-dtos/add-shopper-profile-entity-product-review-entity.dto';
import { AddShopperProfileEntityShippingAddressEntityDto } from '../generated-dtos/add-shopper-profile-entity-shipping-address-entity.dto';
import { AddShopperProfileEntityMediaEntityDto } from '../../media/generated-dtos/add-shopper-profile-entity-media-entity.dto';
import { AddShopperProfileEntityCartEntityDto } from '../../carts/generated-dtos/add-shopper-profile-entity-cart-entity.dto';
import { AddShopperProfileEntityOrderEntityDto } from '../../orders/generated-dtos/add-shopper-profile-entity-order-entity.dto';
import { AddShopperProfileEntityPreferenceEntityDto } from '../../preferences/generated-dtos/add-shopper-profile-entity-preference-entity.dto';
import { AddShopperProfileEntityCollaborationEntityDto } from '../../collaborations/generated-dtos/add-shopper-profile-entity-collaboration-entity.dto';
import { AddShopperProfileEntityAffiliationLinkEntityDto } from '../../affiliation-links/generated-dtos/add-shopper-profile-entity-affiliation-link-entity.dto';
import { AddShopperProfileEntityPromoCodeEntityDto } from '../../promotions/generated-dtos/add-shopper-profile-entity-promo-code-entity.dto';
import { AffiliationLinkEntity } from '../../affiliation-links/entities/affiliation-link.entity'
import { CartEntity } from '../../carts/entities/cart.entity'
import { CollaborationEntity } from '../../collaborations/entities/collaboration.entity'
import { MediaEntity } from '../../media/entities/media.entity'
import { OrderEntity } from '../../orders/entities/order.entity'
import { PreferenceEntity } from '../../preferences/entities/preference.entity'
import { ProductReviewEntity } from '../../products/entities/product-review.entity'
import { ShippingAddressEntity } from '../entities/shipping-address.entity'
import { UserEntity } from '../entities/user.entity'
import { PromoCodeEntity } from '../../promotions/entities/promo-code.entity'



export class AddShopperProfileEntityDto {
@IsString()
@IsOptional()
username?: string | null;

@IsString()
@IsOptional()
fullName?: string | null;

@IsDate()
@Type(()=>Date)
dateOfBirth: Date;

@IsString()
bio: string;

@IsOptional()
@IsEnum(GenderEnum )
@IsEnum( null)
gender?: GenderEnum | null;

@IsNumber()
@IsOptional()
onboardingStep?: number | null;

@IsString()
@IsOptional()
facebookProfileLink?: string | null;

@IsString()
instagramProfileLink: string;

@IsString()
tiktokProfileLink: string;

@IsBoolean()
isOutfitter: boolean;

@IsOptional()
@Relation({entity:'UserEntity',type:'hasOne'})
@ValidateNested()
@Type(() => AddShopperProfileEntityUserEntityDto)
user?: AddShopperProfileEntityUserEntityDto| null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddShopperProfileEntityProductReviewEntityDto)
reviews?: AddShopperProfileEntityProductReviewEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddShopperProfileEntityShippingAddressEntityDto)
addresses?: AddShopperProfileEntityShippingAddressEntityDto[] | null;

@IsOptional()
@IsOptional()
@Relation({entity:'MediaEntity',type:'hasOne'})
@ValidateNested()
@Type(() => AddShopperProfileEntityMediaEntityDto)
profilePicture?: AddShopperProfileEntityMediaEntityDto | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddShopperProfileEntityCartEntityDto)
carts?: AddShopperProfileEntityCartEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddShopperProfileEntityOrderEntityDto)
orders?: AddShopperProfileEntityOrderEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddShopperProfileEntityPreferenceEntityDto)
preferences?: AddShopperProfileEntityPreferenceEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddShopperProfileEntityCollaborationEntityDto)
collaborations?: AddShopperProfileEntityCollaborationEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddShopperProfileEntityAffiliationLinkEntityDto)
affiliationLinks?: AddShopperProfileEntityAffiliationLinkEntityDto[] | null;

@IsOptional()
@IsOptional()
@ValidateNested({ each: true })
@Type(() => AddShopperProfileEntityPromoCodeEntityDto)
promoCodes?: AddShopperProfileEntityPromoCodeEntityDto[] | null;

@IsBoolean()
isFollowing: boolean;

@IsBoolean()
hasStory: boolean;

@IsNumber()
followersCount: number;

@IsNumber()
followingCount: number;

@IsNumber()
postsCount: number;

@IsNumber()
brandsCount: number;

@IsNumber()
engagementCount: number;
}
