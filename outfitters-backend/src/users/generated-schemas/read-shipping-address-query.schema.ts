import * as v from 'valibot';
import { ReadPaginationSchema } from '../../globals/schemas/pagination.schema';

import ReadShippingAddressFiltersSchema from './read-shipping-address-filters.schema';
import ReadShippingAddressRelationsSchema from './read-shipping-address-relations.schema';
import ReadShippingAddressOrdersSchema from './read-shipping-address-orders.schema';
const ReadShippingAddressSchema = v.optional(
	v.object({
		filters: v.optional(ReadShippingAddressFiltersSchema),
		relations: v.optional(ReadShippingAddressRelationsSchema),
		orders: v.optional(ReadShippingAddressOrdersSchema),
		pagination: v.optional(ReadPaginationSchema, { skip: 0, take: 25 }),
	}),
);
export default ReadShippingAddressSchema;
export type TReadShippingAddressSchemaInput = v.InferInput<typeof ReadShippingAddressSchema>;
export type TReadShippingAddressSchemaOutput = v.InferOutput<typeof ReadShippingAddressSchema>;
