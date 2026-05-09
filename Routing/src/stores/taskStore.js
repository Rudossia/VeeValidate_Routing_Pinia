import { defineStore } from 'pinia'

const STORAGE_KEY = 'routing-tasks'

function loadTasks() {
  const tasks = localStorage.getItem(STORAGE_KEY)

  if (!tasks) {
    return []
  }

  return JSON.parse(tasks)
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: loadTasks(),
  }),

  actions: {
    saveTasks() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks))
    },

    getNextId() {
      if (this.tasks.length === 0) {
        return 1
      }

      return Math.max(...this.tasks.map((task) => task.id)) + 1
    },

    addTask(title) {
      const trimmedTitle = title.trim()

      if (!trimmedTitle) {
        return
      }

      this.tasks.push({
        id: this.getNextId(),
        title: trimmedTitle,
        completed: false,
      })

      this.saveTasks()
    },

    getTaskById(id) {
      return this.tasks.find((task) => task.id === Number(id))
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== Number(id))

      this.saveTasks()
    },

    completeTask(id) {
      const task = this.getTaskById(id)

      if (task) {
        task.completed = !task.completed
        this.saveTasks()
      }
    },
  },
})