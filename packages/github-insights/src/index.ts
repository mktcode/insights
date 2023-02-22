import { graphql } from "@octokit/graphql";
import { print } from "graphql";
import { GITHUB_USER_SCAN_QUERY } from "./queries";
import { evaluateUserScan, type UserScan } from "./evaluators/user";

export class GithubInsights {
  client: ReturnType<typeof graphql.defaults>;

  constructor(options: { viewerToken: string, sourceUrl?: string }) {
    this.client = graphql.defaults({
      baseUrl: options.sourceUrl,
      headers: {
        Authorization: `bearer ${options.viewerToken}`,
      },
    })
  }

  async scanUser(login: string) {
    const { user } = await this.client<{ user: UserScan }>(
      print(GITHUB_USER_SCAN_QUERY),
      { login }
    );

    return evaluateUserScan(user);
  }
}