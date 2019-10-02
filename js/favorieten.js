"use strict";
window.onload = function() {	
	fetch("https://scrumserver.tenobe.org/scrum/api/favoriet/read_one.php?profielid=" + localStorage.getItem("id"))
	.then(function (response) {
		if (response.status === 200){
			debugger;
			response.text().then(ToonFavorieten); 
		}
		else {
			favorieten.style.display = "none";
		}
	});

}
function ToonFavorieten(data) {
	if (data.length > 0) {
		errorBericht.style.display = "none";

		for (const favoriet of data) {
			const li = document.createElement("li");
			let element;
			fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + favoriet.anderId)
			.then(function (response) {
				if (response.status === 200){
					response.json().then(function(favorietPersoon){
						element = document.createElement("a");

						li.setAttribute("class", "profielKlein");
						element.innerText = favorietPersoon.nickname;
						element.setAttribute("href", "profiel.html?id=" + favorietPersoon.id);
						li.appendChild(element);

						element = document.createElement("img");
						element.setAttribute("src", "https://scrumserver.tenobe.org/scrum/img/" + favorietPersoon.foto);
						element.setAttribute("alt", favorietPersoon.nickname);
						li.appendChild(element);

						element = document.createElement("p");
						element.innerText = favorietPersoon.beroep;
						li.appendChild(element);

						element = document.createElement("p");
						element.innerText = (favorietPersoon.sexe == "m" ? "Man" : "Vrouw");
						li.appendChild(element);

						element = document.createElement("p");
						element.innerText = favorietPersoon.oogkleur;
						li.appendChild(element);

						element = document.createElement("p");
						element.innerText = favorietPersoon.haarkleur;
						li.appendChild(element);

						element = document.createElement("p");
						element.innerText = favorietPersoon.gewicht;
						li.appendChild(element);

						element = document.createElement("p");
						element.innerText = favorietPersoon.grootte;
						li.appendChild(element);
					}); 
				}   
			});
			element = document.createElement("p");
			element.innerText = favoriet.status;
			li.appendChild(element);

			element = document.createElement("button");
			element.innerText = "verwijderen van favorieten";
			element.onclick = function() {verwijderenFav(favoriet.id);};
			li.appendChild(element);


			document.getElementById("favorieten").appendChild(li);
		}
	}
	else {
		resultatenUl.style.display = "none";
		errorBericht.style.display = "block";

		errorBericht.innerText = "Geen favorieten gevonden";
	}
}

function verwijderenFav(favorietId){
	fetch("https://scrumserver.tenobe.org/scrum/api/favoriet/like.php", {
		'method': 'post',
		'body': JSON.stringify({
			'id': favorietId
		})
	})

	;
}