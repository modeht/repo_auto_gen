import * as v from 'valibot';
import { ReadShippingAddressFiltersSchema } from './read-shipping-address-filters.schema';
import { ReadShippingAddressRelationsSchema } from './read-shipping-address-relations.schema';
import { ReadShippingAddressOrdersSchema } from './read-shipping-address-orders.schema';
export const ReadShippingAddressSchema = v.object({
filters: v.undefinedable(ReadShippingAddressFiltersSchema),
relations: v.undefinedable(ReadShippingAddressRelationsSchema),
orders: v.undefinedable(ReadShippingAddressOrdersSchema),
});
export type TReadShippingAddressSchemaInput = v.InferInput<typeof ReadShippingAddressSchema>;
export type TReadShippingAddressSchemaOutput = v.InferOutput<typeof ReadShippingAddressSchema>;
