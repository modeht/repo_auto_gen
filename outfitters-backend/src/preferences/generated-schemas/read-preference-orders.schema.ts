import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { ReadMediaOrdersSchema, ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import { ReadBrandProfileOrdersSchema, ReadBrandProfileOrders } from '../../users/generated-schemas/read-brand-profile-orders.schema'
import { ReadShopperProfileOrdersSchema, ReadShopperProfileOrders } from '../../users/generated-schemas/read-shopper-profile-orders.schema'



export class ReadPreferenceOrders {media?: ReadMediaOrders | OrderDirectionEnum | undefined;
brandProfile?: ReadBrandProfileOrders | OrderDirectionEnum | undefined;
shopperProfile?: ReadShopperProfileOrders | OrderDirectionEnum | undefined}

export const ReadPreferenceOrdersSchema: v.GenericSchema<ReadPreferenceOrders> = v.object({media: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
brandProfile: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadBrandProfileOrdersSchema)])),
shopperProfile: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadShopperProfileOrdersSchema)]))})



export type TReadPreferenceOrdersSchemaOutput = v.InferOutput<typeof ReadPreferenceOrdersSchema>;
export type TReadPreferenceOrdersSchemaInput = v.InferInput<typeof ReadPreferenceOrdersSchema>;
