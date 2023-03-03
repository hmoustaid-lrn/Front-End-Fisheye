const searchParams = new URLSearchParams(location.search)
const photographerId = +searchParams.get('id')


async function displayHeader(photographer) {
    const photographerHeader = document.querySelector(".photograph-header")
    const photographerInfo = document.createElement('div')
    photographerInfo.classList.add('photograph-infos')
    const { name, picture, getUserCardDOM } = photographerFactory(photographer)
    const h1 = document.createElement('h1')
    h1.textContent = name
    const city = document.createElement('p')
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
    const contactTitle = document.querySelector('#contact_modal h2')
	contactTitle.innerHTML += name
};

async function displayMedias(medias){
    const photographerMediasSection = document.querySelector("#photograph-medias")
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        photographerMediasSection.appendChild(mediaModel);
    });
};

async function getPhotographerAndMedias(data) {
    const photographer = data.photographers.find((photograph) => photograph.id === photographerId)
    const medias = [];
    data.media.filter((media) => media.photographerId === photographerId).forEach(media => {
        const mediaObj = {
            id: media.id,
            photographerName: photographerFactory(photographer).name,
            title: media.title,
            image: media.image,
            video: media.video,
            likes: media.likes,
            date: media.date,
            price: media.price
        };
        medias.push(mediaObj);
    })
    return {photographer, medias}
}

// supprime le contenu media ferme la modal 
function closeLightboxWhenClicked() {
    const lightbox = document.querySelector('#lightbox')
    const lastDivLightbox = document.querySelector('#lightbox > div:last-child')
    lastDivLightbox.innerHTML = ''
	lightbox.style.display = 'none'
}


async function init() {
    //on attend une reponse de la requete fetch pour recuperer les infos du photographe
    const response = await fetch('./data/photographers.json')
    //on attend une reponse de la requete fetch pour recuperer les donnes en JSON
    const data = await response.json()
    //on affecte les infos du photographe a la variable photographer
    const {photographer, medias} = await getPhotographerAndMedias(data)
    displayHeader(photographer)
    displayMedias(medias)
};

init();