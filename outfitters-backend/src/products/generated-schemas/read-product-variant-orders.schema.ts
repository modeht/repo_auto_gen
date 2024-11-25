import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadMediaOrdersSchema, ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import { ReadOrderItemOrdersSchema, ReadOrderItemOrders } from '../../orders/generated-schemas/read-order-item-orders.schema'
import { ReadCartItemsOrdersSchema, ReadCartItemsOrders } from '../../carts/generated-schemas/read-cart-items-orders.schema'
import { ReadProductOrdersSchema, ReadProductOrders } from './read-product-orders.schema'
import { ReadProductOptionValueOrdersSchema, ReadProductOptionValueOrders } from './read-product-option-value-orders.schema'



export class ReadProductVariantOrders {isArchived?: OrderDirectionEnum | undefined;
stock?: OrderDirectionEnum | undefined;
price?: OrderDirectionEnum | undefined;
lastStockUpdate?: OrderDirectionEnum | undefined;
sku?: OrderDirectionEnum | undefined;
media?: ReadMediaOrders | OrderDirectionEnum | undefined;
orderItems?: ReadOrderItemOrders | OrderDirectionEnum | undefined;
carts?: ReadCartItemsOrders | OrderDirectionEnum | undefined;
mainProduct?: ReadProductOrders | OrderDirectionEnum | undefined;
optionValues?: ReadProductOptionValueOrders | OrderDirectionEnum | undefined;
mainProductId?: OrderDirectionEnum | undefined}

export const ReadProductVariantOrdersSchema: v.GenericSchema<ReadProductVariantOrders> = v.object({isArchived: v.undefinedable(OrderDirectionSchema),
stock: v.undefinedable(OrderDirectionSchema),
price: v.undefinedable(OrderDirectionSchema),
lastStockUpdate: v.undefinedable(OrderDirectionSchema),
sku: v.undefinedable(OrderDirectionSchema),
media: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
orderItems: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadOrderItemOrdersSchema)])),
carts: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCartItemsOrdersSchema)])),
mainProduct: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)])),
optionValues: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOptionValueOrdersSchema)])),
mainProductId: v.undefinedable(OrderDirectionSchema)})



export type TReadProductVariantOrdersSchemaOutput = v.InferOutput<typeof ReadProductVariantOrdersSchema>;
export type TReadProductVariantOrdersSchemaInput = v.InferInput<typeof ReadProductVariantOrdersSchema>;