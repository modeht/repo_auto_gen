import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import { NotificationType } from '../entities/notification.entity';
import { ReadUserOrdersSchema, ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'
import { ReadCollaborationOrdersSchema, ReadCollaborationOrders } from '../../collaborations/generated-schemas/read-collaboration-orders.schema'
import { ReadCommentOrdersSchema, ReadCommentOrders } from '../../comments/generated-schemas/read-comment-orders.schema'
import { ReadPromotionOrdersSchema, ReadPromotionOrders } from '../../promotions/generated-schemas/read-promotion-orders.schema'
import { ReadProductOrdersSchema, ReadProductOrders } from '../../products/generated-schemas/read-product-orders.schema'



export class ReadNotificationOrders {type?: NotificationType | null | undefined;
user?: ReadUserOrders | OrderDirectionEnum | undefined;
collaboration?: ReadCollaborationOrders | OrderDirectionEnum | undefined;
comment?: ReadCommentOrders | OrderDirectionEnum | undefined;
promotion?: ReadPromotionOrders | OrderDirectionEnum | undefined;
product?: ReadProductOrders | OrderDirectionEnum | undefined}

export const ReadNotificationOrdersSchema: v.GenericSchema<ReadNotificationOrders> = v.object({type: v.nullish(v.enum(NotificationType)),
user: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
collaboration: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCollaborationOrdersSchema)])),
comment: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCommentOrdersSchema)])),
promotion: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPromotionOrdersSchema)])),
product: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadProductOrdersSchema)]))})



export type TReadNotificationOrdersSchemaOutput = v.InferOutput<typeof ReadNotificationOrdersSchema>;
export type TReadNotificationOrdersSchemaInput = v.InferInput<typeof ReadNotificationOrdersSchema>;
