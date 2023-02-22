import gql from "graphql-tag";

type GQL = ReturnType<typeof gql>

export const GITHUB_USER_SCAN_QUERY: GQL = gql`query (
  $login: String!,
  $followersBatchSize: Int = 50,
  $followersAfter: String,
) { 
  user (login: $login) {
    login
    createdAt
    followers (first: $followersBatchSize, after: $followersAfter) {
      totalCount
      nodes {
        repositories (first: 50, isFork: false) {
          nodes {
            stargazerCount
            forkCount
          }
        }
        followers (first: 50) {
          totalCount
        }
      }
    }
    repositories (first: 50, isFork: false) {
      nodes {
        stargazerCount
        forkCount
      }
    }
    pullRequests (first: 50, states: [MERGED], orderBy: { field: CREATED_AT, direction: DESC}) {
      totalCount
      nodes {
        merged
        mergedAt
        repository {
          owner {
            login
          }
          stargazerCount
          forkCount
        }
      }
    }
  }
}`;
