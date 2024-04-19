// Pegando nome,número e id dos pokemons
const pokeName = document.querySelector('.pokemonName');
const pokeNumber = document.querySelector('.pokemonNumber');
const pokeImage = document.querySelector('.pokemonImage');

// Pegando dados do formulário e input
const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');

//Pegando os botões
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

//Para armazenar um id para os botões
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
// await espera o fetch concluir e retornar uma resposta, ele só pode ser usado em funções assincronas

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   
    // Para validar o status do que foi digitado, se não existir um pokemon com o nome digitado, não irá retornar
    // nada
    if(APIResponse.status === 200){
        // função para extrair os dados da API
        const data = await APIResponse.json();
        // para utilizar esses dados em outra função
        return data;
    } 
}

// Função para renderizar os dados na tela 
const renderPokemon = async (pokemon) =>{
    //mostrar que está carregando para o usuário
    pokeName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);

    //Só irá mostrar o nome do pokemon se ele existir no data, se não, mostrará not found
    if(data){
        pokeImage.style.display = "block";
        pokeName.innerHTML = data.name;
        pokeNumber.innerHTML = data.id;
        pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']
        ['front_default'];
        //Para limpar o input depois de digitar algo
        input.value = '';
        //para atualizar a variável searchPokemon, com o id correspondente
        searchPokemon = data.id;
    }else {
        pokeImage.style.display = 'none';
        pokeName.innerHTML = 'Not found :c ';
        pokeNumber.innerHTML = 'X';
        input.value = '';
    }
}

// quando o formulário for enviado vamos executar uma função, vamos passar a arrowFunction direto no parâmetro
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Passando o valor do input para ser renderizado, .toLowerCase(), para que a busca funcione digitando tanto 
    //em minúsculo quanto maiúsculo.
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    //Para limitar em 1 e não decrementar número negativo
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    } 
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

//Para sempre que abrir o site ele mostrar o 1ºpokemon
renderPokemon(searchPokemon);
