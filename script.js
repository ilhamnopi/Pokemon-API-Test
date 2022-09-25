// Flexsible Get name
function $(el) {
  return el.charAt[0] == "#" ? document.querySelector(el) : document.querySelectorAll(el);
}

let pokemonList = $("#pokemon-list")[0];
let detailPokemon = $("#detail-pokemon")[0];

// onload
fetch("https://pokeapi.co/api/v2/pokemon/")
  .then(function (response) {
    if (response.status != 200) {
      console.log("Opss ada error -> " + response.status);
      return;
    }

    response.json().then(function (data) {
      let pokemons = data.results;
      pokemons.map((pokemon) => {
        let urls = pokemon.url; //inisialisasi url untuk di fetch

        fetch(urls).then(function (response) {
          response.json().then(function (poke) {
            pokemonList.insertAdjacentHTML(
              "beforeend",
              `
              <div class="card" onclick="detail('${pokemon.url}')">
                <div class="card-body bg-dark rounded" >
                <figure class="figures d-flex align-items-center align-self-center gap-5 m-0">
                <img class="img-small" src="${poke.sprites.front_default}">
                <figcaption> <h3 class="text-white">${pokemon.name}</h3></figcaption>
                <figure>
                </div>
              </div>
              `
            );
          });
        });
      });
    });
  })
  .catch(function (err) {
    console.log(err);
  });

function detail(url) {
  fetch(url).then(function (response) {
    response.json().then(function (pokemon) {
      document.getElementById("detail-pokemon").innerHTML = "";
      detailPokemon.insertAdjacentHTML(
        "beforeend",
        `
        <div class="card rounded card-detail p-4">
              <figure class="d-flex flex-column gap-3 justify-content-center align-items-center">
                <img src="${pokemon.sprites.other.dream_world.front_default}" />
                <figcaption>
                  <h4 class="fw-bold">${pokemon.name}</h4>
                </figcaption>
              </figure>
              <table class="table">
                <tbody>
                  <tr>
                    <td class="text-start"><h5 class="fw-bold">Name</h5></td>
                    <td class="text-end"><h5 class="fw-bold text-primary">${pokemon.name}</h5></td>
                  </tr>
                  <tr>
                    <td class="text-start"><h5 class="fw-bold">Hp</h5></td>
                    <td class="text-end"><h5 class="fw-bold text-primary">${pokemon.stats[0].base_stat}</h5></td>
                  </tr>
                  <tr>
                    <td class="text-start"><h5 class="fw-bold">Xp</h5></td>
                    <td class="text-end"><h5 class="fw-bold text-primary">${pokemon.base_experience}</h5></td>
                  </tr>
                  <tr>
                    <td class="text-start"><h5 class="fw-bold">Weigh</h5></td>
                    <td class="text-end"><h5 class="fw-bold text-primary">${pokemon.weight} kg</h5></td>
                  </tr>
                  <tr>
                    <td class="text-start"><h5 class="fw-bold">Height</h5></td>
                    <td class="text-end"><h5 class="fw-bold text-primary">${pokemon.height} M</h5></td>
                  </tr>
                </tbody>
              </table>
            </div>
        `
      );
    });
  });
}
