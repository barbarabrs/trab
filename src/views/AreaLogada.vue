<template>
  <div class="full-background">
    <header class="navigation-header">
      <div class="navigation-buttons">
        <button class="botoes" @click="mostrarFormulario = !mostrarFormulario">
          Nova Playlist
        </button>
        <button class="botoes" @click="exibirPlaylists">Minhas Playlists</button>
        <button class="botoes">Minha conta</button>
      </div>
    </header>

    <main class="content">
      <div class="center-div">
        <div class="inside-div">
          <!-- Mostrar o formulário para nome da playlist -->
          <div class="dialog-box dialog-playlist" v-if="mostrarFormulario">
            <input type="text" v-model="novaPlaylist" placeholder="Digite o nome da playlist" />
            <button class="botoes" @click="adicionarNomePlaylist">Continuar</button>
          </div>
<!-- Mostrar os botões após adicionar o nome da playlist -->
          <div v-if="mostrarBotaoSalvar">
            <button class="botoes" @click="salvarPlaylist">Salvar</button>
            <button class="botoes" @click="mostrarFormularioMusica = !mostrarFormularioMusica">Adicionar Música</button>
          </div>
          <!-- Mostrar formulário para adicionar música -->
          <div class="dialog-box dialog-music" v-if="mostrarFormularioMusica">
            <input type="text" v-model="nomeMusica" placeholder="Nome da música" />
            <input type="text" v-model="artistaMusica" placeholder="Artista" />
            <button class="botoes" @click="adicionarMusica">Salvar Música</button>
          </div>
          <!-- Mostrar as playlists -->
          <ul v-if="mostrarPlaylists">
            <li v-for="(playlist, index) in playlists" :key="index" @click="exibirMusicas(index)">
              {{ playlist.nome }}
              <button class="botoes" @click="editarPlaylist(index)">Editar</button>
              <button class="botoes" @click="deletarPlaylist(index)">Deletar</button>
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

            <!-- Adicionar música à playlist -->
            <div>
              <input type="text" v-model="novaMusica.nome" placeholder="Nome da música" />
              <input type="text" v-model="novaMusica.artista" placeholder="Artista" />
              <button class="botoes" @click="adicionarMusica">Adicionar Música</button>
            </div>
          </div>

          <!-- Mostrar as playlists -->
          <ul v-if="mostrarPlaylists && playlistSelecionada === null">
            <li v-for="(playlist, index) in playlists" :key="index" @click="exibirMusicas(index)">
              {{ playlist.nome }}
            </li>
          </ul>
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
      musicasToAdd: [],
      novaMusica: {
        nome: '',
        artista: '',
      },
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
  if (this.novaPlaylist.trim() !== '') {
    const playlistExistente = this.playlists.find(playlist => playlist.nome === this.novaPlaylist);
    if (playlistExistente) {
      // Playlist com o mesmo nome já existe, não criar outra
      this.mostrarBotaoSalvar = false;
      this.mostrarFormularioMusica = false;
      this.novaPlaylist = '';
      this.musicasToAdd = [];
    } else {
      // Playlist não existe, criar uma nova
      if (this.musicasToAdd.length > 0) {
        this.playlists.push({
          nome: this.novaPlaylist,
          musicas: this.musicasToAdd.slice() // Copia as músicas para a nova playlist
        });
      } else {
        this.playlists.push({
          nome: this.novaPlaylist,
          musicas: []
        });
      }

      this.mostrarBotaoSalvar = false;
      this.mostrarFormularioMusica = false;
      this.novaPlaylist = '';
      this.musicasToAdd = [];
    }
  }
},

adicionarMusica() {
  if (this.nomeMusica.trim() !== '' && this.artistaMusica.trim() !== '' && this.playlistSelecionada !== null) {
    this.playlists[this.playlistSelecionada].musicas.push({
      nome: this.novaMusica.nome,
      artista: this.novaMusica.artista
    });
    this.novaMusica.nome = '';
    this.novaMusica.artista = ''
    this.mostrarFormularioMusica = false;
  }
  


},

    exibirMusicas(index) {
      console.log('Índice da playlist selecionada:', index);
      
      this.playlistSelecionada = index;
      this.mostrarFormularioMusica = false; // Garante que o formulário de adicionar música esteja oculto
  },
  editarPlaylist(index) {
      // Implemente a lógica para editar a playlist com base no índice fornecido
      // Você pode abrir um diálogo ou realizar qualquer ação de edição necessária
      console.log(`Editar playlist ${index}`);
    },

    deletarPlaylist(index) {
      // Implemente a lógica para deletar a playlist com base no índice fornecido
      // Certifique-se de confirmar com o usuário antes de deletar
      console.log(`Deletar playlist ${index}`);
      if (confirm("Tem certeza de que deseja deletar esta playlist?")) {
        this.playlists.splice(index, 1);
      }
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

  background-image: none;
}
.navigation-header {
  width: 100%;
  background-color: #9E4784;
  padding: 20px 0;
  position: relative;
  z-index: 2;
}


.navigation-buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.dialog-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 3; /* Para ficar acima do restante do conteúdo */
}

.dialog-playlist {
  
}

.dialog-music {
  /* Estilos específicos para a caixa de diálogo de adição de música */
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