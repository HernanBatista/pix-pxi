var streamModal = document.getElementById('streamModal')
streamModal.addEventListener('show.bs.modal', function (event) {
	var button = event.relatedTarget
	var recipient = button.getAttribute('data-bs-whatever')
	var modalTitle = streamModal.querySelector('.modal-title')
	var modalBodyInput = streamModal.querySelector('.modal-body input')
	modalTitle.textContent = recipient
	var enterContent = streamModal.querySelector('#enter')
	var othersContent = streamModal.querySelector('#others')
	if (recipient == "ENTER"){
		enterContent.hidden = false
		othersContent.hidden = true
	}else{
		enterContent.hidden = true
		othersContent.hidden = false
	}
	
	var largura = window.screen.width;
	
	var mobile = document.querySelector('#mob')
	var pc = document.querySelector('#pce')
	if(largura < 750){
		mobile.hidden = false
		pc.hidden = true
	}else{
		mobile.hidden = true
		pc.hidden = false
	}
})