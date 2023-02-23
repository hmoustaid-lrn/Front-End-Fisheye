function photographerFactory(data) {
    // Déstruction de l'objet data pour récupérer les infos du photographe
    const { name, id, city, country, tagline, price, portrait} = data
    // La propriété portrait est utilisée pour construire un chemin vers la photo du photographe 
    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;
    // Les propriétés city et country sont combinées pour former le nom de la ville
    const cityName = `${city}, ${country}`
    /* La variable rate est utilisée pour stocker le tarif du photographe sous forme de chaîne de caractères 
    * avec la devise "€" et "/jour" à la fin.
    */
    const rate = `${price}€/jour`
    /* Retourne un élément de carte utilisateur sous forme d'article HTML pour le photographe. 
    * Cette carte contient l'image du photographe, son nom, sa ville, sa phrase d'accroche et son tarif.
    * Cette fonction  est utile pour générer dynamiquement l'élément HTML de la carte utilisateur pour chaque 
    * photographe en fonction des données fournies en entrée
    */
    function getUserCardDOM() {
        // Élément article créé pour encapsuler tous les autres éléments de la carte. 
        const article = document.createElement( 'article' );
        // Élément photographerPicture avec la source de l'image définie à partir de la variable picture qui contient le chemin de la photo du photographe.
        const photographerPicture = document.createElement( 'img' );
        photographerPicture.setAttribute("src", picture)
        // Élément photographerName pour le nom du photographe
        const photographerName = document.createElement( 'h2' );
        photographerName.textContent = name;
        const link = document.createElement('a');
        link.href = `../../photographer.html?id=${id}`;
        /* l'image et le nom sont placés à l'intérieur du lien pour créer un lien 
        * cliquable autour d'eux. Lorsque l'utilisateur clique sur l'image, il sera redirigé 
        * vers l'URL spécifié dans l'attribut href de l'élément a.
        */ 
        link.appendChild(photographerPicture); 
		link.appendChild(photographerName);
        /* la fonction crée un élément div pour regrouper les informations de la ville, la phrase d'accroche et le tarif du photographe. 
        * Les contenus textuels de ces éléments sont définis à partir des variables qui ont été créées en début de fonction.
        */
        const divInfo = document.createElement( 'div' );
        const home = document.createElement( 'p' );
        home.setAttribute('id', 'city');
        home.textContent = cityName
        const sentence = document.createElement( 'p' );
        sentence.setAttribute('id', 'tag');
        sentence.textContent = tagline
        const dayRate = document.createElement( 'p' );
        dayRate.setAttribute('id', 'rate');
        dayRate.textContent = rate
        divInfo.appendChild(home)
        divInfo.appendChild(sentence)
        divInfo.appendChild(dayRate)
        //Tous les éléments créés sont ajoutés à l'élément article créé.
        article.appendChild(link)
        article.appendChild(divInfo)
        return (article);
    }
    /* L'objet retourné permet donc d'accéder aux propriétés name et picture du photographe ainsi qu'à sa 
    * méthode getUserCardDOM(), qui peut être utilisée pour obtenir l'élément HTML de la carte utilisateur 
    * pour ce photographe.
    */
    return { name, picture, getUserCardDOM }
}