// Selecciona todos las etiquetas <a> que son opciones
const options = document.querySelectorAll("a");

// Selecciona el formulario
const form = document.querySelector('form');

// Para cada etiqueta <a> se agrega el evento que cambia la visibilidad
options.forEach(option => {
  option.addEventListener('mouseenter', () => {
    form.style.opacity = '0';
    form.style.visibility = 'hidden';
    form.style.transition = 'opacity 0.8s ease, visibility 0s linear 0.5s';
  });

  option.addEventListener('mouseleave', () => {
    form.style.opacity = '1';
    form.style.visibility = 'visible';
    form.style.transition = 'opacity 2.3s ease';
  });
});


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

// mostar los personajes en el html
async function renderCaracters(url) {
    await getData(url)
    console.log(caracters)
    caracters.forEach(caracter => {
        let card = document.createElement("div");
        card.classList.add(
            "card",
            "bg-black",
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
            "w-[155px]",
            "sm:w-[200px]",
            "justify-between"
        );
        card.innerHTML = `
            <img class="w-[120px] h-[120px] object-cover rounded-full" src="${caracter.image}" alt="${caracter.name}">
            <div class = "flex">
                <h2 class="text-center text-base font-semibold text-white mt-4 break-words mr-1 ">#${caracter.id}</h2>
                <h2 class="text-center text-base font-semibold text-cyan-500 mt-4 break-words">${caracter.name}</h2>
            </div>
            <div>
                <h2 class="text-center text-base font-semibold text-white break-words">${caracter.species}</h2>
                <h2 class="text-center text-base font-semibold text-yellow-300 break-words">${caracter.gender}</h2>
            </div>

        `;
        container.appendChild(card);
    });
}

//input con el nombre del personaje
let input = document.getElementById("inputElement")

//funcion que se activa con el boton
function searchCaracter(){
    //limpiar el contenedor
    container.innerHTML=""
    //validar que el input no este vacio
    if (input.value=="") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Empty field"
          });
    }
    else{
    //renderisar los personaje que tienen contienen el nombre
    renderCaracters("https://rickandmortyapi.com/api/character/?name="+input.value)
    }
 }