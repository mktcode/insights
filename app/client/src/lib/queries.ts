export const GITHUB_AUTHOR_QUERY = `query ($login: String!) { 
  user (login: $login) {
    createdAt
    followers (first: 100) {
      totalCount
      nodes {
        repositories (first: 100, isFork: false) {
          nodes {
            stargazerCount
            forkCount
          }
        }
        followers (first: 100) {
          totalCount
        }
      }
    }
    repositories (first: 100, isFork: false) {
      nodes {
        stargazerCount
        forkCount
      }
    }
    pullRequests (first: 100) {
      totalCount
      nodes {
        merged
        headRepository {
          stargazerCount
          forkCount
        }
      }
    }
  }
}`