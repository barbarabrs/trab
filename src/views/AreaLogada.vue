<template>
  <div class="full-background">
    
    <header class="navigation-header">
      <div class="navigation-buttons">
        
        <button class="botoes" @click="mostrarFormulario = !mostrarFormulario">
          Nova Playlist
        </button>
        <button class="botoes" @click="exibirPlaylists">Minhas Playlists</button>
        <button class="botoes" @click="editarUser">Editar dados</button>
      </div>
    </header>

    <main class="content">
      <div class="center-div">
        <div class="inside-div">

          <div class="dialog-box dialog-playlist" v-if="mostrarFormulario">
            <input type="text" v-model="novaPlaylist" placeholder="Digite o nome da playlist" />
            <button class="botoes" @click="adicionarNomePlaylist">Continuar</button>
          </div>
          <form @submit.prevent="handleFormSubmit">
          <div v-if="mostrarBotaoSalvar">
            <button class="botoes" @click="salvarPlaylist">Salvar</button>
            <button class="botoes" @click="mostrarFormularioMusica = !mostrarFormularioMusica">Adicionar Música</button>
          </div>
        </form>
          <!-- Mostrar formulário para adicionar música -->
          <div class="dialog-box dialog-music" v-if="mostrarFormularioMusica">
            <input type="text" v-model="nomeMusica" placeholder="Nome da música" />
            <input type="text" v-model="artistaMusica" placeholder="Artista" />
            <button class="botoes" @click="adicionarMusica">Salvar Música</button>
          </div>
          <!-- Mostrar as playlists -->
          <ul class="dialog-box" v-if="mostrarPlaylists">
            <li v-for="(playlist, index) in playlists" :key="index" @click="exibirMusicas(index)">
              {{ playlist.nome }}
              <button class="botoes" @click="editarPlaylist(index)">Editar</button>
              <button class="botoes" @click="deletarPlaylist(index)">Deletar</button>
            </li>
          </ul>
          <!-- Exibir músicas da playlist selecionada -->
          <div v-if="playlistSelecionada !== null && playlists[playlistSelecionada]">
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
  import { defineComponent, ref } from 'vue'; 
  
  import axios from 'axios'; // Importe o Axios

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
      this.mostrarFormulario = false;
},
    
async salvarPlaylist() {
  if (this.novaPlaylist.trim() !== '') {
    const playlistExistente = this.playlists.find(playlist => playlist.nome === this.novaPlaylist);
    if (playlistExistente) {
      this.mostrarBotaoSalvar = false;
      this.mostrarFormularioMusica = false;
      this.novaPlaylist = '';
      this.musicasToAdd = [];
    } else {
      try {
        const response = await axios.post('http://localhost:3000/areaLogada', { nomePlaylist: this.novaPlaylist });
        console.log(response.data); // Exemplo: exibir mensagem de sucesso ou fazer algo com os dados retornados

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
      } catch (error) {
        console.error('Erro ao salvar playlist:', error);
      }
    }
  }
},

        
      


async adicionarMusica() {
  if (this.nomeMusica.trim() !== '' && this.artistaMusica.trim() !== '' && this.playlistSelecionada !== null) {
      try {
        const response = await axios.post('http://localhost:3000/areaLogada/' + this.playlists[this.playlistSelecionada].nome + '/musicas', {
          nome: this.nomeMusica,
          artista: this.artistaMusica
        });
        // Lógica após receber a resposta do servidor
        console.log(response.data); // Exemplo: exibir mensagem de sucesso ou fazer algo com os dados retornados

        this.playlists[this.playlistSelecionada].musicas.push({
          nome: this.nomeMusica,
          artista: this.artistaMusica
        });

        this.nomeMusica = '';
        this.artistaMusica = '';
        this.mostrarFormularioMusica = false;
      } catch (error) {
        console.error('Erro ao adicionar música:', error);
      }
    }
  },

    exibirMusicas(index) {
      console.log('Índice da playlist selecionada:', index);
      
      this.playlistSelecionada = index;
      this.mostrarFormularioMusica = false; // Garante que o formulário de adicionar música esteja oculto
  },
  editarPlaylist(index) {
    const nomePlaylistEditada = prompt('Digite o novo nome para a playlist:');
    if (nomePlaylistEditada !== null && nomePlaylistEditada.trim() !== '') {
      const playlistExistente = this.playlists.find(playlist => playlist.nome === nomePlaylistEditada);
      if (playlistExistente) {
        console.log('Já existe uma playlist com esse nome.');
        alert('Já existe uma playlist com esse nome.')
        return;
      }

      // Realizar a edição apenas se o nome fornecido for diferente e não existir na lista de playlists
      this.playlists[index].nome = nomePlaylistEditada;
      console.log(`Playlist editada para: ${nomePlaylistEditada}`);
    }
    console.log(`Editar playlist ${index}`);
    alert('Playlist editada com sucesso.')
  },
      

    deletarPlaylist(index) {
    

      if (confirm("Tem certeza de que deseja deletar esta playlist?")) {
      this.playlists.splice(index, 1);
      console.log(`Playlist deletada na posição ${index}`);
      alert('Playlist Deletada');
    }
    },

    
    exibirPlaylists() {
      this.mostrarPlaylists = true; 
     
    },
    editarUser(){
      this.$router.push('/editarUser');
    }


  },

mounted() {

   
      const state = ref({
        nomePlaylist: '',
      });
      const handleFormSubmit = async () => {
        try{

          const response = await axios.post('http://localhost:5173/areaLogada', {
          nome : state.value.nomePlaylist,
          }
          );
          alert(response.data);
        } catch(error){
          console.error('Erro ao enviar dados:', error);
        };
        
        
      
      }
      return { state,  handleFormSubmit}
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
  z-index: 3; 
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