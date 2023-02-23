import { DocumentNode } from "graphql";

export function reduceQuery<T>(query: DocumentNode, previousData: T): DocumentNode {
  return query;
}