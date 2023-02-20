# OpenQ Insights


## Usage

```bash
npm i @openq/insights
```
<sup>(not published yet)</sup>

```js
import { calculateAuthorScore } = from '@openq/insights'

const {
  forkCount,
  followersForkCount,
  stargazerCount,
  followersStargazerCount,
  followersFollowerCount,
  mergedPullRequestCount,
  mergedPullRequestCount30d,
  mergedPullRequestCount365d,
} = calculateAuthorScore(user);
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

