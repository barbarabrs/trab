require("dotenv").config();
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Necessário para extrair os dados de Forms vindos de uma requisição POST
app.use(express.json());
app.use(cors());


app.listen(3000, () => {
    console.log('Servidor na porta 3000');
});

const User = require('./model/User');
const Playlist = require('./model/Playlist');

//Requisicao com POST publica para autenticar usuário
app.post('/loginUser', async (req,res) => {

    //extraindo os dados do formulário para criacao do usuario
    const {email, password} = req.body; 

    const jsonPath = path.join( __dirname, '.','db', 'banco-dados-usuario.json');
    const usuariosCadastrados = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

    const user = usuariosCadastrados.find(user => user.email === email);

    if (!user) {
        return res.status(409).send(`Usuário com email ${email} não encontrado.`);
    }

    try {
        const passwordValidated = await bcrypt.compare(password, user.password);

        if (!passwordValidated) {
            return res.status(422).send(`Senha incorreta para o usuário ${email}.`);
        }

        const token = jwt.sign(user, process.env.TOKEN);
        return res.json({ token });
    } catch(error) {

        console.error('Erro ao validar senha:', error);
        return res.status(500).send('Erro interno ao fazer login.');

    }


})

//Requisicao com POST publica para criar usuário
app.post('/cadastrarUser', async (req,res) => {
    //extraindo os dados do formulário para criacao do usuario
    const {username, password, confirmPassword, email} = req.body; 
    
    const jsonPath = path.join(__dirname, '.', 'db', 'banco-dados-usuario.json');
    const usuariosCadastrados = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

    //verifica se já existe usuario com o email informado
    
    const existingUser = usuariosCadastrados.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).send(`Usuário com email ${email} já existe.`);
    }
    if (password !== confirmPassword) {
        return res.status(409).send(`A senha e a confirmação de senha não coincidem.`);
    }
 
    const id = usuariosCadastrados.length + 1;
    const salt = await bcrypt.genSalt(10);
    const passwordCrypt = await bcrypt.hash(password,salt);

    const user = new User(id, username, email, passwordCrypt);
            

        
    usuariosCadastrados.push(user);
    fs.writeFileSync(jsonPath,JSON.stringify(usuariosCadastrados,null,2));
    return res.send(`Tudo certo usuario criado com sucesso.`);

    
});

// Requisicao com PUT para editar usuário
app.put('/editarUser/:userId', verificaToken, async (req, res) => {


    // Extrair os dados do formulário para edição do usuário
    const { editUsername, editPassword } = req.body;

    const jsonPath = path.join(__dirname, '.', 'db', 'banco-dados-usuario.json');
    const usuariosCadastrados = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

    // Encontrar o usuário pelo ID

    const userIndex = usuariosCadastrados.findIndex(user => user.email === editUsername);

    if (userIndex === -1) {
        return res.status(404).send(`Usuário com email não encontrado.`);
    }

    
    
    // Verificar se há uma nova senha e criptografar, se necessário
    if (editPassword) {
        const salt = await bcrypt.genSalt(10);
        const passwordCrypt = await bcrypt.hash(editPassword, salt);
        usuariosCadastrados[userIndex].password = passwordCrypt;
    }

    // Salvar as alterações no arquivo JSON
    fs.writeFileSync(jsonPath, JSON.stringify(usuariosCadastrados, null, 2));

    return res.send(`Usuário com  ${editUsername} editado com sucesso.`);
});

const lerPlaylistsDoArquivo = () => {
    try {
      const playlists = fs.readFileSync(playlistsFilePath, 'utf8');
      return JSON.parse(playlists);
    } catch (error) {
      return [];
    }
  };
  
  // Função para escrever os dados das playlists no arquivo JSON
  const escreverPlaylistsNoArquivo = (playlists) => {
    fs.writeFileSync(playlistsFilePath, JSON.stringify(playlists, null, 2), 'utf8');
  };



app.get('/areaLogada', verificaToken,  (req,res) => {
    try{
        const jsonPath = path.join(__dirname, '.', 'db', 'playlists.json');
        const playlists = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

        return res.json(playlists);

    }catch(erro){
        console.log(erro);
    }

    
    
;
})
app.post('/areaLogada/:nomePlaylist', async (req,res) => {
    //extraindo os dados do formulário para criacao do usuario
    const {nomePlaylist} = req.body; 

    try{
        
        const playlists = lerPlaylistsDoArquivo();
        const id = playlists.length + 1;
        const novaPlaylist = { id, nome: nomePlaylist};
        playlists.push(novaPlaylist);
        escreverPlaylistsNoArquivo(playlists);
        return res.send(`Playlist ${nomePlaylist} criada com sucesso.`);
    }catch(erro){

        return res.status(500).send('Erro ao criar a playlist.');
    }
        
});

app.get('/areaLogada/:musicas', verificaToken, (req,res) => {

  
    
    const jsonPath = path.join(__dirname, '.', 'db', 'musicas.json');
    const musicas = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));
    
    const params = req.params;
    for(let musica of musicas){
        if(params.playlist.id()===musica.idPlaylist){
            return res.json(musicas);
        }
    }
    return res.status(403).send(`Musica não encontrada`);

})

app.put('/areaLogada/:idPlaylist', async (req, res) => {
    const { idPlaylist } = req.params;
    const { nomePlaylist } = req.body;
  
    try {
      let playlists = lerPlaylistsDoArquivo();
      const playlistIndex = playlists.findIndex((playlist) => playlist.id === idPlaylist);
      if (playlistIndex === -1) {
        return res.status(404).send('Playlist não encontrada.');
      }
      playlists[playlistIndex].nome = nomePlaylist;
      escreverPlaylistsNoArquivo(playlists);
      return res.send(`Playlist ${idPlaylist} atualizada com sucesso.`);
    } catch (error) {
      return res.status(500).send('Erro ao atualizar a playlist.');
    }
  });

  app.delete('/areaLogada/:idPlaylist', async (req, res) => {
    const { idPlaylist } = req.params;
  
    try {
      let playlists = lerPlaylistsDoArquivo();
      playlists = playlists.filter((playlist) => playlist.id !== idPlaylist);
      escreverPlaylistsNoArquivo(playlists);
      return res.send(`Playlist ${idPlaylist} deletada com sucesso.`);
    } catch (error) {
      return res.status(500).send('Erro ao deletar a playlist.');
    }
  });

function verificaToken(req,res,next){

    const authHeaders = req.headers['authorization'];
    
    const token = authHeaders && authHeaders.split(' ')[1]

    if(token == null) return res.status(401).send('Acesso Negado');

    jwt.verify(token, process.env.TOKEN, (err) => {
        if(err) return res.status(403).send('Token Inválido/Expirado');
        next();
    })

}