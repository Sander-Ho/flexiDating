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


function BerekenSterrenbeeld(datum) {
    const geboortedatum = new Date(datum);
    const geboortedag = geboortedatum.getDate() + 1;
    const geboortemaand = geboortedatum.getMonth() + 1;
//Steenbok 22 december tot 19 januari
if((geboortedag >= 22 && geboortemaand === 12) || (geboortedag <= 19 && geboortemaand === 1))
return "Steenbok";
// Waterman 20 januari tot 18 februari
if((geboortedag >= 20 && geboortemaand === 1) || (geboortedag <= 18 && geboortemaand === 2))
return "Waterman";
// Vissen 19 februari tot 20 maart
if((geboortedag >= 19 && geboortemaand === 2) || (geboortedag <= 20 && geboortemaand === 3))
return "Vissen";
// Ram 21 maart tot 19 april
if((geboortedag >= 21 && geboortemaand === 3) || (geboortedag <= 19 && geboortemaand === 4))
return "Ram";
// Stier 20 april tot 20 mei
if((geboortedag >= 20 && geboortemaand === 4) || (geboortedag <= 20 && geboortemaand === 5))
return "Stier";
// Tweelingen 21 mei tot 20 juni
if((geboortedag >= 21 && geboortemaand === 5) || (geboortedag <= 20 && geboortemaand === 6))
return "Tweelingen";
// Kreeft 21 juni tot 22 juli
if((geboortedag >= 21 && geboortemaand === 6) || (geboortedag <= 22 && geboortemaand === 7))
return "Kreeft";
// Leeuw 23 juli tot 22 augustus
if((geboortedag >= 20 && geboortemaand === 7) || (geboortedag <= 18 && geboortemaand === 8))
return "Leeuw";
// Maagd 23 augustus tot 22 september
if((geboortedag >= 23 && geboortemaand === 8) || (geboortedag <= 22 && geboortemaand ===9))
return "Maagd";
// Weegschaal 23 september tot 22 oktober
if((geboortedag >= 23 && geboortemaand === 9) || (geboortedag <= 22 && geboortemaand === 10))
return "Weegschaal";
// Schorpioen 23 oktober tot 21 november
if((geboortedag >= 23 && geboortemaand === 10) || (geboortedag <= 21 && geboortemaand === 11))
return "Schorpioen";
// Boogschutter 22 november tot 21 december
if((geboortedag >= 22 && geboortemaand === 11) || (geboortedag <= 21 && geboortemaand === 12))
return "Boogschutter";
}

function ToonGegevensOpProfiel(data) {
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

    const sterrenbeeld = BerekenSterrenbeeld(data.geboortedatum);
    document.getElementById("sterrenbeeld").innerText = "sterrenbeeld: " + sterrenbeeld;
    document.getElementById("sterrenbeeldfoto").src = "images/" + sterrenbeeld + ".png";
    
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