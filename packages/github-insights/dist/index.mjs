var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
import { graphql } from "@octokit/graphql";
import { print } from "graphql";

// src/queries.ts
import gql from "graphql-tag";
var GITHUB_USER_SCAN_QUERY = gql`query (
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
var GITHUB_REPOSITORY_SCAN_QUERY = gql`query (
  $owner: String!,
  $name: String!
) { 
  repository (owner: $owner, name: $name) {
    createdAt
    stargazerCount
  }
}`;

// src/evaluators/user.ts
function evaluateUserScan(userScan) {
  const forkCount = userScan.repositories.nodes.reduce(
    (acc, repo) => acc + repo.forkCount,
    0
  );
  const followersForkCount = userScan.followers.nodes.reduce(
    (acc, follower) => acc + follower.repositories.nodes.reduce(
      (acc2, repo) => acc2 + repo.forkCount,
      0
    ),
    0
  );
  const stargazerCount = userScan.repositories.nodes.reduce(
    (acc, repo) => acc + repo.stargazerCount,
    0
  );
  const followersStargazerCount = userScan.followers.nodes.reduce(
    (acc, follower) => acc + follower.repositories.nodes.reduce(
      (acc2, repo) => acc2 + repo.stargazerCount,
      0
    ),
    0
  );
  const followersFollowerCount = userScan.followers.nodes.reduce(
    (acc, follower) => acc + follower.followers.totalCount,
    0
  );
  const eligablePullRequests = userScan.pullRequests.nodes.filter((pr) => pr.merged && !!pr.repository).filter((pr) => {
    var _a;
    return !!pr.repository && ((_a = pr.repository) == null ? void 0 : _a.owner.login) !== userScan.login;
  });
  const mergedPullRequestCount = eligablePullRequests.reduce(
    (acc, pr) => pr.merged ? acc + 1 : acc,
    0
  );
  const mergedPullRequestCount30d = eligablePullRequests.reduce(
    (acc, pr) => {
      const mergedAt = new Date(pr.mergedAt);
      const now = /* @__PURE__ */ new Date();
      const diff = now.getTime() - mergedAt.getTime();
      const diffDays = Math.ceil(diff / (1e3 * 3600 * 24));
      return pr.merged && diffDays <= 30 ? acc + 1 : acc;
    },
    0
  );
  const mergedPullRequestCount365d = eligablePullRequests.reduce(
    (acc, pr) => {
      const mergedAt = new Date(pr.mergedAt);
      const now = /* @__PURE__ */ new Date();
      const diff = now.getTime() - mergedAt.getTime();
      const diffDays = Math.ceil(diff / (1e3 * 3600 * 24));
      return pr.merged && diffDays <= 365 ? acc + 1 : acc;
    },
    0
  );
  return {
    forkCount,
    followersForkCount,
    stargazerCount,
    followersStargazerCount,
    followersFollowerCount,
    mergedPullRequestCount,
    mergedPullRequestCount30d,
    mergedPullRequestCount365d
  };
}

// src/evaluators/repository.ts
function evaluateRepositoryScan(repositoryScan) {
  return {
    mostActiveContributor: null,
    contributors: []
  };
}

// src/index.ts
var GithubInsights = class {
  constructor(options) {
    this.client = graphql.defaults({
      baseUrl: options.sourceUrl,
      headers: {
        Authorization: `bearer ${options.viewerToken}`
      }
    });
  }
  scanUser(login) {
    return __async(this, null, function* () {
      const { user } = yield this.client(
        print(GITHUB_USER_SCAN_QUERY),
        { login }
      );
      return evaluateUserScan(user);
    });
  }
  scanRepository(owner, name) {
    return __async(this, null, function* () {
      const { repository } = yield this.client(
        print(GITHUB_REPOSITORY_SCAN_QUERY),
        { owner, name }
      );
      return evaluateRepositoryScan(repository);
    });
  }
};
export {
  GithubInsights
};
