import * as v from 'valibot';
import { ReadPromoCodeFiltersSchema } from './read-promo-code-filters.schema';
import { ReadPromoCodeRelationsSchema } from './read-promo-code-relations.schema';
export const ReadPromoCodeSchema = v.object({
filters: v.nullish(ReadPromoCodeFiltersSchema),
relations: v.nullish(ReadPromoCodeRelationsSchema),
});
export type TReadPromoCodeSchemaInput = v.InferInput<typeof ReadPromoCodeSchema>;
export type TReadPromoCodeSchemaOutput = v.InferOutput<typeof ReadPromoCodeSchema>;
