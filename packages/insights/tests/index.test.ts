import { describe, expect, test } from '@jest/globals';
import { calculateAuthorScore } from '../src';
import GITHUB_AUTHOR_MOCK from './mocks/github-author.json';

jest.useFakeTimers();
jest.setSystemTime(1677015116954);

describe('author score', () => {
  test('is calculated correctly', () => {
    const expectedForkCount = 753;
    const expectedFollowersForkCount = 11371;
    const expectedStargazerCount = 2389;
    const expectedFollowersStargazerCount = 18244;
    const expectedFollowersFollowerCount = 17950;
    const expectedMergedPullRequestCount = 92;
    const expectedMergedPullRequestCount30d = 7;
    const expectedMergedPullRequestCount365d = 67;

    const {
      forkCount,
      followersForkCount,
      stargazerCount,
      followersStargazerCount,
      followersFollowerCount,
      mergedPullRequestCount,
      mergedPullRequestCount30d,
      mergedPullRequestCount365d,
    } = calculateAuthorScore(GITHUB_AUTHOR_MOCK.data.user);

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
