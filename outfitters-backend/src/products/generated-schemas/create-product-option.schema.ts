import { modelSymbol } from "../../globals/constants/schema-symbols"
import * as v from 'valibot';



export const CreateProductOptionSchema = v.pipe(v.object({name: v.string(),
productId: v.number(),
product: v.nullish(v.union([v.object({ id: v.number() }), v.object({isArchived: v.boolean(),
title: v.nullish(v.string()),
description: v.nullish(v.string()),
basePrice: v.nullish(v.number()),
sku: v.nullish(v.string()),
currency: v.nullish(v.string()),
stock: v.number(),
lastStockUpdate: v.nullish(v.pipe(v.string('Invalid type: Expected ISO timestamp string'), v.isoTimestamp())),
isOutOfStock: v.boolean(),
isFeatured: v.boolean(),
deliveryEstimationInDays: v.number(),
brandId: v.nullish(v.number()),
categoryId: v.nullish(v.number()),
subCategoryId: v.nullish(v.number()),
averageRating: v.number(),
isSaved: v.boolean()})])),
values: v.nullish(v.union([v.array(v.object({id:v.number()})), v.array(v.object({value: v.string(),
optionName: v.string(),
productId: v.number()}))]))}),v.metadata({[modelSymbol]: 'ProductOptionEntity',
product: 'ProductEntity',
values: 'ProductOptionValueEntity'}))

export type TCreateProductOptionSchemaInput = v.InferInput<typeof CreateProductOptionSchema>;
export type TCreateProductOptionSchemaOutput = v.InferOutput<typeof CreateProductOptionSchema>;
