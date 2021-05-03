
document.getElementById("admin-add-btn").addEventListener('click',()=>{
    document.querySelector("#popup").style.display ="flex";
    document.querySelector("#add-admin-pop").style.display ="block";
    document.querySelector('#delete-admin-pop').style.display ="none";
    document.querySelector("#add-user-pop").style.display ="none";
    document.querySelector("#add-driver-pop").style.display ="none";
    document.querySelector("#update-admin-pop").style.display ="none";
});

document.getElementById("user-add-btn").addEventListener('click',()=>{
    document.querySelector("#popup").style.display ="flex";
    document.querySelector("#add-user-pop").style.display ="block";
    document.querySelector('#delete-admin-pop').style.display ="none";
    document.querySelector("#add-admin-pop").style.display ="none";
    document.querySelector("#add-driver-pop").style.display ="none";
    document.querySelector("#update-admin-pop").style.display ="none";
});

document.getElementById("driver-add-btn").addEventListener('click',()=>{
    document.querySelector("#popup").style.display ="flex";
    document.querySelector("#add-driver-pop").style.display ="block";
    document.querySelector('#delete-admin-pop').style.display ="none";
    document.querySelector("#add-user-pop").style.display ="none";
    document.querySelector("#add-admin-pop").style.display ="none";
    document.querySelector("#update-admin-pop").style.display ="none";
});

$(document).on('click','.up-admin',(event)=>{
    document.querySelector("#popup").style.display ="flex";
    document.querySelector("#update-admin-pop").style.display ="block";
    document.querySelector('#delete-admin-pop').style.display ="none";
    document.querySelector("#add-user-pop").style.display ="none";
    document.querySelector("#add-driver-pop").style.display ="none";
    document.querySelector("#add-admin-pop").style.display ="none";


    // fill fields
    let current_row  = $(`#${event.target.parentNode.parentNode.id}`);
    $('#adm-up-id').val(current_row[0].cells[0].textContent); //id
    $('#adm-up-name').val(current_row[0].cells[1].textContent); //name 
    $('#adm-up-email').val(current_row[0].cells[2].textContent); //email
    $('#adm-up-password').val(current_row[0].cells[3].textContent); //password
});

// delete admin logic

$(document).on('click','.del-admin',(event)=>{
    document.querySelector("#popup").style.display ="flex";
    document.querySelector('#delete-admin-pop').style.display ="block";
    document.querySelector("#update-admin-pop").style.display ="none";
    document.querySelector("#add-user-pop").style.display ="none";
    document.querySelector("#add-driver-pop").style.display ="none";
    document.querySelector("#add-admin-pop").style.display ="none";
    let id  = event.target.id.substring(4); //id 
    document.querySelector('#delete-admin-pop').children[2].children[0].action = `/delAdmin/${id}?_method=DELETE`;
});





$(document).on('click','.closing',(event)=>{
    document.getElementById("popup").style.display ="none";
});

$(document).on('click','.cancel-del-b',(event)=>{
    document.getElementById("popup").style.display ="none";
});