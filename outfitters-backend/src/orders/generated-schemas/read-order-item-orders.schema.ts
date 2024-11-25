import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadBrandOrderOrdersSchema, ReadBrandOrderOrders } from './read-brand-order-orders.schema'
import { ReadProductVariantOrdersSchema, ReadProductVariantOrders } from '../../products/generated-schemas/read-product-variant-orders.schema'
import { ReadProductOrdersSchema, ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'
import { ReadPromoCodeOrdersSchema, ReadPromoCodeOrders } from '../../promotions/generated-schemas/read-promo-code-orders.schema'
import { ReadPromotionOrdersSchema, ReadPromotionOrders } from '../../promotions/generated-schemas/read-promotion-orders.schema'



export class ReadOrderItemOrders {brandOrder?: ReadBrandOrderOrders | OrderDirectionEnum | undefined;
variant?: ReadProductVariantOrders | OrderDirectionEnum | undefined;
product?: ReadProductOrders | OrderDirectionEnum | undefined;
appliedPromoCode?: ReadPromoCodeOrders | OrderDirectionEnum | undefined;
appliedPromotions?: ReadPromotionOrders | OrderDirectionEnum | undefined}

export const ReadOrderItemOrdersSchema: v.GenericSchema<ReadOrderItemOrders> = v.object({brandOrder: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandOrderOrdersSchema)])),
variant: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductVariantOrdersSchema)])),
product: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
appliedPromoCode: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPromoCodeOrdersSchema)])),
appliedPromotions: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPromotionOrdersSchema)]))})



export type TReadOrderItemOrdersSchemaOutput = v.InferOutput<typeof ReadOrderItemOrdersSchema>;
export type TReadOrderItemOrdersSchemaInput = v.InferInput<typeof ReadOrderItemOrdersSchema>;
