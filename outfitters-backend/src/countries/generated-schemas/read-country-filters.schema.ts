import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaFiltersSchema, ReadMediaFiltersSchemaFilters } from '../../media/generated-schemas/read-media-filters.schema'
import { ReadBrandProfileFiltersSchema, ReadBrandProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-brand-profile-filters.schema'

export class ReadCountryFiltersSchemaFilters {name?: GenericComparable<"string"> | null | undefined;
code?: GenericComparable<"string"> | null | undefined;
dialCode?: GenericComparable<"string"> | null | undefined;
isSupported?: GenericComparable<"bool"> | null | undefined;
icon?: ReadMediaFiltersSchemaFilters | null | undefined;
brands?: ReadBrandProfileFiltersSchemaFilters | null | undefined;
iconId?: GenericComparable<"number"> | null | undefined}

export const ReadCountryFiltersSchema: v.GenericSchema<ReadCountryFiltersSchemaFilters> = v.object({name: v.nullish(comparable("string")),
code: v.nullish(comparable("string")),
dialCode: v.nullish(comparable("string")),
isSupported: v.nullish(comparable("bool")),
icon: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
brands: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
iconId: v.nullish(comparable("number"))})



export type TReadCountrySchemaOutput = v.InferOutput<typeof ReadCountryFiltersSchema>;
export type TReadCountrySchemaInput = v.InferInput<typeof ReadCountryFiltersSchema>;