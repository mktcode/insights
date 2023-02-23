import { describe, expect, test } from '@jest/globals';
import gql from 'graphql-tag';
import { reduceQuery } from '../dist';

jest.useFakeTimers();
jest.setSystemTime(1677015116954);

const TEST_QUERY = gql`
  query ProjectsQuery($projectsCursor: String) {
    user (name: "mktcode") {
      id
      name
      projects (first: 3, after: $projectsCursor) {
        totalCount
        nodes {
          id
          name
        }
      }
    }
  }
`;

const TEST_QUERY_REDUCED = gql`
  query ProjectsQuery($projectsCursor: String) {
    user (name: "mktcode") {
      id
      name
    }
  }
`;

describe('query', () => {
  test('is reduced correctly', () => {
    const reducedQuery = reduceQuery(TEST_QUERY, {
      user: {
        id: '1',
        name: 'mktcode',
        projects: {
          totalCount: 3,
          nodes: [
            {
              id: '1',
              name: 'graphql-deepquery',
            },
            {
              id: '2',
              name: 'graphql-deepquery',
            },
          ]
        }
      }
    });

    expect(reducedQuery).toBe(TEST_QUERY_REDUCED);
  });
});
