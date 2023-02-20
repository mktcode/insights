export function calculateScores({ commits, comments, authors, duration }: { commits: number, comments: number, authors: number, duration: number }) {
  return {
    authorScore: authors,
    commitScore: commits / authors / duration,
    commentScore: comments / authors / duration
  };
}