function mediaFactory(media) {
    const { id, photographerId, title, image, video, likes, date, price} = media
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
    const titleImage = document.createElement('p')
    const likesImage = document.createElement('p')
    titleImage.textContent = media.title
    likesImage.textContent = media.likes + ' ♥'
    likesImage.addEventListener('click', function(event) {
        event.preventDefault()
        likesImage.textContent = ++media.likes + ' ♥'
    })
    article.appendChild(mediaElement)
    divCaption.appendChild(titleImage)
    divCaption.appendChild(likesImage)
    article.appendChild(divCaption)
    link.appendChild(article)
    return link
}