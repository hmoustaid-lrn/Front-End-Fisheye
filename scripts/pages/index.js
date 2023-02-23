
async function getPhotographers() {
		//Récuperer les infos du photographe. On récupère un objet représentant la réponse HTTP.
		const response = await fetch('./data/photographers.json')
		//Extraire les données JSNON de la réponse
		const data = await response.json()
        //Créer un tableau ou on va récuperer les photographes
        const photographers = [];
        //Parcourrir les données JSON qu'on a obtenues et insérer chaque photographe dans le tableau
        data.photographers.forEach(photograph => {
            // Création d'un objet photographe avec les propriétés pertinentes
            const photographObj = {
              name: photograph.name,
              id: photograph.id,
              city: photograph.city,
              country: photograph.country,
              tagline: photograph.tagline,
              price: photograph.price,
              portrait: photograph.portrait
            };
            // Ajout de l'objet photographe au tableau
            photographers.push(photographObj);
       })
		return photographers
}


async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const photographers  = await getPhotographers();
    displayData(photographers);
};

init();

