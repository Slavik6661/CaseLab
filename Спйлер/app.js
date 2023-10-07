btnSpolerState=false
btnSpoler=document.getElementById('myBtn')
spoiler=document.getElementById('spoiler')
btnSpoler.addEventListener('click',()=>{
btnSpolerState=!btnSpolerState
btnSpolerState?spoiler.style.display='block':spoiler.style.display='none'    
})
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        spoiler.style.display='none'
        btnSpolerState=false
    }
});
