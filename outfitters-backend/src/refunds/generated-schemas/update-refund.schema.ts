import { modelSymbol } from "../../globals/constants/schema-symbols"
import * as v from 'valibot';



export const UpdateRefundSchema = v.pipe(v.object({}),v.metadata({[modelSymbol]: 'RefundEntity'}))

export type TUpdateRefundSchemaInput = v.InferInput<typeof UpdateRefundSchema>;
export type TUpdateRefundSchemaOutput = v.InferOutput<typeof UpdateRefundSchema>;
