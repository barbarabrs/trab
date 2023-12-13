
<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="username" style="color: #fff;" v-if="!this.username">Usuário:</label>
          <input type="text" id="username" v-model="username" />
          
        </div>
        <div>
          <label for="password" style="color: #fff">Senha:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <div>
          <button type="submit" class="nav-button">Login</button>
        </div>
      </form>
    </div>
  </template>

  
<script>
import axios from 'axios'; // Importe o Axios

export default {
  data() {
    return {
      username: '',
      password: '',      
      errorMessage: null, 
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:3000/loginUser', {
          email: this.email,
          password: this.password
        });
        
        const token = response.data.token;
        localStorage.setItem('token', token);
        
        this.$router.push('/areaLogada');
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data;
        } else if (error.request) {
          console.error(error.request);
        } else {
          console.error('Erro', error.message);
        }
      }
    }
  }
};
</script>

 
  
  <style scoped>
  /* Estilos do componente */
  .login-container {
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
  button {
    padding: 8px;
    font-size: 16px;
    background-color: #FFF;
    border-radius: 8px;
    border-color:  #9E4784;

  }

  .nav-button {
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #9E4784;
  color: #FFFFFF;
  text-decoration: none;
  margin-left: 10px;
  border-color:  #9E4784;
    }

.nav-button:hover {
  background-color: #FFFFFF;
  color: #9E4784;
  transition: background-color 0.3s, color 0.3s;
}
.error-message {
  color: red;
  font-weight: bold;
}
  </style>
  