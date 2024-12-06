import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadMediaFiltersSchema, {
	ReadMediaFiltersSchemaFilters,
} from '../../media/generated-schemas/read-media-filters.schema';
import ReadBrandProfileFiltersSchema, {
	ReadBrandProfileFiltersSchemaFilters,
} from '../../users/generated-schemas/read-brand-profile-filters.schema';

export class ReadCountryFiltersSchemaFilters {
	name?: GenericComparable<'string'> | null;
	code?: GenericComparable<'string'> | null;
	dialCode?: GenericComparable<'string'> | null;
	isSupported?: GenericComparable<'bool'> | null;
	icon?: ReadMediaFiltersSchemaFilters | null;
	brands?: ReadBrandProfileFiltersSchemaFilters | null;
	iconId?: GenericComparable<'number'> | null;
}

const ReadCountryFiltersSchema: v.GenericSchema<ReadCountryFiltersSchemaFilters> = v.object({
	name: v.nullish(comparable('string')),
	code: v.nullish(comparable('string')),
	dialCode: v.nullish(comparable('string')),
	isSupported: v.nullish(comparable('bool')),
	icon: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
	brands: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
	iconId: v.nullish(comparable('number')),
});

export default ReadCountryFiltersSchema;

export type TReadCountryFiltersSchemaOutput = v.InferOutput<typeof ReadCountryFiltersSchema>;
export type TReadCountryFiltersSchemaInput = v.InferInput<typeof ReadCountryFiltersSchema>;
