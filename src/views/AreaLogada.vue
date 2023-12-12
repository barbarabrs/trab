<template>
  <div class="full-background">
    <header>
      <div>
        <button class="botoes" @click="mostrarFormulario = !mostrarFormulario">
          Nova Playlist
        </button>
        <button class="botoes" @click="exibirPlaylists">Minhas Playlists</button>
        <button class="botoes">Minha conta</button>
      </div>
    </header>

    <main>
      <div class="center-div">
        <div class="inside-div">
          <!-- Mostrar o formulário para nome da playlist -->
          <div v-if="mostrarFormulario">
            <input type="text" v-model="novaPlaylist" placeholder="Digite o nome da playlist" />
            <button class="botoes" @click="adicionarNomePlaylist">Continuar</button>
          </div>
          <!-- Mostrar os botões após adicionar o nome da playlist -->
          <div v-if="mostrarBotaoSalvar">
            <button class="botoes" @click="salvarPlaylist">Salvar</button>
            <button class="botoes" @click="mostrarFormularioMusica = !mostrarFormularioMusica">Adicionar Música</button>
          </div>
          <!-- Mostrar formulário para adicionar música -->
          <div v-if="mostrarFormularioMusica">
            <input type="text" v-model="nomeMusica" placeholder="Nome da música" />
            <input type="text" v-model="artistaMusica" placeholder="Artista" />
            <button class="botoes" @click="adicionarMusica">Salvar Música</button>
          </div>
          <!-- Mostrar as playlists -->
          <ul v-if="mostrarPlaylists">
            <li v-for="(playlist, index) in playlists" :key="index" @click="exibirMusicas(index)">
              {{ playlist.nome }}
            </li>
          </ul>
          <!-- Exibir músicas da playlist selecionada -->
          <div v-if="playlistSelecionada !== null">
            <h3>Músicas da Playlist "{{ playlists[playlistSelecionada].nome }}"</h3>
            <ul>
              <li v-for="(musica, index) in playlists[playlistSelecionada].musicas" :key="index">
                {{ musica.nome }} - {{ musica.artista }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'SeuComponente',
  data() {
    return {
      novaPlaylist: '',
      playlists: [],
      mostrarFormulario: false,
      mostrarBotaoSalvar: false,
      mostrarFormularioMusica: false,
      nomeMusica: '',
      artistaMusica: '',
      playlistSelecionada: null,
      mostrarPlaylists: false // Adicionando um estado para mostrar/esconder as playlists
    };
  },
  methods: {
    adicionarNomePlaylist() {
      if (this.novaPlaylist.trim() !== '') {
        this.mostrarFormulario = false;
        this.mostrarBotaoSalvar = true;
        this.playlists.push({
          nome: this.novaPlaylist,
          musicas: []
        });
      }
    },
    salvarPlaylist() {
      // Lógica para salvar a playlist
      this.mostrarBotaoSalvar = false;
      this.novaPlaylist = '';
    },
    adicionarMusica() {
      if (this.nomeMusica.trim() !== '' && this.artistaMusica.trim() !== '' && this.playlistSelecionada !== null) {
        this.playlists[this.playlistSelecionada].musicas.push({
          nome: this.nomeMusica,
          artista: this.artistaMusica
        });
        this.nomeMusica = '';
        this.artistaMusica = '';
        this.mostrarFormularioMusica = false;
      }
    },
    exibirMusicas(index) {
      this.playlistSelecionada = index;
    },
    exibirPlaylists() {
      this.mostrarPlaylists = true; // Mostrar as playlists ao clicar no botão "Minhas Playlists"
    }
  }
};
</script>




<style>
/* Estilos específicos para o seu componente */

.full-background {
  width: 100%;
  height: 100vh; /* 100% da altura da janela do navegador */
  background-color: #9E4784;
  background-image: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
main {
  background-color: #fff;
  background-image: none;
}

.center-div {
  width: 100%;
  max-width: 1062px;
  height: 711px;
  border-radius: 30px;
  background: #d9d9d9;
}

.inside-div {
  width: 100%;
  height: 418px;
  border-radius: 0px 0px 20px 20px;
  background: #2d2d2d;
}

.botoes {
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #9E4784;
  color: #FFFFFF;
  text-decoration: none;
  margin-left: 10px;
}
.botoes:hover {
  background-color: #FFFFFF;
  color: #9E4784;
  transition: background-color 0.3s, color 0.3s;
}
input[type="text"]{
    padding: 8px;
    font-size: 16px;
    background-color: #FFF;
    border-radius: 8px;
    border-color:  #9E4784;

  }
.header{
  visibility: hidden;
}
.centered-div{
  visibility: hidden;
}
.centered-text{
  visibility: hidden;
}
.app{
  background-color: #9E4784;
}
</style>