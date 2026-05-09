import { ref, watch } from 'vue'
const STORAGE_KEY = 'routing-tasks'

function loadTasks() {
  const tasks = localStorage.getItem(STORAGE_KEY)
  if (!tasks) {
    return []
  }
  return JSON.parse(tasks)
}
const tasks = ref(loadTasks())

watch(tasks,() => {localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))}, { deep: true })
function getNextId() {
  if (tasks.value.length === 0) {
    return 1
  }
  return Math.max(...tasks.value.map((task) => task.id)) + 1
}

export function useTasks() {
  function addTask(title) {
    if (!title.trim()) {
      return
    }
    tasks.value.push({
      id: getNextId(),
      title: title.trim(),
      completed: false,
    })
  }
  function getTaskById(id) {
    return tasks.value.find((task) => task.id === Number(id))
  }
  function deleteTask(id) {
    tasks.value = tasks.value.filter((task) => task.id !== Number(id))
  }
  function completeTask(id) {
    const task = getTaskById(id)
    if (task) {
      task.completed = !task.completed
    }
  }
  return {tasks, addTask, getTaskById, deleteTask,completeTask}
}
