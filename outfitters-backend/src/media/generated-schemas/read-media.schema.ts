import * as v from 'valibot';
import { ReadMediaFiltersSchema } from './read-media-filters.schema';
import { ReadMediaRelationsSchema } from './read-media-relations.schema';
export const ReadMediaSchema = v.object({
filters: v.nullish(ReadMediaFiltersSchema),
relations: v.nullish(ReadMediaRelationsSchema),
});
export type TReadMediaSchemaInput = v.InferInput<typeof ReadMediaSchema>;
export type TReadMediaSchemaOutput = v.InferOutput<typeof ReadMediaSchema>;
