<template>
  <h3>To-Do ⏳</h3>
  <!-- Form untuk menambahkan todo baru -->
  <form @submit.prevent="addTodo">
    <input v-model="todo.text" type="text" name="text" />
    <button :disabled="!todo.text" type="submit" style="margin: 0 8px;">Add</button>
  </form>
  <div>
    <ul>
      <li v-for="pendingTodo in pendingTodos" :key="pendingTodo.id" style="margin: 8px 0">
        <span style="margin: 0 8px;">{{ pendingTodo.text }}</span>
        <!-- Tombol untuk pindah ke halaman edit dengan parameter ID -->
        <button @click="$router.push(`/edit/${pendingTodo.id}`)" style="margin: 0 4px;">✏️ Edit</button>
        <!-- Tombol untuk mark as completed -->
        <button @click="updateTodo({ ...pendingTodo, isCompleted: true})" style="margin: 0 4px;">✅</button>
        <!-- Tombol untuk hapus todo -->
        <button @click="destroyTodo(pendingTodo.id)">❌</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useTodos } from '@/stores/todos';

export default {
  data: () => ({
    todo: {
      id: null,
      text: null,
      isCompleted: false
    }
  }),
  computed: {
    ...mapState(useTodos, [
      'todos',
      'pendingTodos',
      'completedTodos'
    ])
  },
  methods: {
    ...mapActions(useTodos, [
      'storeTodo',
      'updateTodo',
      'destroyTodo'
    ]),
    // Method untuk add todo dan reset input
    addTodo() {
      this.storeTodo(this.todo); // Simpan todo ke store
      this.todo.text = null; // Reset input jadi kosong
    }
  }
}
</script>
