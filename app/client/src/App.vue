<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Author } from "@openq/insights";
import { calculateAuthorScore } from "@openq/insights";
import { graphqlWithAuth } from "@/lib/githubClient";
import { GITHUB_AUTHOR_QUERY } from "@/lib/queries";

const username = ref(window.location.hash.replace("#", "") || "mktcode");

const forkCount = ref(0);
const followersForkCount = ref(0);
const stargazerCount = ref(0);
const followersStargazerCount = ref(0);
const followersFollowerCount = ref(0);

onMounted(async () => {
  try {
    const { user } = await graphqlWithAuth<{ user: Author }>(
      GITHUB_AUTHOR_QUERY,
      {
        login: username.value,
      }
    );

    const authorScore = calculateAuthorScore(user);

    forkCount.value = authorScore.forkCount;
    followersForkCount.value = authorScore.followersForkCount;
    stargazerCount.value = authorScore.stargazerCount;
    followersStargazerCount.value = authorScore.followersStargazerCount;
    followersFollowerCount.value = authorScore.followersFollowerCount;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <main>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <div>
      <p class="text-xl font-bold">Your score is:</p>
      <p class="text-xl font-bold">Fork count: {{ forkCount }}</p>
      <p class="text-xl font-bold">
        Followers fork count: {{ followersForkCount }}
      </p>
      <p class="text-xl font-bold">Stargazer count: {{ stargazerCount }}</p>
      <p class="text-xl font-bold">
        Followers stargazer count: {{ followersStargazerCount }}
      </p>
      <p class="text-xl font-bold">
        Followers follower count: {{ followersFollowerCount }}
      </p>
    </div>
  </main>
</template>
