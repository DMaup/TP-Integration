var $home = $("#home");
var $home_button = $(".home_button");
var $profil = $("#profil");
var $profil_button = $(".profil_button");
var $actu = $("#actu");
var $actu_button = $(".actu_button");
var $message = $("#message");
var $message_button = $(".message_button");
var $plus_button = $("#plus_button");
var $form = $("#note_create");
var full_profil = [];


$profil.hide();
$home.hide();
$actu.hide();
$message.hide();

$home_button.click(function(){
    $profil.hide();
    $home.show();
    $actu.hide();
    $message.hide();
})

$profil_button.click(function(){
    $profil.show();
    $home.hide();
    $actu.hide();
    $message.hide();
})

$actu_button.click(function(){
    $profil.hide();
    $home.hide();
    $actu.show();
    $message.hide();
})

$message_button.click(function(){
    $profil.hide();
    $home.hide();
    $actu.hide();
    $message.show();
})


var send_form = document.getElementById("send_form");
var info_inputs = {
    name                    : document.getElementById("name"),
    error_name              : document.querySelector("#name + .error"),
    firstname               : document.getElementById("firstname"),
    error_firstname         : document.querySelector("#firstname + .error"),
    passwd                  : document.getElementById("password"),
    error_passwd            : document.querySelector("#password + .error"),
    passwd_confirm          : document.getElementById("password_confirm"),
    error_passwd_confirm    : document.querySelector("#password_confirm + .error"),
    code_postal             : document.getElementById("cp"),
    error_code_postal       : document.querySelector("#cp + .error"),
    tel                     : document.getElementById("tel"),
    error_tel               : document.querySelector("#tel + .error"), 
}

var errors = document.getElementsByClassName("error");
send_form.onclick = function() {

    for (var error of errors ) {
        error.innerText = "";
    }
    if( info_inputs.name.value.search(/\d/) != -1 ) { //expression rationnelle
        info_inputs.error_name.innerText += "Il n y a pas de chiffre dans le nom";
    }    
    if( info_inputs.name.value == "") { //expression rationnelle
        info_inputs.error_name.innerText += "Ce champ doit être renseigné";
    }
    if( info_inputs.firstname.value.search(/\d/) != -1 ) { //expression rationnelle
        info_inputs.error_firstname.innerText += "Il n y a pas de chiffre dans le prénom";
    }
    if( info_inputs.firstname.value == "") { //expression rationnelle
        info_inputs.error_firstname.innerText += "Ce champ doit être renseigné";
    }
    if( info_inputs.passwd.value.length < 8 ) {
        info_inputs.error_passwd.innerText = "Au moins huit caractères !";
    }
    if( info_inputs.passwd.value.search(/\d/) == -1 ) {
        info_inputs.error_passwd.innerText = "Au moins un chiffre !";
    }
    if( info_inputs.passwd_confirm.value != info_inputs.passwd.value ) {
        info_inputs.error_passwd_confirm.innerText = "Mot de passe différent !";
    }
    if( info_inputs.code_postal.value.length != 5 ) {
        info_inputs.error_code_postal.innerText = "Code postal erroné !";
    }
    if( info_inputs.tel.value.length == "" ){
        info_inputs.error_tel.innerText = "10 chiffres requis!";
    }
    if (info_inputs.tel.value.length != 10 ){
        info_inputs.error_tel.innerText = "10 chiffres requis!";
    }
    if( info_inputs.code_postal.value.length != 5 ) {
        info_inputs.error_code_postal.innerText = "Code postal erroné !";
    }
    if(
        !Number.isInteger ( parseFloat( info_inputs.code_postal.value ) ) 
        || parseFloat( info_inputs.code_postal.value ) < 0){
        info_inputs.error_code_postal.innerText = "Code postal erroné !";
    }

    var profil = {
        name                    : document.getElementById("name").value,
        firstname               : document.getElementById("firstname").value,
        birthday                : document.getElementById("birthday").value,
        address                 : document.getElementById("address").value,
        code_postal             : document.getElementById("cp").value,
        city                    : document.getElementById("city").value,
        tel                     : document.getElementById("tel").value,
        mail                    : document.getElementById("mail").value,
        passwd                  : document.getElementById("password").value
    };
    
    //Transformer la variable en chaine de caractère grace à JSON.stringify
    
    var string_profil = JSON.stringify(profil);
    
    localStorage.setItem("profil", string_profil);
    
    //Re-transformer la chaine en Objet utilisable grace a JSON.parse
    
    var retrieved_profil = localStorage.getItem("profil");  
    
    full_profil = JSON.parse( retrieved_profil );
    
    
    
    console.log(full_profil);
    
    //remplissage des champs textes de la homepage à partir du local storage
    
    
    var author = document.getElementById("author").textContent;
    document.getElementById("author").textContent = full_profil.firstname + " " + full_profil.name;   
}


$form.hide();


$plus_button.click(function(){
    $form.show(500);

});

$form.submit(function(event){
    event.preventDefault();
    var $note_title=$("input#note-title");
    var $note_article=$("textarea#note-article");
    var $cart=$("div#cart");
    var note_title=$note_title.val();
    var note_article=$note_article.val();
    var date=new Date().toLocaleString("fr");
   

        if ($note_title.val()=="" && $note_article.val()==""){
            return;
        }
        else {

            var note="<div class='note-container'>";
                    note +="<h3>" + "Auteur :" + full_profil.firstname + " " + full_profil.name + "</h3>";
                    note +="<h3>" + note_title + "</h3>";
                    note +="<h5>" + note_article + "</h5>";
                    note +="<br>";
                    note +="<b>" + date + "</b>";
                    note +="<button class='supp-button'></button>";            
                    note += "</div>";
                
                var $note=$(note);
                $cart.append($note);
                

                $note_title.val("");
                $note_article.val("");
                $form.hide();
        };

    $('.supp-button').on("click", function(){
        $(this).parent( ".note-container" ).remove();
    });
    console.log(author);
    
});
        
