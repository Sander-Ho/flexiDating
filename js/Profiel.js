"use strict";

const rooturl = "https://scrumserver.tenobe.org/scrum/api";
const errorBericht = document.getElementById("errorBericht");
const profielDiv = document.getElementById("profiel");

let gebruikerId;   /* id van de gebruiker */
let profielId;


document.getElementById("bekijkProfiel").onclick = function () {
    profielId = document.getElementById("profielIdInput").value;

    if (document.getElementById("eigenProfiel").checked) {
        gebruikerId = profielId;
    }

    ToonVolledigProfiel(profielId);
}



function ToonVolledigProfiel(profielId) {
    fetch(rooturl + '/profiel/read_one.php?id=' + profielId)
    .then(function (response) { 
        if (response.status === 200){
            profielDiv.style.display = "block";
            response.json().then(ToonGegevensOpProfiel); 
        }   
        else {
            document.getElementsByTagName("title")[0].innerText = "Profiel bestaat niet - Flexi Dating";

            profielDiv.style.display = "none";
            errorBericht.style.display = "block";

            errorBericht.innerText = "Profiel bestaat niet.";
        }
    })
    .catch(function (error) {
        profielDiv.style.display = "none";
        errorBericht.style.display = "block";

        errorBericht.innerText = error.name;
    });
}


function ToonGegevensOpProfiel(data) {
    errorBericht.style.display = "none";

    document.getElementsByTagName("title")[0].innerText = data.nickname + " - Flexi Dating";
    document.getElementById("nickname").innerText = "Gebruikersnaam: " + data.nickname;
    document.getElementById("profielfoto").src = "https://scrumserver.tenobe.org/scrum/img/" + data.foto;
    document.getElementById ("profielfoto").setAttribute("alt", data.nickname);
    document.getElementById("beroep").innerText = "Beroep: " + data.beroep;
    document.getElementById("sexe").innerText = "Geslacht: " + (data.sexe == "m" ? "Man" : "Vrouw");
    document.getElementById("oogkleur").innerText = "Oogkleur: " + data.oogkleur;
    document.getElementById("haarkleur").innerText = "Haarkleur: " + data.haarkleur;
    document.getElementById("gewicht").innerText = "Gewicht: " + data.gewicht;
    document.getElementById("grootte").innerText = "Grootte: " + data.grootte;
    
    if (gebruikerId === profielId /* || ontgrendeld? */) {
        let element = document.getElementById("naam");
        element.innerText = "Naam: " + data.voornaam + " " + data.familienaam;
        element.removeAttribute("hidden");
        element = document.getElementById("geboortedatum");
        element.innerText = "Geboortedatum: " + data.geboortedatum;
        element.removeAttribute("hidden");
        element = document.getElementById("email");
        element.innerText = "E-Mail: " + data.email;
        element.removeAttribute("hidden");
    }
    else {
        document.getElementById("naam").setAttribute("hidden", "");
        document.getElementById("geboortedatum").setAttribute("hidden", "");
        document.getElementById("email").setAttribute("hidden", "");
    }
}