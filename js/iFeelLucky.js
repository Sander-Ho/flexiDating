"use strict";
let arrayLeden = new Array()
const url = "https://scrumserver.tenobe.org/scrum/api/";
window.onload = function() {
	fetch(url + "profiel/read.php",
	{
		method: 'GET'	}
	).then(Verwerkresponse);
	document.getElementById("vraagAan").onclick = function() {
		ToonProfiel(arrayLeden[Math.round(Math.random() * (arrayLeden.length - 1))])
	}
}
function Verwerkresponse(response){
        response.json().then(kiesProfielUitData);
}
function kiesProfielUitData(data){
	arrayLeden = data;
	document.getElementById("vraagAan").disabled = false;
}


function ToonProfiel(profiel){
	document.getElementById("nickname").innerText = "Gebruikersnaam: " + profiel.nickname;
	document.getElementById("profielfoto").src = "https://scrumserver.tenobe.org/scrum/img/" + profiel.foto;
	document.getElementById ("profielfoto").setAttribute("alt", profiel.nickname);
	document.getElementById("beroep").innerText = "Beroep: " + profiel.beroep;
	document.getElementById("sexe").innerText = "Geslacht: " + (profiel.sexe == "m" ? "Man" : "Vrouw");
	document.getElementById("oogkleur").innerText = "Oogkleur: " + profiel.oogkleur;
	document.getElementById("haarkleur").innerText = "Haarkleur: " + profiel.haarkleur;
	document.getElementById("gewicht").innerText = "Gewicht: " + profiel.gewicht;
	document.getElementById("grootte").innerText = "Grootte: " + profiel.grootte;

	const sterrenbeeld = BerekenSterrenbeeld(profiel.geboortedatum);
    document.getElementById("sterrenbeeld").innerText = "sterrenbeeld: " + sterrenbeeld;
    document.getElementById("sterrenbeeldfoto").src = "images/" + sterrenbeeld + ".png";
    document.getElementById("toevoegenFavoriet").onclick = function() {toevoegenFav(profiel.id);};
    document.getElementById("toevoegenFavoriet").style.display = "block";
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
// Tweeling 21 mei tot 20 juni
if((geboortedag >= 21 && geboortemaand === 5) || (geboortedag <= 20 && geboortemaand === 6))
return "Tweeling";
// Kreeft 21 juni tot 22 juli
if((geboortedag >= 21 && geboortemaand === 6) || (geboortedag <= 22 && geboortemaand === 7))
return "Kreeft";
// Leeuw 23 juli tot 22 augustus
if((geboortedag >= 23 && geboortemaand === 7) || (geboortedag <= 22 && geboortemaand === 8))
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
function toevoegenFav(idpersoon){
        fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + idpersoon)
        .then(function (response) {
            if (response.status === 200){
                response.json().then(toevoegenFavoriet); 
            }   
        });
}
function toevoegenFavoriet(data){
    fetch("https://scrumserver.tenobe.org/scrum/api/favoriet/like.php", {
        "method": 'post',
        "body": JSON.stringify({
            "mijnId": localStorage.getItem("id"),
            "anderId": data.id
        })
    })
        
        ;
}
