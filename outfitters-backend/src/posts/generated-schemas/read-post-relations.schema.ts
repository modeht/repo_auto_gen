import { GenericComparable, comparable } from "../../globals/lib/comparable"
import * as v from 'valibot';
import { ReadMediaRelationsSchema, ReadMediaRelations } from '../../media/generated-schemas/read-media-relations.schema'
import { ReadTaggedProductRelationsSchema, ReadTaggedProductRelations } from '../../products/generated-schemas/read-tagged-product-relations.schema'
import { ReadUserRelationsSchema, ReadUserRelations } from '../../users/generated-schemas/read-user-relations.schema'
import { ReadPostLikesRelationsSchema, ReadPostLikesRelations } from './read-post-likes-relations.schema'
import { ReadCommentRelationsSchema, ReadCommentRelations } from '../../comments/generated-schemas/read-comment-relations.schema'
import { ReadMessageRelationsSchema, ReadMessageRelations } from '../../messages/generated-schemas/read-message-relations.schema'
import { ReadSavedCollectionItemRelationsSchema, ReadSavedCollectionItemRelations } from '../../saved-collections/generated-schemas/read-saved-collection-item-relations.schema'



export class ReadPostRelations {media?: ReadMediaRelations | boolean | null | undefined;
thumbnail?: ReadMediaRelations | boolean | null | undefined;
taggedProducts?: ReadTaggedProductRelations | boolean | null | undefined;
postedBy?: ReadUserRelations | boolean | null | undefined;
taggedUsers?: ReadUserRelations | boolean | null | undefined;
likedByUsers?: ReadPostLikesRelations | boolean | null | undefined;
comments?: ReadCommentRelations | boolean | null | undefined;
shares?: ReadMessageRelations | boolean | null | undefined;
savedInCollections?: ReadSavedCollectionItemRelations | boolean | null | undefined}

export const ReadPostRelationsSchema: v.GenericSchema<ReadPostRelations> = v.object({media: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
thumbnail: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMediaRelationsSchema)])),
taggedProducts: v.nullish(v.union([v.boolean(), v.lazy(() => ReadTaggedProductRelationsSchema)])),
postedBy: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
taggedUsers: v.nullish(v.union([v.boolean(), v.lazy(() => ReadUserRelationsSchema)])),
likedByUsers: v.nullish(v.union([v.boolean(), v.lazy(() => ReadPostLikesRelationsSchema)])),
comments: v.nullish(v.union([v.boolean(), v.lazy(() => ReadCommentRelationsSchema)])),
shares: v.nullish(v.union([v.boolean(), v.lazy(() => ReadMessageRelationsSchema)])),
savedInCollections: v.nullish(v.union([v.boolean(), v.lazy(() => ReadSavedCollectionItemRelationsSchema)]))})



export type TReadPostRelationsSchemaOutput = v.InferOutput<typeof ReadPostRelationsSchema>;
export type TReadPostRelationsSchemaInput = v.InferInput<typeof ReadPostRelationsSchema>;
