import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import { ReadStoryFiltersSchema } from './read-story-filters.schema';
import { ReadStoryRelationsSchema } from './read-story-relations.schema';
import { ReadStoryOrdersSchema } from './read-story-orders.schema';
export const ReadStorySchema = v.object({
filters: v.undefinedable(ReadStoryFiltersSchema),
relations: v.undefinedable(ReadStoryRelationsSchema),
orders: v.undefinedable(ReadStoryOrdersSchema),
pagination: ReadPaginationSchema,
});
export type TReadStorySchemaInput = v.InferInput<typeof ReadStorySchema>;
export type TReadStorySchemaOutput = v.InferOutput<typeof ReadStorySchema>;
