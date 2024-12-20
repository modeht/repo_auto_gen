import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadMediaFiltersSchema, {
	ReadMediaFiltersSchemaFilters,
} from '../../media/generated-schemas/read-media-filters.schema';
import ReadTaggedProductFiltersSchema, {
	ReadTaggedProductFiltersSchemaFilters,
} from '../../products/generated-schemas/read-tagged-product-filters.schema';
import ReadUserFiltersSchema, {
	ReadUserFiltersSchemaFilters,
} from '../../users/generated-schemas/read-user-filters.schema';
import ReadStoryLikesFiltersSchema, { ReadStoryLikesFiltersSchemaFilters } from './read-story-likes-filters.schema';
import ReadMessageFiltersSchema, {
	ReadMessageFiltersSchemaFilters,
} from '../../messages/generated-schemas/read-message-filters.schema';

export class ReadStoryFiltersSchemaFilters {
	background?: GenericComparable<'string'> | null;
	text?: GenericComparable<'string'> | null;
	media?: ReadMediaFiltersSchemaFilters | null;
	taggedProducts?: ReadTaggedProductFiltersSchemaFilters | null;
	postedBy?: ReadUserFiltersSchemaFilters | null;
	taggedUsers?: ReadUserFiltersSchemaFilters | null;
	likedByUsers?: ReadStoryLikesFiltersSchemaFilters | null;
	shares?: ReadMessageFiltersSchemaFilters | null;
	postedById?: GenericComparable<'number'> | null;
	taggedProductsCount?: GenericComparable<'number'> | null;
	taggedUsersCount?: GenericComparable<'number'> | null;
	isLiked?: GenericComparable<'bool'> | null;
	isViewed?: GenericComparable<'bool'> | null;
}

const ReadStoryFiltersSchema: v.GenericSchema<ReadStoryFiltersSchemaFilters> = v.object({
	background: v.nullish(comparable('string')),
	text: v.nullish(comparable('string')),
	media: v.nullish(v.lazy(() => ReadMediaFiltersSchema)),
	taggedProducts: v.nullish(v.lazy(() => ReadTaggedProductFiltersSchema)),
	postedBy: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	taggedUsers: v.nullish(v.lazy(() => ReadUserFiltersSchema)),
	likedByUsers: v.nullish(v.lazy(() => ReadStoryLikesFiltersSchema)),
	shares: v.nullish(v.lazy(() => ReadMessageFiltersSchema)),
	postedById: v.nullish(comparable('number')),
	taggedProductsCount: v.nullish(comparable('number')),
	taggedUsersCount: v.nullish(comparable('number')),
	isLiked: v.nullish(comparable('bool')),
	isViewed: v.nullish(comparable('bool')),
});

export default ReadStoryFiltersSchema;

export type TReadStoryFiltersSchemaOutput = v.InferOutput<typeof ReadStoryFiltersSchema>;
export type TReadStoryFiltersSchemaInput = v.InferInput<typeof ReadStoryFiltersSchema>;
