import * as v from 'valibot';
import { ReadPaginationSchema } from '../../globals/schemas/pagination.schema';
import { ReadCountryFiltersSchema } from './read-country-filters.schema';
import { ReadCountryRelationsSchema } from './read-country-relations.schema';
import { ReadCountryOrdersSchema } from './read-country-orders.schema';

export const ReadCountrySchema = v.object({
	filters: v.undefinedable(ReadCountryFiltersSchema),
	relations: v.undefinedable(ReadCountryRelationsSchema),
	orders: v.undefinedable(ReadCountryOrdersSchema),
	pagination: v.undefinedable(ReadPaginationSchema),
});

export type TReadCountrySchemaInput = v.InferInput<typeof ReadCountrySchema>;
export type TReadCountrySchemaOutput = v.InferOutput<typeof ReadCountrySchema>;
