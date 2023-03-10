const searchParams = new URLSearchParams(location.search)
const photographerId = +searchParams.get('id')
let currentMediaElement
let medias
let photographer

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

function displayMedias(medias) {
    const photographerMediasSection = document.querySelector("#photograph-medias")
    //C'est nécessaire pour pouvoir recharger les médias après un changement de tri
    photographerMediasSection.innerHTML = ''
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaElement = mediaModel.firstChild.firstChild
        photographerMediasSection.appendChild(mediaModel)
        displayLightboxIfMediaClicked(mediaElement)
    });
};

function displayLikesPrice(medias, price) {
	const likesAndPrice = document.querySelector('#photograph-likes-price')
	likesAndPrice.children[0].textContent = medias.reduce((sum, media) => sum + media.likes, 0) + ' ♥'
	likesAndPrice.children[1].textContent = price + '€ / jour'
}

async function displayLightboxIfMediaClicked(mediaElement){
    mediaElement.addEventListener('click', function() {
        const lightbox = document.querySelector('#lightbox')
        lightbox.style.display = 'inherit'
        populateLightbox(mediaElement)
    })
}


function populateLightbox(mediaElement) {
    const lastDivLightbox = document.querySelector('#lightbox > div:last-child')
    lastDivLightbox.innerHTML = ''
    lastDivLightbox.appendChild(mediaElement.cloneNode())
    const mediaTitle = mediaElement.nextElementSibling.firstChild
    //true pour qu'il clone même le texte
    lastDivLightbox.appendChild(mediaTitle.cloneNode(true))
    currentMediaElement = mediaElement
}



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


function closeLightbox() {
    const lightbox = document.querySelector('#lightbox')
    lightbox.style.display = 'none'
}

function sortMedias() {
    const selectedValue = document.getElementById("sortingSelect").value;
    switch (selectedValue) {
        case 'popularity': medias.sort((a, b) => b.likes - a.likes)
            break
        case 'date': medias.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            //Pour vérifier que le tri par date fonctionne correctement
            let dates = medias.map(media => media.title + ' ' + media.date)
            console.log(dates)
            break
        case 'title': medias.sort((a, b) => a.title.localeCompare(b.title))
            break
    }
    displayMedias(medias)
}

async function init() {
    //on attend une reponse de la requete fetch pour recuperer les infos du photographe
    const response = await fetch('./data/photographers.json')
    //on attend une reponse de la requete fetch pour recuperer les donnes en JSON
    const data = await response.json()
    const photographerAndMedias = await getPhotographerAndMedias(data)
    photographer = photographerAndMedias.photographer
    medias = photographerAndMedias.medias
    displayHeader(photographer)
    sortMedias()
    displayLikesPrice(medias, photographer.price)
    registerLightboxKeyEvents()

}

function registerLightboxKeyEvents(){
    const lightbox = document.querySelector('#lightbox')
    addEventListener('keydown', (event) => {
        if (lightbox.style.display === 'none') {
            return
        }
        if (event.code === 'Escape') {
            return closeLightbox()
        }
        if (event.code === 'ArrowRight') {
            return scrollMedias('right')
        }
        if (event.code === 'ArrowLeft') {
            return scrollMedias('left')
        }
    })
}

function scrollMedias(direction){
    let newMediaElement
    let rightSibling = newMediaElement = currentMediaElement.parentElement.parentElement.nextElementSibling
    let leftSibling = currentMediaElement.parentElement.parentElement.previousElementSibling
    switch(direction){
        case 'right': if(!rightSibling){
                        newMediaElement = leftSibling.parentElement.firstChild.firstChild.firstChild
                        break
                      }
                      newMediaElement = rightSibling.firstChild.firstChild
                      break
        case 'left':  if(!leftSibling){
                        newMediaElement = rightSibling.parentElement.lastChild.firstChild.firstChild
                        break
                      }
                      newMediaElement = leftSibling.firstChild.firstChild
                      break
    }
    populateLightbox(newMediaElement)
}

init();