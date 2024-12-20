import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadMediaFiltersSchema, {
	ReadMediaFiltersSchemaFilters,
} from '../../media/generated-schemas/read-media-filters.schema';
import ReadBrandProfileFiltersSchema, {
	ReadBrandProfileFiltersSchemaFilters,
} from '../../users/generated-schemas/read-brand-profile-filters.schema';
import ReadShopperProfileFiltersSchema, {
	ReadShopperProfileFiltersSchemaFilters,
} from '../../users/generated-schemas/read-shopper-profile-filters.schema';

export class ReadPreferenceFiltersSchemaFilters {
	media?: ReadMediaFiltersSchemaFilters | null;
	name?: GenericComparable<'string'> | null;
	brandProfile?: ReadBrandProfileFiltersSchemaFilters | null;
	shopperProfile?: ReadShopperProfileFiltersSchemaFilters | null;
	mediaId?: GenericComparable<'number'> | null;
}

const ReadPreferenceFiltersSchema: v.GenericSchema<ReadPreferenceFiltersSchemaFilters> = v.object({
	media: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
	name: v.nullish(comparable('string')),
	brandProfile: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
	shopperProfile: v.nullish(v.lazy(() => ReadShopperProfileFiltersSchema)),
	mediaId: v.nullish(comparable('number')),
});

export default ReadPreferenceFiltersSchema;

export type TReadPreferenceFiltersSchemaOutput = v.InferOutput<typeof ReadPreferenceFiltersSchema>;
export type TReadPreferenceFiltersSchemaInput = v.InferInput<typeof ReadPreferenceFiltersSchema>;
