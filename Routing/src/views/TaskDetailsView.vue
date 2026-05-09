<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const route = useRoute()
const taskStore = useTaskStore()

const task = computed(() => taskStore.getTaskById(route.params.id))
</script>

<template>
  <section>
    <h2>Task details</h2>

    <div v-if="task">
      <p>ID: {{ task.id }}</p>
      <p>Title: {{ task.title }}</p>
      <p>Status: {{ task.completed ? 'Completed' : 'Not completed' }}</p>

      <RouterLink :to="`/task/${task.id}/complete`">
        Change status
      </RouterLink>

      <br />

      <RouterLink :to="`/task/${task.id}/delete`">
        Delete task
      </RouterLink>
    </div>

    <p v-else>Task not found.</p>
  </section>
</template>