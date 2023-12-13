<template>
  <div class="editar-container">
    <h2>Editar Usuário</h2>
    <form @submit.prevent="handleEditSubmit">
      <div>
        <label for="editUsername">Email:</label>
        <input v-model="state.editUsername" id="email" type="text" />
      </div>
      <div>
        <label for="editPassword">Nova Senha:</label>
        <input v-model="state.editPassword" name="editPassword" type="password" />
      </div>
      <div>
        <label for="confirmEditPassword">Confirmar Nova Senha:</label>
        <input v-model="state.confirmEditPassword" name="confirmEditPassword" type="password" />
      </div>
      <div>
        <button type="submit" class="nav-button">Salvar Alterações</button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, sameAs } from '@vuelidate/validators';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    

    const state = ref({
      email: '',
      editPassword: '',
      confirmEditPassword: '',
    });

    const rules = {
      editUsername: { required },
      editPassword: { minLength: minLength(4) },
      confirmEditPassword: { sameAs: sameAs(() => state.value.editPassword) },
    };

    const v$ = useVuelidate(rules, state);

    const handleEditSubmit = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // const userId = state.value.userId;
        const response = await axios.put(`http://localhost:3000/editarUser/${email}`, {
          editUsername: state.value.editUsername,
          editPassword: state.value.editPassword,
        }, config);

        console.log('Resposta do servidor:', response.data);
        alert(response.data);
        
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    };

    return { state, v$, handleEditSubmit };
  },
});
</script>

<style scoped>
  
  .cadastrar-container {
    max-width: 300px;
    margin: auto;
    padding: 20px;
    border: 3px solid #9E4784; /* Adicionando uma borda */
    background-color: #f9f9f952; /* Adicionando um fundo mais claro */
    border-radius: 8px;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #FFF;
  }
  
  form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
  }
  
  div {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  input[type="password"],
  input[type="email"],
  button {
    padding: 8px;
    font-size: 16px;
    background-color: #FFF;
    border-radius: 8px;
    border-color: #9E4784;
  }
  
  .nav-button {
    padding: 10px 20px;
    border-radius: 8px;
    background-color: #9E4784;
    color: #FFFFFF;
    text-decoration: none;
    margin-left: 10px;
    border-color: #9E4784;
  }
  
  .nav-button:hover {
    background-color: #FFFFFF;
    color: #9E4784;
    transition: background-color 0.3s, color 0.3s;
  }
  </style>
  