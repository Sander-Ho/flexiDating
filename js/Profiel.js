"use strict";

const rooturl = "https://scrumserver.tenobe.org/scrum/api"
const errorBericht = document.getElementById("errorBericht");
const profielDiv = document.getElementById("profiel");

let gebruikerId = 16;   /* id van de gebruiker */
let profielId = 24;     /* id van het te bezoeken profiel */


fetch(rooturl + '/profiel/read_one.php?id=' + profielId)
    .then(function (response) { 
        if (response.status == 200)
            response.json().then(ToonProfiel); 
        else {
            profielDiv.style.display = "";
            errorBericht.style.display = "block";

            errorBericht.innerText = response.statusText;
        }
    })
    .catch(function (error) {
        profielDiv.style.display = "";
        errorBericht.style.display = "block";
        errorBericht.innerText = error.name;

        console.log(error);
    });


function ToonProfiel(data) {
    errorBericht.style.display = "";
    profielDiv.style.display = "block";

    document.getElementById("nickname").innerText = data.nickname;
    document.getElementById("profielfoto").setAttribute("src", "https://scrumserver.tenobe.org/scrum/img/" + data.foto);
    document.getElementById ("profielfoto").setAttribute("alt", data.nickname);
    document.getElementById("beroep").innerText = data.beroep;
    document.getElementById("sexe").innerText = (data.sexe == "m" ? "Man" : "Vrouw");
    document.getElementById("oogkleur").innerText = data.oogkleur;
    document.getElementById("haarkleur").innerText = data.haarkleur;
    document.getElementById("gewicht").innerText = data.gewicht;
    document.getElementById("grootte").innerText = data.grootte;
    
    if (gebruikerId === profielId /* || ontgrendeld? */) {
        document.getElementById("naam").innerText = data.voornaam + " " + data.familienaam;
        document.getElementById("geboortedatum").innerText = data.geboortedatum;
        document.getElementById("email").innerText = data.email;
    }
}