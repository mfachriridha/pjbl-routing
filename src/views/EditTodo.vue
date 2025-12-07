<template>
  <div>
    <h3>Edit Todo ✏️</h3>
    <!-- Form untuk edit todo -->
    <form @submit.prevent="saveEdit" v-if="currentTodo">
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 8px;">Task:</label>
        <input
          v-model="editText"
          type="text"
          style="width: 300px; padding: 8px;"
          placeholder="Edit your task..."
        />
      </div>
      <div>
        <button type="submit" :disabled="!editText.trim()" style="margin-right: 8px;">
          💾 Save Changes
        </button>
        <button type="button" @click="cancel" style="background: #ccc;">
          ❌ Cancel
        </button>
      </div>
    </form>
    <!-- Pesan jika todo tidak ditemukan -->
    <p v-else style="color: red;">
      Todo tidak ditemukan!
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useTodos } from '@/stores/todos';

export default {
  data: () => ({
    // Menyimpan text yang sedang diedit
    editText: ''
  }),
  computed: {
    ...mapState(useTodos, ['todos']),
    // Mencari todo berdasarkan ID dari route params
    currentTodo() {
      const id = parseInt(this.$route.params.id);
      return this.todos.find(todo => todo.id === id);
    }
  },
  methods: {
    ...mapActions(useTodos, ['updateTodo']),
    // Method untuk menyimpan perubahan
    saveEdit() {
      if (this.editText.trim() && this.currentTodo) {
        // Update todo menggunakan action dari store
        this.updateTodo({
          id: this.currentTodo.id,
          text: this.editText,
          isCompleted: this.currentTodo.isCompleted
        });
        // Kembali ke halaman todo setelah save
        this.$router.push('/');
      }
    },
    // Method untuk cancel dan kembali
    cancel() {
      this.$router.push('/');
    }
  },
  // Saat component dimuat, copy text todo ke editText
  mounted() {
    if (this.currentTodo) {
      this.editText = this.currentTodo.text;
    }
  }
}
</script>
