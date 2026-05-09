<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const title = ref('')
const router = useRouter()
const taskStore = useTaskStore()

function submitTask() {
  taskStore.addTask(title.value)
  router.push('/')
}
</script>

<template>
  <section>
    <h2>Add task</h2>

    <form @submit.prevent="submitTask">
      <input v-model="title" type="text" placeholder="Task title" />
      <button type="submit">Add</button>
    </form>
  </section>
</template>