function mob(id){
    const colx = document.querySelectorAll('.colx')
    var nave = document.querySelector('.prenave');

	nave.style.top = '-20%';

    setTimeout(() => { colx[id].click() }, 1000);

    setTimeout(() => { 
        nave.style.display = 'none';
        nave.style.top = '100%';
    }, 1500);

    setTimeout(() => { 
        nave.style.display = 'block';
        nave.style.top = '80%';
    }, 1600);
};