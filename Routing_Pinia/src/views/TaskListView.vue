<script setup>
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <section>
    <h2>All tasks</h2>
    <p v-if="taskStore.tasks.length === 0">No tasks yet.</p>
    <ul v-else>
      <li v-for="task in taskStore.tasks" :key="task.id">
        <input type="checkbox" :checked="task.completed" @change="taskStore.completeTask(task.id)"/>
        <RouterLink :to="`/task/${task.id}`" :class="{ completed: task.completed }"> {{ task.title }} </RouterLink>
        <button @click="taskStore.deleteTask(task.id)"> Delete </button>
      </li>
    </ul>
  </section>
</template>