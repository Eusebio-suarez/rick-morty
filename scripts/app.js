//personajes
let caracters =[]

//informacion de respuesta
let info

//consumir el api de rick and morty
async function getData(url) {
    let answer = await fetch(url);
    let data = await answer.json();
    caracters = data.results;
}

// contenedor en el html
let container = document.getElementById("container")

// mostar los personajes
async function renderCaracters(url) {
    await getData(url)
    console.log(caracters)
    caracters.forEach(caracter => {
        let card = document.createElement("div");
        card.classList.add(
            "card",
            "bg-emerald-600", // verde esmeralda
            "rounded-xl",
            "overflow-hidden",
            "shadow-lg",
            "p-4",
            "flex",
            "flex-col",
            "items-center",
            "hover:scale-105",
            "transition",
            "duration-300",
            "ease-in-out",
            "w-[200px]",
            "justify-between"
        );
        card.innerHTML = `
            <img class="w-[120px] h-[120px] object-cover rounded-full" src="${caracter.image}" alt="${caracter.name}">
            <div class = "flex">
            <h2 class="text-center text-base font-semibold text-blue-300 mt-4 break-words mr-1 ">#${caracter.id}</h2>
                <h2 class="text-center text-base font-semibold text-blue-400 mt-4 break-words">${caracter.name}</h2>
            </div>
            <div>
                <h2 class="text-center text-base font-semibold text-white break-words">${caracter.species}</h2>
                <h2 class="text-center text-base font-semibold text-yellow-300 break-words">${caracter.gender}</h2>
            </div>

        `;
        container.appendChild(card);
    });
}

//Renderizar los primero 200 personajes 
//Cada consulta devuelve 20 personajes
for (let index = 1; index < 11; index++) {
    renderCaracters("https://rickandmortyapi.com/api/character/?page="+index)
}
