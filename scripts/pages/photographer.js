const searchParams = new URLSearchParams(location.search)
const photographerId = +searchParams.get('id')


async function displayHeader(photographer) {
    const photographerHeader = document.querySelector(".photograph-header")
    const photographerInfo = document.createElement('div')
    photographerInfo.classList.add('photograph-infos')
    const { name, picture, getUserCardDOM} = photographerFactory(photographer)
    const h1 = document.createElement('h1')
    h1.textContent = name
    const city = document.createElement('p')
    console.log(city)
    city.textContent = getUserCardDOM().querySelector("#city").textContent
    const tag = document.createElement('p')
    tag.textContent = getUserCardDOM().querySelector("#tag").textContent
    photographerInfo.appendChild(h1)
    photographerInfo.appendChild(city)
    photographerInfo.appendChild(tag)
    const contactButton = document.querySelector(".contact_button");
    contactButton.parentNode.insertBefore(photographerInfo, contactButton);
    const image = document.createElement('img')
    image.src = picture
	image.alt = name
    photographerHeader.appendChild(image)
};

async function init() {
    //on attend une reponse de la requete fetch pour recuperer les infos du photographe
	const response = await fetch('./data/photographers.json')
	//on attend une reponse de la requete fetch pour recuperer les donnes en JSON
	const data = await response.json()
	//on affecte les infos du photographe a la variable photographer
	const photographer = data.photographers.find((photograph) => photograph.id === photographerId)
    displayHeader(photographer)
};

init();