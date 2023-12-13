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


app.get('/areaLogada', verificaToken,  (req,res) => {

    //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
    //__dirname é o diretorio corrente onde esse arquivo esta executando
    const jsonPath = path.join(__dirname, '.', 'db', 'playlists.json');
    const playlists = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

    return res.json(playlists);

})

app.get('/disciplinas/:musicas', verificaToken, (req,res) => {

  
    //Abre o bd (aqui estamos simulando com arquivo) com as disciplinas
    //__dirname é o diretorio corrente onde esse arquivo esta executando
    const jsonPath = path.join(__dirname, '.', 'db', 'musicas.json');
    const musicas = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));
    
    const params = req.params;
    //buscar a disciplina
    for(let musica of musicas){
        if(params.playlist.id()===musica.idPlaylist){
            return res.json(musicas);
        }
    }
    return res.status(403).send(`Musica não encontrada`);

})

function verificaToken(req,res,next){

    const authHeaders = req.headers['authorization'];
    
    const token = authHeaders && authHeaders.split(' ')[1]
    //Bearer token

    if(token == null) return res.status(401).send('Acesso Negado');

    jwt.verify(token, process.env.TOKEN, (err) => {
        if(err) return res.status(403).send('Token Inválido/Expirado');
        next();
    })

}