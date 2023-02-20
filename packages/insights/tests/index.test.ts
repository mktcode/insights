import { describe, expect, test } from '@jest/globals';
import { calculateAuthorScore } from '../src';
import GITHUB_AUTHOR_MOCK from './mocks/github-author.json';

describe('author module', () => {
  test('calculates score correctly', () => {
    const expectedAuthorScore = 1000;
    const { authorScore } = calculateAuthorScore(GITHUB_AUTHOR_MOCK.data.viewer);

    expect(authorScore).toBe(expectedAuthorScore);
  });
});