


let pintaPokemons$$ = document.querySelector("#pokedex");//CONTENEDOR DE CARTAS DE POKEMON
const ALLTHEPOKI=[];//ARRAY DE PROPIEDAS DE CADA POKEMON



const pockemonPhone = () => {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((error) => console.log("No se ha podido mostrar listado de pokemons", error));
};

const pokiPhone = (pokiUrl) => {
  return fetch(pokiUrl)
    .then((response) => response.json())
    .then((response) => {
      //console.log(response);
      const poki = {
        name: response.name,
        weight: response.weight,
        id: response.id,
        type: response.types.map((type) => type.type.name),
        imageFront: response.sprites["front_default"],
        imageBack: response.sprites["back_default"],
        ability: response.abilities,
        gif: response.sprites.versions["generation-v"]["black-white"].animated["front_default"],
      };
      //console.log(poki.ability[0].ability.name);
      return poki;
    })
  
      //   return response;
    // })
    .catch((error) => console.log("No se ha podido mostrar caracteristicas de los pokemon", error));
};



const filterId = (event) => {
   
  const inputValue = event.target.value;
  const filtered = ALLTHEPOKI.filter((pokemon) => {
    const matchId = 25;
    if (pokemon.id==inputValue){
      return matchId;
    };
});
//console.log(filtered);
  drawPokemons(filtered);
};

const filter = (event) => {
   
  const inputValue = event.target.value.toLowerCase();
  const filtered = ALLTHEPOKI.filter((pokemon) => {
    const matchName = pokemon.name.toLowerCase().includes(inputValue);
    //const matchId = pokemon.id === Number(inputValue);

  return matchName; //return matchName || matchId;
  });

  drawPokemons(filtered);
};
const buttonAction =(event) => {
drawPokemonsBack(ALLTHEPOKI);
}
const buttonActionAll =(event) => {
  drawPokemons(ALLTHEPOKI);
}

const findByInput = () => {
  document.getElementById("input-search").addEventListener("input", filter);
  document.getElementById("input-search_id").addEventListener("input", filterId);
  document.getElementById("myButton").addEventListener("click",buttonAction);
  document.getElementById("myButtonAll").addEventListener("click",buttonActionAll);
};



const drawPokemons = async (pokemonList) => {//volcar en variable para no pasar por la funcion
  //let gallery = document.querySelector(".container");
   pintaPokemons$$.innerHTML = "";
  //console.log(pokemonList);
   for(pokemon of pokemonList){
    
       const li = document.createElement("li");
       li.className = "card";

       const pokiImg = document.createElement('img');
       const  pokiP = document.createElement('p');
       const pokiDivCont = document.createElement('div');
       const pokiDivContAby = document.createElement('div');
    
       pokiImg.className = "card-image";
       pokiImg.setAttribute("src", pokemon.gif); 
       pokiImg.setAttribute("alt", pokemon.name);

       pokiP.className = "card-title";
       pokiP.innerText = pokemon.name.toUpperCase();

       pokiDivCont.className = "card-subtitle";
       //pokiDivCont.innerText = `WEIGHT: ${pokemon.weight}`;
       pokiDivCont.innerText = `ID: ${pokemon.id}`;


       pokiDivContAby.className = "card-abilitys";
       pokiDivContAby.innerText = `${pokemon.type[0]} ${pokemon.type[1] ? ` & ${pokemon.type[1]}` : ''}`;
       if (pokemon.type[0]==="grass" || pokemon.type[1]==="grass"){//NO SERVIRIA SI PUEDIERAN TENER DOS DE LAS TIPOS (NO SE DA EL CASO)
        pokiDivContAby.className = "card-abilitys_grass";//pinto de verde todos los pokemon que tengan el tipo grass
       }else if (pokemon.type[0]==="fire" || pokemon.type[1]==="fire"){//pinto de rojo tipo fire
        pokiDivContAby.className = "card-abilitys_fire";
       }else if (pokemon.type[0]==="water" || pokemon.type[1]==="water"){//pinto de azul tipo water
        pokiDivContAby.className = "card-abilitys_water"; 
       }
       
       li.appendChild(pokiImg);
       li.appendChild(pokiP);
       li.appendChild(pokiDivContAby);
       li.appendChild(pokiDivCont);
       
       pintaPokemons$$.appendChild(li);

   }


};
const drawPokemonsBack = async (pokemonList) => {//volcar en variable para no pasar por la funcion
  console.log("hola");
   pintaPokemons$$.innerHTML = "";
  //console.log(pokemonList);
   for(pokemon of pokemonList){
    
       const li = document.createElement("li");
       li.className = "card";

       const pokiImg = document.createElement('img');
       const  pokiP = document.createElement('p');
       const pokiDivCont = document.createElement('div');
       const pokiDivContAby = document.createElement('div');
    
       pokiImg.className = "card-image";
       pokiImg.setAttribute("src", pokemon.imageBack); 
       pokiImg.setAttribute("alt", pokemon.name);

       pokiP.className = "card-title";
       pokiP.innerText = pokemon.name.toUpperCase();

       pokiDivCont.className = "card-subtitle";
       pokiDivCont.innerText = `WEIGHT: ${pokemon.weight}`;
       //pokiDivCont.innerText = `ID: ${pokemon.id}`;


       pokiDivContAby.className = "card-abilitys";
       let pokiAbility ="";
       for (abili of pokemon.ability) {
      pokiAbility += abili.ability.name + "  "   ;
       }

       pokiDivContAby.innerText = pokiAbility;
      //  if (pokemon.type[0]==="grass" || pokemon.type[1]==="grass"){//NO SERVIRIA SI PUEDIERAN TENER DOS DE LAS TIPOS (NO SE DA EL CASO)
      //   pokiDivContAby.className = "card-abilitys_grass";//pinto de verde todos los pokemon que tengan el tipo grass
      //  }else if (pokemon.type[0]==="fire" || pokemon.type[1]==="fire"){//pinto de rojo tipo fire
      //   pokiDivContAby.className = "card-abilitys_fire";
      //  }else if (pokemon.type[0]==="water" || pokemon.type[1]==="water"){//pinto de azul tipo water
      //   pokiDivContAby.className = "card-abilitys_water"; 
      //  }
       
       li.appendChild(pokiImg);
       li.appendChild(pokiP);
       li.appendChild(pokiDivContAby);
       li.appendChild(pokiDivCont);
       
       pintaPokemons$$.appendChild(li);

   }


};

const init = async () => {
  //addMyButton();
  findByInput();
  const pokemonList = await pockemonPhone();
  
  
  for (pokemon of pokemonList) {
    //const llamadaPoki = async () => {
      const atributes = await pokiPhone(pokemon.url);
      //console.log(atributes[0].ability.name);

      ALLTHEPOKI.push(atributes);
    //};
   // llamadaPoki();
  }
  //console.log(ALLTHEPOKI);;
  drawPokemons(ALLTHEPOKI);
};

init();
