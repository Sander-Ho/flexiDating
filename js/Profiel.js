"use strict";

const rooturl = "https://scrumserver.tenobe.org/scrum/api"
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
        if (response.status == 200)
            response.json().then(ToonGegevensOpProfiel); 
        else {
            document.getElementsByTagName("title")[0].innerText = "Profiel bestaat niet - Flexi Dating";
            profielDiv.style.display = "";
            errorBericht.style.display = "block";

            errorBericht.innerText = "Profiel bestaat niet.";
        }
    })
    .catch(function (error) {
        profielDiv.style.display = "";
        errorBericht.style.display = "block";
        errorBericht.innerText = error.name;
    });
}


function ToonGegevensOpProfiel(data) {
    errorBericht.style.display = "";
    profielDiv.style.display = "block";

    document.getElementsByTagName("title")[0].innerText = data.nickname + " - Flexi Dating";
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