import { describe, expect, test } from '@jest/globals';
import { calculateScores } from '../src/index';
import { getRandomIntBetween } from './lib/random';

function getRandomTestData() {
  const authors = getRandomIntBetween(0, 1000000);
  const commits = getRandomIntBetween(0, 1000000);
  const comments = getRandomIntBetween(0, 1000000);
  const duration = getRandomIntBetween(60, 60 * 60 * 24 * 365);

  return {
    authors,
    commits,
    comments,
    duration,
    expectedAuthorScore: authors,
    expectedCommitScore: commits / authors / duration,
    expectedCommentScore: comments / authors / duration
  };
}

describe('pr module', () => {
  test('calculates scores correctly', () => {
    for (let i = 0; i < 100; i++) {
      const {
        authors,
        commits,
        comments,
        duration,
        expectedAuthorScore,
        expectedCommitScore,
        expectedCommentScore
      } = getRandomTestData();

      const { authorScore, commitScore, commentScore } = calculateScores({
        authors,
        commits,
        comments,
        duration
      });

      expect(authorScore).toBe(expectedAuthorScore);
      expect(commitScore).toBe(expectedCommitScore);
      expect(commentScore).toBe(expectedCommentScore);
    }
  });
});