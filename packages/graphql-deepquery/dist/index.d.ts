import { DocumentNode } from 'graphql';

declare function reduceQuery<T>(query: DocumentNode, previousData: T): DocumentNode;

export { reduceQuery };
