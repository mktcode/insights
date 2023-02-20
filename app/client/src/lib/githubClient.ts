import { graphql } from "@octokit/graphql";

export const graphqlWithAuth = graphql.defaults({
  headers: {
    Authorization: `bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});
