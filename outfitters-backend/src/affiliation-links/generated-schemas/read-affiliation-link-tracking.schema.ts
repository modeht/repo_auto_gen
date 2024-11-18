import * as v from 'valibot';
import { ReadAffiliationLinkTrackingFiltersSchema } from './read-affiliation-link-tracking-filters.schema';
import { ReadAffiliationLinkTrackingRelationsSchema } from './read-affiliation-link-tracking-relations.schema';
export const ReadAffiliationLinkTrackingSchema = v.object({
filters: v.nullish(ReadAffiliationLinkTrackingFiltersSchema),
relations: v.nullish(ReadAffiliationLinkTrackingRelationsSchema),
});
export type TReadAffiliationLinkTrackingSchemaInput = v.InferInput<typeof ReadAffiliationLinkTrackingSchema>;
export type TReadAffiliationLinkTrackingSchemaOutput = v.InferOutput<typeof ReadAffiliationLinkTrackingSchema>;
