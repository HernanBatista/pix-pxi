var streamModal = document.getElementById('streamModal')
streamModal.addEventListener('show.bs.modal', function (event) {
	var button = event.relatedTarget
	var recipient = button.getAttribute('data-bs-whatever')
	var modalTitle = streamModal.querySelector('.modal-title')
	var modalBodyInput = streamModal.querySelector('.modal-body input')
	modalTitle.textContent = recipient

	//Roadmap button
	var roadmapContent = streamModal.querySelector('#roadmap')

	//Others button
	var othersContent = streamModal.querySelector('#others')


	if(recipient == "ROADMAP"){
		othersContent.hidden = true
		roadmapContent.hidden = false
	}else{
		roadmapContent.hidden = true
		othersContent.hidden = false
	}
	
})
