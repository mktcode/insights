# OpenQ Insights

## Usage

```bash
npm i @openq/github-insights
```
<sup>(not published yet but works inside this monorepo)</sup>

```js
const githubInsights = new GithubInsights({
  viewerToken: "<access token>",
});

const {
  forkCount,
  followersForkCount,
  stargazerCount,
  followersStargazerCount,
  followersFollowerCount,
  mergedPullRequestCount,
  mergedPullRequestCount30d,
  mergedPullRequestCount365d,
} = await githubInsights.scanUser(username.value);
```

## Development

```bash
npm i
npm run client:dev
```

Run tests, linting, and build:

```bash
npm test
npm run lint
npm run build
```

# Scores

*draft*

The scores are inspired by OpenQ's plans for hackathon tooling but kept as generic as possible.

## User

### Reputation

A user's reputation is based on activity over time and the number of followers and followers's followers.

## Repository

### Activity

A repository's activity is based on the number of commits, issues and pull requests (and comments) and discussions.

### Growth

Growth represents activity and popularity over time.

### Popularity

A repository's popularity is based on the number of forks, stars, and pull requests and issues from external users.

### Reputation

A repository's reputation is based on its authors' reputation.
