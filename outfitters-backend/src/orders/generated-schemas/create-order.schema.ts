import * as v from 'valibot';
import { OrderPaymentMethod } from '<<pathToOriginal>>';
import { OrderPaymentStatusEnum } from '<<pathToOriginal>>';

export const CreateOrderSchema = v.pipe(v.object({totalSalePrice: v.nullish(v.number()),
totalPurchasePrice: v.nullish(v.number()),
totalShippingFees: v.nullish(v.number()),
cart: v.nullish(v.union([v.number(), v.object({promoCodeId: v.nullish(v.number()),
shopperId: v.nullish(v.number())})])),
brandOrders: v.nullish(v.union([v.array(v.number()), v.array(v.object({totalSalePrice: v.nullish(v.number()),
totalPurchasePrice: v.nullish(v.number()),
shippingFees: v.nullish(v.number()),
rating: v.nullish(v.number()),
review: v.nullish(v.string()),
expectedDeliveryDate: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
acceptedAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
shippedAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
deliveredAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
cancelledAt: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
orderId: v.number(),
brandId: v.number()}))])),
shippingAddress: v.nullish(v.union([v.number(), v.object({deletedAt: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
isDefault: v.boolean(),
name: v.string(),
country: v.string(),
city: v.string(),
street: v.string(),
apartment: v.string(),
address: v.string(),
floor: v.string(),
building: v.string(),
latitude: v.string(),
longitude: v.string(),
shopperId: v.number()})])),
shopperProfile: v.nullish(v.union([v.number(), v.object({username: v.nullish(v.string()),
fullName: v.nullish(v.string()),
dateOfBirth: v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp()),
bio: v.string(),
onboardingStep: v.nullish(v.number()),
facebookProfileLink: v.nullish(v.string()),
instagramProfileLink: v.string(),
tiktokProfileLink: v.string(),
isOutfitter: v.boolean(),
isFollowing: v.nullish(v.boolean()),
hasStory: v.nullish(v.boolean()),
followersCount: v.nullish(v.number()),
followingCount: v.nullish(v.number()),
postsCount: v.nullish(v.number()),
brandsCount: v.nullish(v.number()),
engagementCount: v.nullish(v.number())})])),
cartId: v.number(),
shippingAddressId: v.number(),
shopperId: v.number()}),v.metadata({cart: 'CartEntity',
brandOrders: 'BrandOrderEntity',
shippingAddress: 'ShippingAddressEntity',
shopperProfile: 'ShopperProfileEntity'}))

export type TCreateOrderSchema = v.InferInput<typeof CreateOrderSchema>
