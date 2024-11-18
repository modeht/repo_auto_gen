import * as v from 'valibot';
import { ReadCountryFiltersSchema } from './read-country-filters.schema';
import { ReadCountryRelationsSchema } from './read-country-relations.schema';
export const ReadCountrySchema = v.object({
filters: ReadCountryFiltersSchema,
relations: ReadCountryRelationsSchema,
});
export type TReadCountrySchemaInput = v.InferInput<typeof ReadCountrySchema>;
export type TReadCountrySchemaOutput = v.InferOutput<typeof ReadCountrySchema>;