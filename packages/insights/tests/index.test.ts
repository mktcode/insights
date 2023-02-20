import { describe, expect, test } from '@jest/globals';
import { calculateAuthorScore } from '../src';
import GITHUB_AUTHOR_MOCK from './mocks/github-author.json';

describe('author module', () => {
  test('calculates score correctly', () => {
    const expectedForkCount = 753;
    const expectedFollowersForkCount = 11368;
    const expectedStargazerCount = 2389;
    const expectedFollowersStargazerCount = 18243;
    const expectedFollowersFollowerCount = 17949;
    const expectedMergedPullRequestCount = 100;
    const expectedMergedPullRequestCount30d = 5;
    const expectedMergedPullRequestCount365d = 30;

    const {
      forkCount,
      followersForkCount,
      stargazerCount,
      followersStargazerCount,
      followersFollowerCount,
      mergedPullRequestCount,
      mergedPullRequestCount30d,
      mergedPullRequestCount365d,
    } = calculateAuthorScore(GITHUB_AUTHOR_MOCK.data.viewer);

    expect(forkCount).toBe(expectedForkCount);
    expect(followersForkCount).toBe(expectedFollowersForkCount);
    expect(stargazerCount).toBe(expectedStargazerCount);
    expect(followersStargazerCount).toBe(expectedFollowersStargazerCount);
    expect(followersFollowerCount).toBe(expectedFollowersFollowerCount);
    expect(mergedPullRequestCount).toBe(expectedMergedPullRequestCount);
    expect(mergedPullRequestCount30d).toBe(expectedMergedPullRequestCount30d);
    expect(mergedPullRequestCount365d).toBe(expectedMergedPullRequestCount365d);
  });
});