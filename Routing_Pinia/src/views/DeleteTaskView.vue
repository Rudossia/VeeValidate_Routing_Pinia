<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const route = useRoute()
const taskStore = useTaskStore()

onMounted(() => {
  taskStore.deleteTask(route.params.id)
})
</script>

<template>
  <section>
    <h2>Task deleted</h2>

    <RouterLink to="/">Back to tasks</RouterLink>
  </section>
</template>