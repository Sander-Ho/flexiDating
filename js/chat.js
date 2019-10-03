"use strict";

const rooturl = "https://scrumserver.tenobe.org/scrum/api";
const errorBericht = document.getElementById("errorBericht");
const contactenDiv = document.getElementById("contacten");
const gesprekkenDiv = document.getElementById("gesprekken");

const gebruikerId = localStorage.getItem("id");


LaadtBerichten(gebruikerId);



function LaadtBerichten(gebruikerId) {
    fetch(rooturl + "/bericht/read.php?profielId=" + gebruikerId)
    .then(function (response) { 
        return response.json().then(ToonBerichten); 
    })
    .catch(function (error) {
        contactenDiv.style.display = "none";
        gesprekkenDiv.style.display = "none";
        errorBericht.style.display = "block";

        errorBericht.innerText = error.name;
    });
}


function ToonBerichten(data) {
    if (data.length > 0) {
        for (const gesprek of data) {
            const contactId = (gesprek[0].vanId === gebruikerId ? gesprek[0].naarId : gesprek[0].vanId);
            fetch(rooturl + '/profiel/read_one.php?id=' + contactId)
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

                    //  gesprek openen of sluiten
                    contactDiv.onclick = function () {
                        const berichten = document.getElementById(this.innerText + "_berichten");
                        
                        if (berichten.style.display === "none") {
                            const gesprekken = document.querySelectorAll("#gesprekken > div");
                            for (const gesprek of gesprekken)
                                gesprek.style.display = "none";

                            berichten.style.display = "block";
                        }
                        else
                            berichten.style.display = "none";

                        const berichtenUl = berichten.getElementsByTagName("ul")[0];
                        berichtenUl.scrollTop = berichtenUl.scrollHeight - berichtenUl.clientHeight;
                    };

                    contactLi.appendChild(contactDiv);
                    
                    const gesprekDiv = document.createElement("div");
                    gesprekDiv.setAttribute("id", contactNaam + "_berichten");
                    gesprekDiv.setAttribute("class", "clearFix");

                    const gesprekUl = document.createElement("ul");
                    
                    for (const bericht of gesprek) {
                        const berichtLi = document.createElement("li");
                        berichtLi.innerText = bericht.bericht;

                        if (bericht.benIkZender === "1")
                            berichtLi.setAttribute("class", "mijnBericht");
                        else
                            berichtLi.setAttribute("class", "contactBericht");
                        
                        gesprekUl.appendChild(berichtLi);
                    }
                    const berichtInputDiv = document.createElement("div");
                    berichtInputDiv.setAttribute("class", "berichtInputDiv");

                    const berichtInput = document.createElement("textarea");
                    berichtInput.setAttribute("class", "berichtInput");
                    berichtInput.setAttribute("placeholder", "schrijf een bericht ...");
                    berichtInputDiv.appendChild(berichtInput);
                    
                    const berichtKnop = document.createElement("button");
                    berichtKnop.setAttribute("class", "berichtKnop");
                    berichtKnop.innerText = "verstuur";
                    
                    //  bericht versturen
                    berichtKnop.onclick = function () {
                        const url = rooturl + "/bericht/post.php";
                        let data = {
                            vanId:gebruikerId,
                            naarId:contactId,
                            bericht:berichtInput.value,
                            status:"verzonden"
                        };

                        let request = new Request(url, {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            })
                        });

                        fetch(request)
                        .then( function (resp) { 
                            if (resp.status === 201) {
                                resp.json().then( function (data) { console.log(data); }); 
                                
                                while (contactenDiv.firstChild) {
                                    contactenDiv.removeChild(contactenDiv.firstChild);
                                }

                                while (gesprekkenDiv.firstChild) {
                                    gesprekkenDiv.removeChild(gesprekkenDiv.firstChild);
                                }

                                LaadtBerichten(gebruikerId);
                            }
                            else {
                                contactenDiv.style.display = "none";
                                gesprekkenDiv.style.display = "none";
                                errorBericht.style.display = "block";

                                errorBericht.innerText = resp.status + " - " + resp.statusText;
                            }
                        })
                        .catch(function (error) { 
                            contactenDiv.style.display = "none";
                            gesprekkenDiv.style.display = "none";
                            errorBericht.style.display = "block";

                            errorBericht.innerText = error;
                         });
                    };

                    berichtInputDiv.appendChild(berichtKnop);
                    gesprekUl.appendChild(berichtInputDiv);

                    gesprekDiv.style.display = "none";
                    gesprekDiv.appendChild(gesprekUl);
                    gesprekkenDiv.appendChild(gesprekDiv);
                    contactenDiv.appendChild(contactLi);
                });
            });            
        }
    }
    else {
        contactenDiv.style.display = "none";
        gesprekkenDiv.style.display = "none";
        errorBericht.style.display = "block";

        errorBericht.innerText = "Geen berichten gevonden";
    }
}