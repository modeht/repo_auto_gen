import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadTaggedProductRelationsSchema, ReadTaggedProductRelations } from '../../products/generated-schemas/read-tagged-product-relations.schema'
import { ReadCartItemsRelationsSchema, ReadCartItemsRelations } from '../../carts/generated-schemas/read-cart-items-relations.schema'
import { ReadAffiliationLinkTrackingRelationsSchema, ReadAffiliationLinkTrackingRelations } from './read-affiliation-link-tracking-relations.schema'
import { ReadShopperProfileRelationsSchema, ReadShopperProfileRelations } from '../../users/generated-schemas/read-shopper-profile-relations.schema'
import { ReadProductRelationsSchema, ReadProductRelations } from '../../products/generated-schemas/read-product-relations.schema'



export class ReadAffiliationLinkRelations {taggedProducts?: ReadTaggedProductRelations | boolean | null | undefined;
cartItems?: ReadCartItemsRelations | boolean | null | undefined;
affiliationLinkTracking?: ReadAffiliationLinkTrackingRelations | boolean | null | undefined;
shopperProfile?: ReadShopperProfileRelations | boolean | null | undefined;
product?: ReadProductRelations | boolean | null | undefined}

export const ReadAffiliationLinkRelationsSchema: v.GenericSchema<ReadAffiliationLinkRelations> = v.object({taggedProducts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadTaggedProductRelationsSchema)])),
cartItems: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCartItemsRelationsSchema)])),
affiliationLinkTracking: v.nullish(v.union([v.boolean(), v.lazy(() => ReadAffiliationLinkTrackingRelationsSchema)])),
shopperProfile: v.nullish(v.union([v.boolean(), v.lazy(() => ReadShopperProfileRelationsSchema)])),
product: v.nullish(v.union([v.boolean(), v.lazy(() => ReadProductRelationsSchema)]))})



export type TReadAffiliationLinkRelationsSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkRelationsSchema>;
export type TReadAffiliationLinkRelationsSchemaInput = v.InferInput<typeof ReadAffiliationLinkRelationsSchema>;
