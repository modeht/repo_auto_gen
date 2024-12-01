import * as v from 'valibot';
import { ReadPaginationSchema } from "../../globals/schemas/pagination.schema"

import ReadSeasonalPromotionFiltersSchema from './read-seasonal-promotion-filters.schema';
import ReadSeasonalPromotionRelationsSchema from './read-seasonal-promotion-relations.schema';
import ReadSeasonalPromotionOrdersSchema from './read-seasonal-promotion-orders.schema';
const ReadSeasonalPromotionSchema = v.optional(v.object({
filters: v.optional(ReadSeasonalPromotionFiltersSchema),
relations: v.optional(ReadSeasonalPromotionRelationsSchema),
orders: v.optional(ReadSeasonalPromotionOrdersSchema),
pagination: v.optional(ReadPaginationSchema),
}));
export default ReadSeasonalPromotionSchema;
export type TReadSeasonalPromotionSchemaInput = v.InferInput<typeof ReadSeasonalPromotionSchema>;
export type TReadSeasonalPromotionSchemaOutput = v.InferOutput<typeof ReadSeasonalPromotionSchema>;
