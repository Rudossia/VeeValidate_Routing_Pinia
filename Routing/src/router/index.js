import { createRouter, createWebHistory } from 'vue-router'

import TaskListView from '../views/TaskListView.vue'
import AddTaskView from '../views/AddTaskView.vue'
import TaskDetailsView from '../views/TaskDetailsView.vue'
import DeleteTaskView from '../views/DeleteTaskView.vue'
import CompleteTaskView from '../views/CompleteTaskView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', component: TaskListView },
  { path: '/add', component: AddTaskView },
  { path: '/task/:id', component: TaskDetailsView },
  { path: '/task/:id/delete', component: DeleteTaskView },
  { path: '/task/:id/complete', component: CompleteTaskView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router