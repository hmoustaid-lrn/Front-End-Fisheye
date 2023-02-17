function photographerFactory(data) {
    // Déstruction de l'objet data pour récupérer les infos du photographe
    const { name, id, city, country, tagline, price, portrait} = data;
    // La propriété portrait est utilisée pour construire un chemin vers la photo du photographe 
    const picture = `assets/photographers/${portrait}`;
    // Les propriétés city et country sont combinées pour former le nom de la ville
    const cityName = `${city}, ${country}`
    const tag = tagline
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
        // Élément img avec la source de l'image définie à partir de la variable picture qui contient le chemin de la photo du photographe.
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        // Élément h2 pour le nom du photographe
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        /* Élément city pour le nom de la ville où se trouve le photographe, un élément sentence pour la phrase 
        * d'accroche du photographe, et un élément hourRate pour le tarif du photographe. Les contenus textuels 
        * de ces éléments sont définis à partir des variables qui ont été créées en début de fonction.
        */
        const home = document.createElement( 'city' );
        home.textContent = cityName
        const sentence = document.createElement( 'sentence' );
        sentence.textContent = tag
        const hourRate = document.createElement( 'hourRate' );
        hourRate.textContent = rate
        //Tous les éléments créés sont ajoutés à l'élément article créé
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(home)
        article.appendChild(sentence)
        article.appendChild(hourRate)
        return (article);
    }
    /* L'objet retourné permet donc d'accéder aux propriétés name et picture du photographe ainsi qu'à sa 
    * méthode getUserCardDOM(), qui peut être utilisée pour obtenir l'élément HTML de la carte utilisateur 
    * pour ce photographe.
    */
    return { name, picture, getUserCardDOM }
}