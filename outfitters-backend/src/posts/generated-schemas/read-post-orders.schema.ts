import { GenericComparable, comparable } from "../../globals/lib/comparable"
import { OrderDirectionSchema, OrderDirectionEnum } from "../../globals/schemas/order.schema"
import * as v from 'valibot';
import ReadMediaOrdersSchema, { ReadMediaOrders } from '../../media/generated-schemas/read-media-orders.schema'
import ReadTaggedProductOrdersSchema, { ReadTaggedProductOrders } from '../../products/generated-schemas/read-tagged-product-orders.schema'
import ReadUserOrdersSchema, { ReadUserOrders } from '../../users/generated-schemas/read-user-orders.schema'
import ReadPostLikesOrdersSchema, { ReadPostLikesOrders } from './read-post-likes-orders.schema'
import ReadCommentOrdersSchema, { ReadCommentOrders } from '../../comments/generated-schemas/read-comment-orders.schema'
import ReadMessageOrdersSchema, { ReadMessageOrders } from '../../messages/generated-schemas/read-message-orders.schema'
import ReadSavedCollectionItemOrdersSchema, { ReadSavedCollectionItemOrders } from '../../saved-collections/generated-schemas/read-saved-collection-item-orders.schema'



export class ReadPostOrders {caption?: OrderDirectionEnum | undefined;
media?: ReadMediaOrders | OrderDirectionEnum | undefined;
thumbnail?: ReadMediaOrders | OrderDirectionEnum | undefined;
taggedProducts?: ReadTaggedProductOrders | OrderDirectionEnum | undefined;
postedBy?: ReadUserOrders | OrderDirectionEnum | undefined;
postedById?: OrderDirectionEnum | undefined;
taggedUsers?: ReadUserOrders | OrderDirectionEnum | undefined;
likedByUsers?: ReadPostLikesOrders | OrderDirectionEnum | undefined;
comments?: ReadCommentOrders | OrderDirectionEnum | undefined;
shares?: ReadMessageOrders | OrderDirectionEnum | undefined;
savedInCollections?: ReadSavedCollectionItemOrders | OrderDirectionEnum | undefined;
thumbnailId?: OrderDirectionEnum | undefined;
likesCount?: OrderDirectionEnum | undefined;
commentsCount?: OrderDirectionEnum | undefined;
taggedProductsCount?: OrderDirectionEnum | undefined;
taggedUsersCount?: OrderDirectionEnum | undefined;
isLiked?: OrderDirectionEnum | undefined}

const ReadPostOrdersSchema: v.GenericSchema<ReadPostOrders> = v.object({caption: v.undefinedable(OrderDirectionSchema),
media: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
thumbnail: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMediaOrdersSchema)])),
taggedProducts: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadTaggedProductOrdersSchema)])),
postedBy: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
postedById: v.undefinedable(OrderDirectionSchema),
taggedUsers: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadUserOrdersSchema)])),
likedByUsers: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadPostLikesOrdersSchema)])),
comments: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadCommentOrdersSchema)])),
shares: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadMessageOrdersSchema)])),
savedInCollections: v.undefinedable(v.union([OrderDirectionSchema, v.lazy(() => ReadSavedCollectionItemOrdersSchema)])),
thumbnailId: v.undefinedable(OrderDirectionSchema),
likesCount: v.undefinedable(OrderDirectionSchema),
commentsCount: v.undefinedable(OrderDirectionSchema),
taggedProductsCount: v.undefinedable(OrderDirectionSchema),
taggedUsersCount: v.undefinedable(OrderDirectionSchema),
isLiked: v.undefinedable(OrderDirectionSchema)});

export default ReadPostOrdersSchema;




export type TReadPostOrdersSchemaOutput = v.InferOutput<typeof ReadPostOrdersSchema>;
export type TReadPostOrdersSchemaInput = v.InferInput<typeof ReadPostOrdersSchema>;
