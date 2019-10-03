"use strict";
const responseDiv = document.getElementById("response");
const url = "https://scrumserver.tenobe.org/scrum/api/";
const urlImg = "https://scrumserver.tenobe.org/scrum/img/";
const fotos = ["no_image.png", "man_1.png", "man_2.png", "man_3.png", "man_4.png", "man_5.png", "man_6.png", "man_7.png", "man_8.png", "man_9.png", "man_10.png", "man_11.png", "man_default.png", "adl.png", "bram.png", "danira.png", "ilse_debruyne.png", "jv.png", "kurt_decaluwe.png", "paul_ampersand.png", "vanessa_vaneenoo.png", "zorro.png",
"woman_1.png", "woman_2.png", "woman_3.png", "woman_4.png", "woman_5.png", "woman_6.png", "woman_7.png", "woman_8.png", "woman_9.png", "woman_10.png", "woman_11.png", "woman_12.png", "woman_13.png", "woman_default.png"];
const fotoSelect = document.getElementById("foto");
for (const foto in fotos) {
    const opt = document.createElement('option');
    opt.value = fotos[foto];
    opt.innerText = fotos[foto].slice(0, -4);
    fotoSelect.appendChild(opt);
}

const emailregex = new RegExp('^.+@.+\..+$');

let allesok = true;
document.getElementById("registreren").onclick = function() {    
    allesok = true;
    const familienaam = ControleerIngevuld("familienaam", 1000);
    const voornaam = ControleerIngevuld("voornaam", 1000);
    const nickname = ControleerIngevuld("nickname", 100);
    const beroep = ControleerIngevuld("beroep", 1000);
    const oogkleur = ControleerIngevuld("oogkleur", 50);
    const haarkleur = ControleerIngevuld("haarkleur", 50);
    const gewicht = ControleerIngevuldNr("gewicht", 400, 40);
    const grootte = ControleerIngevuldNr("grootte", 250, 100);
    ControleerIngevuld("wachtwoord1", 1000);
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
        fetch(url + "profiel/create.php",
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
    {
        responseDiv.innerText = data.message + "    dit is jouw ID: " + data.id;
        localStorage.setItem("id", data.id);
        window.location.href = "index.html";
    }
    else
        responseDiv.innerText = data.message;
}
document.getElementById("foto").onchange = function () {
    const fotoString = document.getElementById("foto").value;
    if (fotoString !== "") {
        document.getElementById("fotoVoorbeeld").style.display = "block";
        document.getElementById("fotoVoorbeeld").src = urlImg + fotoString;
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
function ControleerIngevuldNr(element, max, min) {
    const waarde = document.getElementById(element).value;
    if (waarde === "" || waarde > max || isNaN(waarde) || waarde < min ) {
        document.getElementById(element + "Fout").style.display = "block";
        allesok = false;
    } else {
        document.getElementById(element + "Fout").style.display = "none";
        return waarde;
    }
}
function ControleerIngevuld(element, validatieLengte) {
    const waarde = document.getElementById(element).value;
    if (waarde === "" || waarde.length > validatieLengte) {
        document.getElementById(element + "Fout").style.display = "block";
        allesok = false;
    } else {
        document.getElementById(element + "Fout").style.display = "none";
        return waarde;
    }
}