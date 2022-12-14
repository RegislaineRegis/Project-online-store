Este projeto conteúdos realizados por _[Regislaine Fidelis Regis](https://www.linkedin.com/in/regislaine-regis/)_ enquanto estudava na [Trybe](https://www.betrybe.com/) :rocket:

# Project Online Store

Primeiro projeto em grupo do curso, os desenvolvedores foram:

* [Regislaine Regis](https://github.com/RegislaineRegis)
* [Débora Serra](https://github.com/DeboraSerra)
* [Jaziel Silva](https://github.com/Jazyel99)
* [Pedro Henrique Moura](https://github.com/PedroHOM16)
* [Victor Reksidler](https://github.com/vbreksidler)

Neste projeto criamos uma versão simplificada, sem persistência no banco de dados, de uma loja online, apenas o acesso a uma API,
desenvolvendo em grupo suas funcionalidades de acordo com demandas definidas em um quadro Kanban, em um cenário mais próximo ao do 
mercado de trabalho. A partir dessas demandas, concluimos uma aplicação onde os usuários poderão:

 * Buscar produtos por termos e categorias a partir da API do Mercado Livre;
 * Interagir com os produtos buscados de modo a adicioná-los e removê-los de um carrinho de compras em diferentes quantidades;
 * Visualizar detalhes e avaliações prévias de um produto, bem como criar novas avaliações;
 * E por fim, finalizar a compra (simulada) dos itens selecionados.

# **Técnologias usadas**

Front-end:
> Desenvolvido usando: **CSS3**, **HTML5**, **JAVASCRIPT**, **REACT-ROUTER**, **METODOLOGIAS ÁGEIS**, **CICLO DE VIDA EM REACT**;


Veja abaixo um exemplo do projeto dividido em duas etapas:
![gravacao-online-store-1](https://user-images.githubusercontent.com/94489726/200147950-dda2fb60-a3ac-4dc2-adcf-b354c5f1382a.gif)

![gravacao-online-store-2 gif](https://user-images.githubusercontent.com/94489726/200148087-6d8651f0-eefd-4195-a4ea-0ed1bff78fc4.gif)

## Instalação do projeto localmente:

Após cada um dos passos, haverá um exemplo do comando a ser digitado para fazer o que está sendo pedido, caso tenha dificuldades e o exemplo não seja suficiente, não hesite em me contatar em _nanafidelis@gmail.com_ 

1. Abra o terminal e crie um diretório no local de sua preferência com o comando **mkdir**:
```javascript
  mkdir projetos
```

2. Entre no diretório que acabou de criar e depois clone o projeto:
```javascript
  cd projetos
  git clone git@github.com:RegislaineRegis/Project-online-store.git
```
3. Instale as dependências e inicialize o projeto
  * Instale as dependências:
    * `npm install`
  * Inicialize o projeto:
    * `npm start`

Para evitar problemas de CORS, utilize a extensão Live Server do VSCode para conseguir carregar todos os assets externos, com o servidor rodando, abra o arquivo index.html, é necessário rodar um npm install para ver a aplicação

## Habilidades Desenvolvidas

Neste projeto, desenvolvi as seguintes habilidades:

- Entender o que são Métodos Ágeis
- Entender o que é Kanban
- Entender o que é Scrum
- Trabalhar em equipes utilizando Kanban ou Scrum de maneira eficaz
- Praticar todas as habilidades desenvolvidas até o momento de Front-End


## Escopo do Projeto

- [Requisitos do projeto](#requisitos-do-projeto)

      `Requisitos Obrigatórios`
    - [x] [1. Implemente o módulo de acesso à api do Mercado Livre](#1-implemente-o-módulo-de-acesso-à-api-do-mercado-livre)
    - [x] [2. Crie uma página de listagem de produtos vazia](#2-crie-uma-página-de-listagem-de-produtos-vazia)
    - [x] [3. Crie a página do carrinho de compras](#3-crie-a-página-do-carrinho-de-compras)
    - [x] [4. Liste as categorias de produtos disponíveis via API na página principal](#4-liste-as-categorias-de-produtos-disponíveis-via-api-na-página-principal)
    - [x] [5. Liste os produtos buscados por termos, com os dados resumidos, associados a esses termos](#5-liste-os-produtos-buscados-por-termos-com-os-dados-resumidos-associados-a-esses-termos)
    - [x] [6. Selecione uma categoria e mostre somente os produtos daquela categoria](#6-selecione-uma-categoria-e-mostre-somente-os-produtos-daquela-categoria)
   - [x] [7. Redirecione para uma tela com a exibição detalhada ao clicar na exibição resumida de um produto](#7-redirecione-para-uma-tela-com-a-exibição-detalhada-ao-clicar-na-exibição-resumida-de-um-produto)
   - [x] [8. Adicione produtos a partir da tela de listagem de produtos](#8-adicione-produtos-a-partir-da-tela-de-listagem-de-produtos)
    - [x] [9. Adicione um produto ao carrinho a partir de sua tela de exibição detalhada](#9-adicione-um-produto-ao-carrinho-a-partir-de-sua-tela-de-exibição-detalhada)
    - [x] [10. Visualize a lista de produtos adicionados ao carrinho em sua página e permita a manipulação da sua quantidade](#10-visualize-a-lista-de-produtos-adicionados-ao-carrinho-em-sua-página-e-permita-a-manipulação-da-sua-quantidade)
    - [x] [11. Avalie e comente acerca de um produto em sua tela de exibição detalhada](#11-avalie-e-comente-acerca-de-um-produto-em-sua-tela-de-exibição-detalhada)
    - [x] [12. Finalize a compra vendo um resumo dela, preenchendo os seus dados e escolhendo a forma de pagamento](#12-finalize-a-compra-vendo-um-resumo-dela-preenchendo-os-seus-dados-e-escolhendo-a-forma-de-pagamento)

    `Requisitos Bônus`
   - [x] [13. Mostre junto ao ícone do carrinho a quantidade de produtos dentro dele, em todas as telas em que ele aparece](#13-mostre-junto-ao-ícone-do-carrinho-a-quantidade-de-produtos-dentro-dele-em-todas-as-telas-em-que-ele-aparece)
   - [x] [14. Limite a quantidade de produtos adicionados ao carrinho pela quantidade disponível em estoque](#14-limite-a-quantidade-de-produtos-adicionados-ao-carrinho-pela-quantidade-disponível-em-estoque)
   - [x] [15. Mostre quais produtos tem o frete grátis](#15-mostre-quais-produtos-tem-o-frete-grátis)

    `Requisitos Extras Não Avaliativos`
   - [x] [16. Faça um layout para o site](#16-faça-um-layout-para-o-site)
   - [x] [17. Faça um layout responsivo para o site](#17-faça-um-layout-responsivo-para-o-site)
   - [x] [18. Crie um seletor dropdown para ordenar a lista de produto por maior e menor preço](#18-crie-um-seletor-dropdown-para-ordenar-a-lista-de-produto-por-maior-e-menor-preço)
   - [x] [19. Coloque uma animação no carrinho para quando um produto for adicionado](#19-coloque-uma-animação-no-carrinho-para-quando-um-produto-for-adicionado)
   - [x] [20. Crie um slider lateral para exibir o carrinho na tela principal](#20-crie-um-slider-lateral-para-exibir-o-carrinho-na-tela-principal)
   - [x] [21. Destaque, na tela principal, os produtos já adicionados ao carrinho](#21-destaque-na-tela-principal-os-produtos-já-adicionados-ao-carrinho)
   - [x] [22. Impeça que a quantidade do produto seja negativa](#22-impeça-que-a-quantidade-do-produto-seja-negativa)
