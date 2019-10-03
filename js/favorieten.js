"use strict";
window.onload = function() {	
	fetch("https://scrumserver.tenobe.org/scrum/api/favoriet/read.php?profielId=" + localStorage.getItem("id"))
	.then(function (response) {
		if (response.status === 200){
			response.json().then(ToonFavorieten); 
		}
		else {
			favorieten.style.display = "none";
		errorBericht.innerText = "Geen favorieten gevonden";
		}
	});

};
function ToonFavorieten(data) {
	if (data.length > 0) {
		errorBericht.style.display = "none";

		for (const favoriet of data) {
			const li = document.createElement("li");
			li.id = "favoriet" + favoriet.id;
			document.getElementById("favorieten").appendChild(li);
			let element;
			fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + favoriet.anderId)
			.then(function (response) {
				if (response.status === 200){
					response.json().then(function(favorietPersoon){
						element = document.createElement("a");

						li.setAttribute("class", "profielKlein");
						element.innerText = "naam: " + favorietPersoon.nickname;
						element.setAttribute("href", "profiel.html?id=" + favorietPersoon.id);
						li.appendChild(element);

						element = document.createElement("img");
						element.setAttribute("src", "https://scrumserver.tenobe.org/scrum/img/" + favorietPersoon.foto);
						element.setAttribute("alt", favorietPersoon.nickname);
						li.appendChild(element);

						element = document.createElement("p");
						element.innerText = "beroep: " + favorietPersoon.beroep;
						li.appendChild(element);

						element = document.createElement("p");
						element.innerText = "geslacht: " + (favorietPersoon.sexe == "m" ? "Man" : "Vrouw");
						li.appendChild(element);

						element = document.createElement("p");
						element.innerText = "oogkleur: " + favorietPersoon.oogkleur;
						li.appendChild(element);

						element = document.createElement("p");
						element.innerText = "haarkleur: " + favorietPersoon.haarkleur;
						li.appendChild(element);

						element = document.createElement("p");
						element.innerText = "gewicht: " + favorietPersoon.gewicht;
						li.appendChild(element);

						element = document.createElement("p");
						element.innerText = "grootte: " + favorietPersoon.grootte;
						li.appendChild(element);


						element = document.createElement("p");
						element.innerText = "status: " + favoriet.status;
						li.appendChild(element);
						
						element = document.createElement("button");
						element.innerText = "verwijderen van favorieten";
						element.onclick = function() {verwijderenFav(favoriet.id);};
						li.appendChild(element);

					}); 
				}   
			});
		}
	}
	else {
		document.getElementById("favorieten").style.display = "none";
		errorBericht.style.display = "block";

		errorBericht.innerText = "Geen favorieten gevonden";
	}
}

function verwijderenFav(favorietId){
	fetch("https://scrumserver.tenobe.org/scrum/api/favoriet/delete.php", {
		'method': 'DELETE',
		'body': JSON.stringify({
			'id': favorietId
		})
	}).then(function (response) {
		if (response.status === 200) {
			document.getElementById("favorieten").removeChild(document.getElementById("favoriet" + favorietId));
		}
	});
}