<script setup lang="ts">
import { onMounted, ref } from "vue";
import { GithubInsights } from "@openq/github-insights";

const username = ref(window.location.hash.replace("#", "") || "mktcode");

const forkCount = ref(0);
const followersForkCount = ref(0);
const stargazerCount = ref(0);
const followersStargazerCount = ref(0);
const followersFollowerCount = ref(0);
const mergedPullRequestCount = ref(0);
const mergedPullRequestCount30d = ref(0);
const mergedPullRequestCount365d = ref(0);

const loadingData = ref(true);

onMounted(async () => {
  try {
    const githubInsights = new GithubInsights({
      viewerToken: import.meta.env.VITE_GITHUB_TOKEN,
    });

    const authorScan = await githubInsights.scanUser(username.value);

    forkCount.value = authorScan.forkCount;
    followersForkCount.value = authorScan.followersForkCount;
    stargazerCount.value = authorScan.stargazerCount;
    followersStargazerCount.value = authorScan.followersStargazerCount;
    followersFollowerCount.value = authorScan.followersFollowerCount;
    mergedPullRequestCount.value = authorScan.mergedPullRequestCount;
    mergedPullRequestCount30d.value = authorScan.mergedPullRequestCount30d;
    mergedPullRequestCount365d.value = authorScan.mergedPullRequestCount365d;
  } catch (error) {
    console.error(error);
  } finally {
    loadingData.value = false;
  }
});
</script>

<template>
  <main class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold underline mb-10">Hello {{ username }}!</h1>

    <div v-if="loadingData">loading data...</div>
    <div v-else class="max-w-sm text-center">
      <p>
        Your repositories have received
        <span class="font-bold">{{ stargazerCount }}</span> stars and have been
        forked <span class="font-bold">{{ forkCount }}</span> times.
      </p>

      <p>
        Your followers' repositories have received
        <span class="font-bold">{{ followersStargazerCount }}</span> stars and
        have been forked
        <span class="font-bold">{{ followersForkCount }}</span> times.
        <span class="font-bold">{{ followersFollowerCount }}</span> people
        follow your followers.
      </p>

      <p>
        You contributed
        <span class="font-bold">{{ mergedPullRequestCount }}</span> merged pull
        requests,
        <span class="font-bold">{{ mergedPullRequestCount365d }}</span> in the
        last year and
        <span class="font-bold">{{ mergedPullRequestCount30d }}</span> in the
        last 30 days.
      </p>
    </div>
  </main>
</template>
