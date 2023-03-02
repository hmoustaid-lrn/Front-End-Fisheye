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


async function displayMedias(medias) {
    const photographerMediasSection = document.querySelector("#photograph-medias")
    for (const media of medias) {
        const article = document.createElement('article')
        article.id = media.id
		const link = document.createElement('a')
        link.href = "#"
		const mediaElement = media.video ? document.createElement('video') : document.createElement('img')   
        mediaElement.src = `./assets/photographers/Photographers media/${media.photographerName.split(" ")[0]}/${media.video ?? media.image}`
		mediaElement.alt = media.title
		mediaElement.controls = false
		mediaElement.autoplay = false 
        const divCaption = document.createElement('div')
		const title = document.createElement('p')
		const likes = document.createElement('p')
		title.textContent = media.title
		likes.textContent = media.likes + ' ♥'
        link.appendChild(article)
		article.appendChild(mediaElement)
		article.appendChild(divCaption)
		divCaption.appendChild(title)
		divCaption.appendChild(likes)
		photographerMediasSection.appendChild(link)
    }
};

async function getPhotographerAndMedias(data) {
    const photographer = data.photographers.find((photograph) => photograph.id === photographerId)
    const medias = [];
    console.log(photographerFactory(photographer).name)
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