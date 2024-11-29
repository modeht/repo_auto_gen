import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { searchMode } from '../entities/recent-searches.entity';
import ReadUserFiltersSchema, { ReadUserFiltersSchemaFilters } from '../../users/generated-schemas/read-user-filters.schema'



export class ReadRecentSearchesFiltersSchemaFilters {keyword?: GenericComparable<"string"> | null | undefined;
mode?: searchMode | null | undefined;
user?: ReadUserFiltersSchemaFilters | null | undefined;
userId?: GenericComparable<"number"> | null | undefined}

const ReadRecentSearchesFiltersSchema: v.GenericSchema<ReadRecentSearchesFiltersSchemaFilters> = v.object({keyword: v.nullish(comparable("string")),
mode: v.nullish(v.enum(searchMode)),
user: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
userId: v.nullish(comparable("number"))});

export default ReadRecentSearchesFiltersSchema;




export type TReadRecentSearchesFiltersSchemaOutput = v.InferOutput<typeof ReadRecentSearchesFiltersSchema>;
export type TReadRecentSearchesFiltersSchemaInput = v.InferInput<typeof ReadRecentSearchesFiltersSchema>;
