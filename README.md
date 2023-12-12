Critérios e Requisitos Técnicos:
1. Ser uma aplicação web, isto é, precisa executar no navegador ok
2. Tela de Login e Cadastro de Usuário(a)
a. A Tela de Login deverá ter campo Usuário/Senha ok
b. Cadastro deverá ter Usuário/Senha/Confirmação Senha/Emailok
c. Tela de Login/Cadastro deverá ter as seguintes validações
i. Campo vazio => Todos os campos
ii. Checar email válido => Campo e-mail
iii. Chegar Senha/Confirmação Senha com no mínimo 4 dígitos => Campo Senha
iv. Idealmente utilizar alguma biblioteca para auxiliar o processo
3. Rotas Privadas
a. A aplicação não poderá ser acessada caso o login não tenha sucesso, de forma que
se o(a) usuário(a) tentar acessar diretamente “forçando” a rota, haverá um erro.
b. Para isso é necessário utilizar algum sistema de Autenticação/Autorização com
Tokens de validação.
i. Exemplo JSON Web Tokens
4. Utilizar framework frontend da escolha do grupo
a. Em sala de aula é apresentado uma introdução ao React, mas os grupos estão livres
para utilizar/estudar/aprender qualquer outro e precisam aprofundar.
Vue
5. Utilizar framework backend da escolha do grupo
a. Em sala de aula apresentei o NodeJS com Express, mas os grupos estão livres para
utilizar/estudar/aprender qualquer outro em qualquer linguagem
b. Exemplos: SpringBoot, ASP.NET, Flask, outros.
6. Comunicação front-back através de verbos HTTP
a. Em sala de aula fizemos a comunicação com HTTP utilizando verbos GET e POST
b. No trabalho será necessário utilizar PUT e DELETE também.
7. Utilizar arquivo ou banco de dados para implementar um CRUD completo, isto é:
a. Criar, Ler, Atualizar, e Deletar => Create Read Update Delete
b. Em sala de aula fizemos leitura/escrita em arquivos utilizando NodeJS, mas os
grupos devem seguir de acordo com a ferramenta de backend escolhida
c. Reafirmando que não é necessário utilizar banco de dados, sendo o uso de arquivos
suficiente (como visto em aula).
8. A aplicação deverá permitir que o(a) usuário(a) atualize os dados, como trocar a senha e
informar um novo e-mail.
9. A aplicação deverá certificar que o e-mail cadastrado é único, e não existe outro usuário
na base com o mesmo e-mail.
10.A aplicação deverá conter as seguintes funcionalidades mínimas
a. Cadastrar algum recurso ok

b. Atualizar algum recurso
c. Remover Algum Recurso ok
d. Ler algum recurso (como os do exemplo acima) ok
11.Versionamento com git e documentação ok
a. O projeto deverá ficar disponível em algum repositório público git.
b. Exemplos de hospedagem: GitHub, BitBucket, GitLab.
c. Documentação com README
i. Descrição do projeto, apresentando o negócio e as tecnologias utilizadas
ii. Descrever o problema que o projeto tenta resolver.
iii. Descrever por que é um problema importante