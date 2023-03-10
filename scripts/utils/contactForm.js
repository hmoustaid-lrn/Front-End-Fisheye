const bodyElement = document.querySelector("body")
const mainElement = document.getElementById('main')
const contactModal = document.getElementById("contact_modal")

function displayModal() {
	mainElement.setAttribute('aria-hidden', 'true');
	contactModal.setAttribute('aria-hidden', 'false');
	contactModal.style.display = "block";
	bodyElement.classList.add('no-scroll');
	const closeButton = document.getElementById("close-button");
	closeButton.focus();
	closeButton.addEventListener("keydown", function(e) {
		if (e.key === "Escape") {
		  closeModal();
		}
	});
	document.getElementById("submit-button").addEventListener("keydown", function(e) {
		if (e.key === "Tab") {
		  e.preventDefault();
		  closeButton.focus();
		}
	});
}

function closeModal() {
	mainElement.setAttribute('aria-hidden', 'false');
	contactModal.setAttribute('aria-hidden', 'true');
	bodyElement.classList.remove('no-scroll');
    contactModal.style.display = "none";
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