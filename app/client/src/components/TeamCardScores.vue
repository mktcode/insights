<script setup lang="ts">
import { ref } from 'vue';
import TeamCardScore from './TeamCardScore.vue';

const animationKey = ref(0);
setTimeout(() => animationKey.value++, 100);
setTimeout(() => animationKey.value++, 200);
setTimeout(() => animationKey.value++, 300);
setTimeout(() => animationKey.value++, 400);
setTimeout(() => animationKey.value++, 500);
</script>

<template>
  <div class="flex flex-col items-end text-gray-900 text-sm">
    <TeamCardScore label="Activity" :score="4" active-class="bg-lime-500" />
    <TeamCardScore label="Growth" :score="2" active-class="bg-cyan-500" />
    <TeamCardScore label="Popularity" :score="3" active-class="bg-violet-500" />
    <TeamCardScore label="Reputation" :score="1" active-class="bg-rose-500" />
  </div>
</template>
