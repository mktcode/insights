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

