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
<<<<<<< HEAD
<<<<<<< HEAD
        if (response.status == 200){
            profielDiv.style.display = "block";
            errorBericht.style.display = "none";
            response.json().then(ToonGegevensOpProfiel); 
        }   
        else {
            document.getElementsByTagName("title")[0].innerText = "Profiel bestaat niet - Flexi Dating";
            profielDiv.style.display = "none";
=======
        if (response.status == 200)
=======
        if (response.status == 200){
            profielDiv.style.display = "block";
            errorBericht.style.display = "none";
>>>>>>> registreren
            response.json().then(ToonGegevensOpProfiel); 
        }   
        else {
            document.getElementsByTagName("title")[0].innerText = "Profiel bestaat niet - Flexi Dating";
<<<<<<< HEAD
            profielDiv.style.display = "";
>>>>>>> abaa6e26667986bb641b6689976f4da787a8f729
=======
            profielDiv.style.display = "none";
>>>>>>> registreren
            errorBericht.style.display = "block";

            errorBericht.innerText = "Profiel bestaat niet.";
        }
    })
    .catch(function (error) {
<<<<<<< HEAD
<<<<<<< HEAD
        profielDiv.style.display = "none";
=======
        profielDiv.style.display = "";
>>>>>>> abaa6e26667986bb641b6689976f4da787a8f729
=======
        profielDiv.style.display = "none";
>>>>>>> registreren
        errorBericht.style.display = "block";
        errorBericht.innerText = error.name;
    });
}


function ToonGegevensOpProfiel(data) {
<<<<<<< HEAD
<<<<<<< HEAD
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
        document.getElementById("naam").innerText = "Naam: " + data.voornaam + " " + data.familienaam;
        document.getElementById("geboortedatum").innerText = "Geboortedatum: " + data.geboortedatum;
        document.getElementById("email").innerText = "E-Mail: " + data.email;
=======
    errorBericht.style.display = "";
    profielDiv.style.display = "block";

=======
>>>>>>> registreren
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
<<<<<<< HEAD
        document.getElementById("naam").innerText = data.voornaam + " " + data.familienaam;
        document.getElementById("geboortedatum").innerText = data.geboortedatum;
        document.getElementById("email").innerText = data.email;
>>>>>>> abaa6e26667986bb641b6689976f4da787a8f729
=======
        document.getElementById("naam").innerText = "Naam: " + data.voornaam + " " + data.familienaam;
        document.getElementById("geboortedatum").innerText = "Geboortedatum: " + data.geboortedatum;
        document.getElementById("email").innerText = "E-Mail: " + data.email;
>>>>>>> registreren
    }
}