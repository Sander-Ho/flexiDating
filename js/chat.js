"use strict";

const rooturl = "https://scrumserver.tenobe.org/scrum/api";
const errorBericht = document.getElementById("errorBericht");
const contactenUl = document.getElementById("contacten");

let gebruikerId = 1;


LaadtBerichten(gebruikerId);



function LaadtBerichten(gebruikerId) {
    fetch(rooturl + "/bericht/read.php?profielId=" + gebruikerId)
    .then(function (response) { 
        return response.json().then(ToonBerichten); 
    })
    .catch(function (error) {
        contactenUl.style.display = "none";
        errorBericht.style.display = "block";

        errorBericht.innerText = error.name;
    });
}


function ToonBerichten(data) {
    if (data.length > 0) {
        for (const gesprek of data) {
            
            fetch(rooturl + '/profiel/read_one.php?id=' + (gesprek[0].vanId !== gebruikerId ? gesprek[0].naarId : gesprek[0].vanId))
            .then(function (resp) {
                resp.json().then(function (profiel) {
                    const contactNaam = profiel.nickname;
                    const contactLi = document.createElement("li");
                    const contactDiv = document.createElement("div");

                    const contactText = document.createElement("p");
                    contactText.innerText = contactNaam;

                    const contactImg = document.createElement("img");
                    contactImg.setAttribute("src", "https://scrumserver.tenobe.org/scrum/img/" + profiel.foto);
                    contactImg.setAttribute("alt", contactNaam);

                    contactDiv.appendChild(contactImg);
                    contactDiv.appendChild(contactText);

                    contactDiv.onclick = function () {
                        const berichten = document.getElementById(this.innerText + "_berichten");
                        
                        if (berichten.style.display === "none")
                        berichten.style.display = "block";
                        else
                        berichten.style.display = "none";
                    };
                    contactLi.appendChild(contactDiv);
                    
                    const gesprekUl = document.createElement("ul");
                    gesprekUl.setAttribute("id", contactNaam + "_berichten");
                    gesprekUl.setAttribute("class", "gesprek");
                    
                    for (const bericht of gesprek) {
                        const berichtLi = document.createElement("li");
                        berichtLi.innerText = bericht.bericht;

                        if (bericht.benIkZender === "1")
                            berichtLi.setAttribute("class", "mijnBericht");
                        else
                            berichtLi.setAttribute("class", "contactBericht");
                        
                        gesprekUl.appendChild(berichtLi);
                    }
                    gesprekUl.style.display = "none";
                    contactLi.appendChild(gesprekUl);
                    contactenUl.appendChild(contactLi);
                });
            });            
        }
    }
    else {
        contactenUl.style.display = "none";
        errorBericht.style.display = "block";

        errorBericht.innerText = "Geen berichten gevonden";
    }
}