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
    const {
      forkCount,
      followersForkCount,
      stargazerCount,
      followersStargazerCount,
      followersFollowerCount,
    } = calculateAuthorScore(GITHUB_AUTHOR_MOCK.data.viewer);

    expect(forkCount).toBe(expectedForkCount);
    expect(followersForkCount).toBe(expectedFollowersForkCount);
    expect(stargazerCount).toBe(expectedStargazerCount);
    expect(followersStargazerCount).toBe(expectedFollowersStargazerCount);
    expect(followersFollowerCount).toBe(expectedFollowersFollowerCount);
  });
});