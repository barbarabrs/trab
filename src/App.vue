<template>
  <div class="app">
    <header class="header">
      <nav>
        <RouterLink to="/login" class="nav-button">Login</RouterLink>
        <RouterLink to="/cadastrar" class="nav-button">Cadastrar</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <div class="centered-div">
        <p class="centered-text">
          Aqui você monta a playlist do seu jeito!
        </p>
      </div>
      
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Estilos para .app e seus componentes aqui */

/* Estilos para o corpo do documento (fora do escopo do componente Vue) */
body {
  margin: 0;
  padding: 0;
  background-image: url('./assets/background.jpg');
  background-color: #f9f9f952;
  background-size: auto;  
  background-repeat: repeat;
  background-position: 0 0;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

}

.header {
  display: flex;
  width: 100%;
  padding: 32px 0;
  justify-content: flex-end;
  align-items: center;
  background: rgba(55, 48, 107, 0.30);
  color: #FFFFFF;
}

.nav {
  display: flex;
  margin-right: 160px;
}

.nav-button {
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #9E4784;
  color: #FFFFFF;
  text-decoration: none;
  margin-left: 10px;
}

.nav-button:hover {
  background-color: #FFFFFF;
  color: #9E4784;
  transition: background-color 0.3s, color 0.3s;
}

.main-content {
  flex: 1;
  padding-top: 110px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.centered-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
  color: #9E4784;
  background-color: #f9f9f952;
}

.centered-text {
  width: 90%;
  max-width: 1020px;
  color: #FFFFFF;
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Newsreader;
  font-size: 4vw;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0;
  
}
</style>

