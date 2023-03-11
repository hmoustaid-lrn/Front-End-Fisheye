const bodyElement = document.querySelector("body")
const mainElement = document.getElementById('main')
const contactModal = document.getElementById("contact_modal")

function displayModal() {
	displayDialog(contactModal, 'block')
	const closeButton = contactModal.querySelector(".close-button");
	closeButton.focus();
	registerCloseEvents(contactModal)
	document.getElementById("submit-button").addEventListener("keydown", function(e) {
		if (e.key === "Tab") {
		  e.preventDefault();
		  closeButton.focus();
		}
	});
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
	closeDialog(contactModal)
}