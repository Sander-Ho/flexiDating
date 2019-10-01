"use strict";
const responseDiv = document.getElementById("response");
const url = "https://scrumserver.tenobe.org/scrum/api/profiel";
const fotos = ["no_image", "man_1", "man_2", "man_3", "man_4", "man_5", "man_6", "man_7", "man_8", "man_9", "man_10", "man_11", "man_default", "adl", "bram", "danira", "ilse_debruyne", "jv", "kurt_decaluwe", "paul_ampersand", "vanessa_vaneenoo", "zorro",
"woman_1", "woman_2", "woman_3", "woman_4", "woman_5", "woman_6", "woman_7", "woman_8", "woman_9", "woman_10", "woman_11", "woman_12", "woman_13", "woman_default"];
const fotoSelect = document.getElementById("foto");
for (const foto in fotos) {
    const opt = document.createElement('option');
    opt.value = fotos[foto];
    opt.innerHTML = fotos[foto];
    fotoSelect.appendChild(opt);
}

const emailregex = new RegExp('^.+@.+\..+$');

let allesok = true;
document.getElementById("registreren").onclick = function() {    
    allesok = true;
    const familienaam = controleerIngevuld("familienaam", 1000);
    const voornaam = controleerIngevuld("voornaam", 1000);
    const nickname = controleerIngevuld("nickname", 100);
    const beroep = controleerIngevuld("beroep", 1000);
    const oogkleur = controleerIngevuld("oogkleur", 50);
    const haarkleur = controleerIngevuld("haarkleur", 50);
    const gewicht = controleerIngevuldNr("gewicht");
    const grootte = controleerIngevuldNr("grootte");
    controleerIngevuld("wachtwoord1", 1000);
    const email = document.getElementById("email").value;
    if (!emailregex.test(email) || email.length > 1000) {
        allesok = false;
        document.getElementById("emailFout").style.display = "block";
    } else {
        document.getElementById("emailFout").style.display = "none";
    }
    const wachtwoord1 = document.getElementById("wachtwoord1").value;
    const wachtwoord2 = document.getElementById("wachtwoord2").value;
    if (wachtwoord1 !== wachtwoord2) {
        allesok = false;
        document.getElementById("verschillendWachtwoordFout").style.display = "block";
    } else {
        document.getElementById("verschillendWachtwoordFout").style.display = "none";
    }


    const foto = document.getElementById("foto").value;
    if (foto === "") {
        allesok = false;
        document.getElementById("fotoFout").style.display = "block";
    } else {
        document.getElementById("fotoFout").style.display = "none";
    }

    const geslacht = document.getElementById("sexe").value;
    if (geslacht === "") {
        allesok = false;
        document.getElementById("sexeFout").style.display = "block";
    } else {
    document.getElementById("sexeFout").style.display = "none";
    }
    const geboortedatumWaarde = String(document.getElementById("geboortedatum").value);
    if (geboortedatumWaarde === "" || BerekenLeeftijd(new Date(geboortedatumWaarde)) < 18)
    {
        allesok = false;
        if (geboortedatumWaarde === "") {

        document.getElementById("geboortedatumFout").style.display = "block";
        }
        else {
        document.getElementById("leeftijdFout").style.display = "block";
        }
    } else {
        document.getElementById("geboortedatumFout").style.display = "none";

        document.getElementById("leeftijdFout").style.display = "none";
    }
    if (allesok) {
        const user =  {
        "familienaam" : familienaam,
        "voornaam" : voornaam,
        "geboortedatum" : geboortedatumWaarde,
        "email" : email,
        "nickname" : nickname,
        "foto" : foto,
        "beroep" : beroep,
        "sexe" : geslacht,
        "haarkleur" : haarkleur,
        "oogkleur" : oogkleur,
        "grootte" : grootte,
        "gewicht" : gewicht,
        "wachtwoord" : wachtwoord2,
        "lovecoins" : 3
        };
        fetch(url + "/create.php",
        {
            method: 'POST',
            body: JSON.stringify(user)
        }
        ).then(Verwerkresponse);

    }
};

function Verwerkresponse(response) {
    responseDiv.style.display = "block";
    if (response.status === 201){
       responseDiv.style.color = "black";
    } else {
       responseDiv.style.color = "red";
    }
    response.json().then(ToonMessage)
}
function ToonMessage(data) {
    if(data.hasOwnProperty('id'))
        responseDiv.innerText = data.message + "    dit is jouw ID: " + data.id;
    else
        responseDiv.innerText = data.message;
}
document.getElementById("foto").onchange = function () {
    const fotoString = document.getElementById("foto").value;
    if (fotoString !== "") {
        document.getElementById("fotoVoorbeeld").style.display = "block";
        document.getElementById("fotoVoorbeeld").src = "images/" + fotoString + ".png";
    } else {
        document.getElementById("fotoVoorbeeld").style.display = "none";
    }
};

function BerekenLeeftijd(dateString) {
    const vandaag = new Date();
    const geboortedatum = new Date(dateString);
    let leeftijd = vandaag.getFullYear() - geboortedatum.getFullYear();
    const m = vandaag.getMonth() - geboortedatum.getMonth();
    if (m < 0 || (m === 0 && vandaag.getDate() < geboortedatum.getDate())) {
        leeftijd -= 1;
    }
    return leeftijd;
}
function controleerIngevuldNr(element) {
    const waarde = document.getElementById(element).value;
    if (waarde === "" || waarde.length > 1000 || isNaN(waarde) || waarde < 0 ) {
        document.getElementById(element + "Fout").style.display = "block";
        allesok = false;
    } else {
        document.getElementById(element + "Fout").style.display = "none";
        return waarde;
    }
}
function controleerIngevuld(element, validatieLengte) {
    const waarde = document.getElementById(element).value;
    if (waarde === "" || waarde.length > validatieLengte) {
        document.getElementById(element + "Fout").style.display = "block";
        allesok = false;
    } else {
        document.getElementById(element + "Fout").style.display = "none";
        return waarde;
    }
}