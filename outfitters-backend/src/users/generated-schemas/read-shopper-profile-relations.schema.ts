import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import { GenderEnum } from '../entities/shopper-profile.entity';
import ReadUserRelationsSchema, { ReadUserRelations } from './read-user-relations.schema';
import ReadProductReviewRelationsSchema, {
	ReadProductReviewRelations,
} from '../../products/generated-schemas/read-product-review-relations.schema';
import ReadShippingAddressRelationsSchema, {
	ReadShippingAddressRelations,
} from './read-shipping-address-relations.schema';
import ReadMediaRelationsSchema, {
	ReadMediaRelations,
} from '../../media/generated-schemas/read-media-relations.schema';
import ReadCartRelationsSchema, { ReadCartRelations } from '../../carts/generated-schemas/read-cart-relations.schema';
import ReadOrderRelationsSchema, {
	ReadOrderRelations,
} from '../../orders/generated-schemas/read-order-relations.schema';
import ReadPreferenceRelationsSchema, {
	ReadPreferenceRelations,
} from '../../preferences/generated-schemas/read-preference-relations.schema';
import ReadCollaborationRelationsSchema, {
	ReadCollaborationRelations,
} from '../../collaborations/generated-schemas/read-collaboration-relations.schema';
import ReadAffiliationLinkRelationsSchema, {
	ReadAffiliationLinkRelations,
} from '../../affiliation-links/generated-schemas/read-affiliation-link-relations.schema';
import ReadPromoCodeRelationsSchema, {
	ReadPromoCodeRelations,
} from '../../promotions/generated-schemas/read-promo-code-relations.schema';

export class ReadShopperProfileRelations {
	gender?: GenderEnum | null;
	user?: ReadUserRelations | string | boolean;
	reviews?: ReadProductReviewRelations | string | boolean;
	addresses?: ReadShippingAddressRelations | string | boolean;
	profilePicture?: ReadMediaRelations | string | boolean;
	carts?: ReadCartRelations | string | boolean;
	orders?: ReadOrderRelations | string | boolean;
	preferences?: ReadPreferenceRelations | string | boolean;
	collaborations?: ReadCollaborationRelations | string | boolean;
	affiliationLinks?: ReadAffiliationLinkRelations | string | boolean;
	promoCodes?: ReadPromoCodeRelations | string | boolean;
}

const ReadShopperProfileRelationsSchema: v.GenericSchema<ReadShopperProfileRelations> = v.object({
	gender: v.nullish(v.enum(GenderEnum)),
	user: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadUserRelationsSchema),
		]),
	),
	reviews: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductReviewRelationsSchema),
		]),
	),
	addresses: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadShippingAddressRelationsSchema),
		]),
	),
	profilePicture: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadMediaRelationsSchema),
		]),
	),
	carts: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCartRelationsSchema),
		]),
	),
	orders: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadOrderRelationsSchema),
		]),
	),
	preferences: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPreferenceRelationsSchema),
		]),
	),
	collaborations: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadCollaborationRelationsSchema),
		]),
	),
	affiliationLinks: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadAffiliationLinkRelationsSchema),
		]),
	),
	promoCodes: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadPromoCodeRelationsSchema),
		]),
	),
});

export default ReadShopperProfileRelationsSchema;

export type TReadShopperProfileRelationsSchemaOutput = v.InferOutput<typeof ReadShopperProfileRelationsSchema>;
export type TReadShopperProfileRelationsSchemaInput = v.InferInput<typeof ReadShopperProfileRelationsSchema>;
