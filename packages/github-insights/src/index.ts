import { graphql } from "@octokit/graphql";
import { print } from "graphql";
import { GITHUB_USER_SCAN_QUERY, GITHUB_REPOSITORY_SCAN_QUERY } from "./queries";
import { evaluateUserScan, type UserScan } from "./evaluators/user";
import { evaluateRepositoryScan, type RepositoryScan } from "./evaluators/repository";

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

  async scanRepository(owner: string, name: string) {
    const { repository } = await this.client<{ repository: RepositoryScan }>(
      print(GITHUB_REPOSITORY_SCAN_QUERY),
      { owner, name }
    );

    return evaluateRepositoryScan(repository);
  }
}