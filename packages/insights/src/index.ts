export type Author = {
  login: string;
  createdAt: string;
  followers: {
    totalCount: number;
    nodes: {
      repositories: {
        nodes: {
          stargazerCount: number;
          forkCount: number;
        }[]
      }
      followers: {
        totalCount: number;
      }
    }[]
  }
  repositories: {
    nodes: {
      stargazerCount: number;
      forkCount: number;
    }[]
  }
  pullRequests: {
    totalCount: number;
    nodes: {
      merged: boolean;
      headRepository: {
        stargazerCount: number;
        forkCount: number;
      } | null;
    }[]
  }
}

export function calculateAuthorScore(author: Author) {
  const forkCount = author.repositories.nodes.reduce(
    (acc, repo) => acc + repo.forkCount,
    0
  );
  const followersForkCount = author.followers.nodes.reduce(
    (acc, follower) => acc + follower.repositories.nodes.reduce(
      (acc, repo) => acc + repo.forkCount,
      0
    ),
    0
  );

  const stargazerCount = author.repositories.nodes.reduce(
    (acc, repo) => acc + repo.stargazerCount,
    0
  );
  const followersStargazerCount = author.followers.nodes.reduce(
    (acc, follower) => acc + follower.repositories.nodes.reduce(
      (acc, repo) => acc + repo.stargazerCount,
      0
    ),
    0
  );
  
  const followersFollowerCount = author.followers.nodes.reduce(
    (acc, follower) => acc + follower.followers.totalCount,
    0
  );

  return {
    forkCount,
    followersForkCount,
    stargazerCount,
    followersStargazerCount,
    followersFollowerCount,
  };
}