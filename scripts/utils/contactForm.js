function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function sendMessage(event) {
	event.preventDefault()
	for (const element of event.target.elements) {
		if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
			console.log(element.value)
            //Vider les champs du modal avant de le fermer afin d'éviter que les champs du modal ne contiennent les anciennes informations saisies
			element.value = ''
		}
	}
	closeModal()
}