import * as v from 'valibot';
import { ReadUserFiltersSchema } from './read-user-filters.schema';
import { ReadUserRelationsSchema } from './read-user-relations.schema';
export const ReadUserSchema = v.object({
filters: ReadUserFiltersSchema,
relations: ReadUserRelationsSchema,
});
export type TReadUserSchemaInput = v.InferInput<typeof ReadUserSchema>;
export type TReadUserSchemaOutput = v.InferOutput<typeof ReadUserSchema>;
