import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadNotificationFiltersSchema, ReadNotificationFiltersSchemaFilters } from '../../notifications/generated-schemas/read-notification-filters.schema'
import { ReadBrandProfileFiltersSchema, ReadBrandProfileFiltersSchemaFilters } from '../../users/generated-schemas/read-brand-profile-filters.schema'
import { ReadSeasonalPromotionFiltersSchema, ReadSeasonalPromotionFiltersSchemaFilters } from './read-seasonal-promotion-filters.schema'
import { ReadProductFiltersSchema, ReadProductFiltersSchemaFilters } from '../../products/generated-schemas/read-product-filters.schema'
import { ReadOrderItemFiltersSchema, ReadOrderItemFiltersSchemaFilters } from '../../orders/generated-schemas/read-order-item-filters.schema'

export class ReadPromotionFiltersSchemaFilters {title?: GenericComparable<"string"> | null | undefined;
discountPercentage?: GenericComparable<"number"> | null | undefined;
minPurchaseAmount?: GenericComparable<"number"> | null | undefined;
start?: GenericComparable<"date"> | null | undefined;
end?: GenericComparable<"date"> | null | undefined;
notifications?: ReadNotificationFiltersSchemaFilters | null | undefined;
brand?: ReadBrandProfileFiltersSchemaFilters | null | undefined;
seasonalPromotion?: ReadSeasonalPromotionFiltersSchemaFilters | null | undefined;
products?: ReadProductFiltersSchemaFilters | null | undefined;
orderItems?: ReadOrderItemFiltersSchemaFilters | null | undefined;
isDeleted?: GenericComparable<"bool"> | null | undefined;
seasonalPromotionId?: GenericComparable<"number"> | null | undefined;
brandId?: GenericComparable<"number"> | null | undefined}

export const ReadPromotionFiltersSchema: v.GenericSchema<ReadPromotionFiltersSchemaFilters> = v.object({title: v.nullish(comparable("string")),
discountPercentage: v.nullish(comparable("number")),
minPurchaseAmount: v.nullish(comparable("number")),
start: v.nullish(comparable("date")),
end: v.nullish(comparable("date")),
notifications: v.nullish(v.lazy(() => ReadNotificationFiltersSchema)),
brand: v.nullish(v.lazy(() => ReadBrandProfileFiltersSchema)),
seasonalPromotion: v.nullish(v.lazy(() => ReadSeasonalPromotionFiltersSchema)),
products: v.nullish(v.lazy(() => ReadProductFiltersSchema)),
orderItems: v.nullish(v.lazy(() => ReadOrderItemFiltersSchema)),
isDeleted: v.nullish(comparable("bool")),
seasonalPromotionId: v.nullish(comparable("number")),
brandId: v.nullish(comparable("number"))})



export type TReadPromotionSchemaOutput = v.InferOutput<typeof ReadPromotionFiltersSchema>;
export type TReadPromotionSchemaInput = v.InferInput<typeof ReadPromotionFiltersSchema>;
