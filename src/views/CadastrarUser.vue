<template>
    <div class="cadastrar-container">
      <h2>Cadastrar</h2>
      <form @submit.prevent="handleFormSubmit">
        <div>
          <label for="username">Usuário:</label>
          <input v-model="state.username" id="username" type="text" />
          
        </div>
        <div>
          <label for="password">Senha:</label>
          <input v-model="state.password" name="password" type="password" />
          
        </div>
        <div>
          <label for="confirmPassword">Confirmar senha:</label>
          <input v-model="state.confirmPassword" name="confirmPassword" type="password" />
          
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="state.email" name="email" type="email" />
          
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
  import axios from 'axios'; // Importe o Axios
  
  export default defineComponent({
    
    setup() {
      const state = ref({
        username: null,
        password: '',
        confirmPassword: '',
        email: ''
      });
  
      const rules = {
        username: { required },
        password: { required, minLength: minLength(4) },
        confirmPassword: { required, sameAs: sameAs(() => state.value.password) },
        email: { required, email },
      };
      const v$ = useVuelidate(rules, state);
      
      const handleFormSubmit = async () => {
        try {

          if(!state.value.username || !state.value.password || !state.value.confirmPassword || !state.value.email){
            alert('Por favor, preencha todos os campos.');
            return;

          }
          if(state.value.password.length < 4){
            alert('A senha deve ter no mínimo 4 dígitos');
            return;
          }
          const response = await axios.post('http://localhost:3000/cadastrarUser', {   

      
            username: state.value.username,
            password: state.value.password,
            confirmPassword: state.value.confirmPassword,
            email: state.value.email,                 
            
          }        
          );
          

          console.log(state.value.password);
          console.log(state.value.confirmPassword);

          console.log('Resposta do servidor:', response.data);
          alert(response.data);
          
        } catch (error) {
          console.error('Erro ao enviar dados:', error);
          alert(error.response.data);
          // Tratar erros aqui, exibir mensagens de erro, etc.
        }
      };  
    return { state, v$, handleFormSubmit };
    }
    
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
  