const mainArea=document.querySelector('.mainArea');

mainArea.addEventListener('click', function (e) {
    if (e.target.classList.contains('blockItems') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        console.log(e);
    }
});