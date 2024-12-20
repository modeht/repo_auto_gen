import { GenericComparable, comparable } from '../../globals/lib/comparable';
import * as v from 'valibot';
import ReadProductRelationsSchema, { ReadProductRelations } from './read-product-relations.schema';
import ReadProductOptionValueRelationsSchema, {
	ReadProductOptionValueRelations,
} from './read-product-option-value-relations.schema';

export class ReadProductOptionRelations {
	product?: ReadProductRelations | string | boolean;
	values?: ReadProductOptionValueRelations | string | boolean;
}

const ReadProductOptionRelationsSchema: v.GenericSchema<ReadProductOptionRelations> = v.object({
	product: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductRelationsSchema),
		]),
	),
	values: v.optional(
		v.union([
			v.pipe(
				v.union([v.string(), v.boolean()]),
				v.transform((input) => (input === 'true' ? true : false)),
				v.boolean(),
			),
			v.lazy(() => ReadProductOptionValueRelationsSchema),
		]),
	),
});

export default ReadProductOptionRelationsSchema;

export type TReadProductOptionRelationsSchemaOutput = v.InferOutput<typeof ReadProductOptionRelationsSchema>;
export type TReadProductOptionRelationsSchemaInput = v.InferInput<typeof ReadProductOptionRelationsSchema>;
