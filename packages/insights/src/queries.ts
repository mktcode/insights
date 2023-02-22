export const GITHUB_USER_QUERY = `query ($login: String!) { 
  user (login: $login) {
    login
    createdAt
    followers (first: 50) {
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
