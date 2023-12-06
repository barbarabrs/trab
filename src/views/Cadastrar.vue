<template>
    <div class="cadastrar-container">
      <h2>Cadastrar</h2>
      <form @submit.prevent="handleFormSubmit">
        <div>
          <label for="username">Usuário:</label>
          <input v-model="state.username" name="username" type="text" />
          <span>{{ v$?.username?.$error }}</span>
        </div>
        <div>
          <label for="password">Senha:</label>
          <input v-model="state.password" name="password" type="password" />
          <span>{{ v$?.password?.$error }}</span>
        </div>
        <div>
          <label for="confirmPassword">Confirmar senha:</label>
          <input v-model="state.confirmPassword" name="confirmPassword" type="password" />
          <span>{{ v$?.confirmPassword?.$error }}</span>
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="state.email" name="email" type="email" />
          <span>{{ v$?.email?.$error }}</span>
        </div>
        <div>
          <button type="submit" class="nav-button">Cadastrar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required, email, minLength, sameAs } from '@vuelidate/validators';
  
  export default defineComponent({
    
    setup() {
      const state = ref({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
      });
  
      const rules = {
        username: { required },
        password: { required, minLength: minLength(4) },
        confirmPassword: { required, sameAs: sameAs(() => state.value.password) },
        email: { required, email }
      };
  
      const v$ = useVuelidate(rules, state);
  
      const handleFormSubmit = () => {
        if (v$?.value.$invalid) {
          alert('Por favor, preencha corretamente todos os campos.');
          return;
        }
  
        // Lógica para envio dos dados ou outras ações
  
        console.log('Dados do formulário:', state.value);
      };
  
      return { state, v$, handleFormSubmit };
    }
  });
  </script>
  
  <style scoped>
  /* Estilos do componente */
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
  