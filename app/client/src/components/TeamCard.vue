<script setup lang="ts">
import TeamCardScores from "./TeamCardScores.vue";
import TeamCardMembers from "./TeamCardMembers.vue";
import TeamCardActivityChart from "./TeamCardActivityChart.vue";
</script>

<template>
  <div>
    <div class="border rounded-lg">
      <div class="flex flex-col sm:flex-row">
        <div class="flex flex-col border-b sm:border-b-0 sm:border-r">
          <h1 class="px-5 pt-3 text-center">Team OpenQ</h1>
          <TeamCardMembers />
          <TeamCardActivityChart class="mt-auto max-w-[280px]" />
        </div>
        <div class="px-5 py-3">
          <div class="font-bold text-right">Submission to hackathon</div>
          <div class="text-right text-sm text-gray-300 mb-3">
            OpenQDev/OpenQ-Frontend
          </div>
          <TeamCardScores />
        </div>
      </div>
    </div>
  </div>
</template>
