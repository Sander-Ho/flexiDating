"use strict";

const rooturl = "https://scrumserver.tenobe.org/scrum/api";
const errorBericht = document.getElementById("errorBericht");
const contactenDiv = document.getElementById("contacten");
const gesprekkenDiv = document.getElementById("gesprekken");

const gebruikerId = localStorage.getItem("id");
let nieuwContactId = -1;


                    //  controlleerd voor nieuw contact id in url
const qs = decodeURIComponent(window.location.search);
if (qs !== "")
    nieuwContactId = qs.split('=')[1];

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
    if ((data.length > 0) || (nieuwContactId !== -1)) {
        let nieuwContact = (nieuwContactId !== -1 ? true : false);

        for (const gesprek of data) {
            const contactId = (gesprek[0].vanId === gebruikerId ? gesprek[0].naarId : gesprek[0].vanId);
            
                        //  controlleerd of het nieuwe contact al een contact is
            if (contactId === nieuwContactId)
                nieuwContact = false;

                        //  Zoekt de naam van het contactpersoon
            fetch(rooturl + '/profiel/read_one.php?id=' + contactId)
            .then(function (resp) {
                resp.json().then(function (profiel) {
                        //  opstellen contact voor contactenlijst
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
                    contactDiv.onclick = function () { ToggleGesprek(contactDiv.innerText); };
                    contactLi.appendChild(contactDiv);
                    
                        //  opstellen gesprek
                    const gesprekDiv = document.createElement("div");
                    gesprekDiv.setAttribute("id", contactNaam + "_berichten");
                    gesprekDiv.setAttribute("class", "clearFix");

                    const gesprekUl = document.createElement("ul");

                    if (gesprek[0].berichtId !== "-1") {
                        for (const bericht of gesprek) {
                            LaadtBericht(bericht, gesprekUl);
                        }
                    }
                    
                        //  input veld en verzend knop
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
                        VerzendBericht(contactId, contactNaam, berichtInput.value); 
                        berichtInput.value = "";
                    }
                    berichtInputDiv.appendChild(berichtKnop);
                    gesprekUl.appendChild(berichtInputDiv);
                    
                    gesprekDiv.appendChild(gesprekUl);
                    gesprekDiv.style.display = "none";
                        //  opent gesprek met nieuw contact indien nodig
                    if (nieuwContactId !== -1 && contactId === nieuwContactId)
                        gesprekDiv.style.display = "block";
                    gesprekkenDiv.appendChild(gesprekDiv);
                    contactenDiv.appendChild(contactLi);
                });
            });   
            
                        //  indien nieuw contact, maakt dummy bericht voor dit contact aan
            if ((gesprek[0].berichtId === data[data.length - 1][0].berichtId) && nieuwContact)
                data.push([{ 
                    berichtId: "-1",
                    vanId: gebruikerId,
                    naarId: nieuwContactId,
                    bericht: "",
                    partnerId: nieuwContactId,
                    benIkZender: "1",
                    status: "nieuw"
                }]);
        }
    }
    else {
        contactenDiv.style.display = "none";
        gesprekkenDiv.style.display = "none";
        errorBericht.style.display = "block";

        errorBericht.innerText = "Geen berichten gevonden";
    }

    
    function ToggleGesprek(contactNaam) {
        const berichten = document.getElementById(contactNaam + "_berichten");
        
        if (berichten.style.display === "none") {
            const gesprekken = document.querySelectorAll("#gesprekken > div");
            for (const gesprek of gesprekken)
                gesprek.style.display = "none";
    
            berichten.style.display = "block";
        }
        else
            berichten.style.display = "none";
    
        const berichtenUl = berichten.getElementsByTagName("ul")[0];
                        //  bij start gesprek verplaatsen naar meest recente bericht
        berichtenUl.scrollTop = berichtenUl.scrollHeight - berichtenUl.clientHeight;
    }


    function LaadtBericht(bericht, gesprekUl) {
        const berichtLi = document.createElement("li");
        berichtLi.innerText = bericht.bericht;

        if (bericht.vanId === gebruikerId)
            berichtLi.setAttribute("class", "mijnBericht");
        else
            berichtLi.setAttribute("class", "contactBericht");
                        
        gesprekUl.appendChild(berichtLi);
    }
    
    
    function VerzendBericht(contactId, contactNaam, bericht) {
        const url = rooturl + "/bericht/post.php";
        let data = {
            vanId:gebruikerId,
            naarId:contactId,
            bericht:bericht,
            status:"verzonden"
        };
    
        let request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
                        //  bericht verzenden
        fetch(request)
        .then( function (response) { 
            if (response.status === 201) {
                response.json().then( function (data) { 

                        //  opvragen bericht object om te tonen in het gesprek
                    fetch(rooturl + "/bericht/read_one.php?berichtId=" + data.id)
                    .then(function (resp)   { 
                        resp.json().then( function (data2) {
                            const berichtenUl = document.getElementById(contactNaam + "_berichten").querySelector("ul");
                            LaadtBericht(data2, berichtenUl);
                        //  gesprek verplaatsen naar meest recente bericht
                            berichtenUl.scrollTop = berichtenUl.scrollHeight - berichtenUl.clientHeight;
                        })
                    })
                    .catch(function (error) { console.log(error); });
                });
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
    }
}