import { createRouter, createWebHistory } from 'vue-router'

import Todo from '@/views/Todo.vue'
import Completed from '@/views/Completed.vue'
// Import halaman EditTodo
import EditTodo from '@/views/EditTodo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Todo },
    { path: '/completed', component: Completed },
    // Route untuk halaman edit, dengan parameter ID
    { path: '/edit/:id', component: EditTodo }
  ]
})

export default router
