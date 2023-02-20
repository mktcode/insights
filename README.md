# OpenQ Insights

```bash
npm i @openq/insights
```

```js
import { authorScore, repoScore } = from '@openq/insights'
```

## PR Score

Prio 1:

- Authors
  - account age
  - average activity
    - past 3 months
    - past 12 months
    - all time
  - number of merged PRs (in repos not owned)
    - past 3 months
    - past 12 months
    - all time
  - follower count
- PR Repo
  - stars (could be seen as hackathon community voting)

# Thoughts/Ideas

- contributor activity growth
- experience level of teams/devs (activity over time)
- highlight dev with most stars/followers