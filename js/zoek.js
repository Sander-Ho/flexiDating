"use strict";
let fout = false;
const rooturl = "https://scrumserver.tenobe.org/scrum/api";
const errorBericht = document.getElementById("errorBericht");
const resultatenUl = document.getElementById("resultaten");


document.getElementById("zoek").onclick = function () {
    let url = "/profiel/search.php?";
    let element;
    fout = false;
    while (resultatenUl.firstChild) {
        resultatenUl.removeChild(resultatenUl.firstChild);
    }
    
    if ((element = document.getElementById("nickname")).value !== "") {
        url += "nickname=" + element.value;

        if (document.getElementById("nicknameFuzzy").checked)
            url += "&nicknameFuzzy=1";
    }

    if ((element = document.getElementById("beroep")).value !== "") {
        url += "&beroep=" + element.value;

        if (document.getElementById("beroepFuzzy").checked)
            url += "&beroepFuzzy=1";
    }

    element = document.getElementById("sexe");
    url += "&sexe=" + element.options[element.selectedIndex].value;

    if ((element = document.getElementById("haarkleur")).value !== "")
        url += "&haarkleur=" + element.value;

    if ((element = document.getElementById("oogkleur")).value !== "")
        url += "&oogkleur=" + element.value;

    if ((element = document.getElementById("grootte")).value != "") {
        let operatorSelect = document.getElementById("grootteOperator");
        let operator = operatorSelect.options[operatorSelect.selectedIndex].value;
        let maxValue = document.getElementById("maxGrootte").value;
        ControleerIngevuldNr("grootte", 250, 100);
        url += "&grootteOperator=" + operator;
        if (operator === "range")
        {
            ControleerIngevuldNr("maxGrootte", 250, 100);
            url += "&rangeMinGrootte=" + element.value + "&rangeMaxGrootte=" + maxValue;
        }
        else
            url += "&grootte=" + element.value;
    }

    if ((element = document.getElementById("gewicht")).value != "") {
        let operatorSelect = document.getElementById("gewichtOperator");
        let operator = operatorSelect.options[operatorSelect.selectedIndex].value;
        let maxValue = document.getElementById("maxGewicht").value;
        ControleerIngevuldNr("gewicht", 400, 40);
        url += "&gewichtOperator=" + operator;
        if (operator === "range")
        {
            ControleerIngevuldNr("maxGewicht", 400, 40);
            url += "&rangeMinGewicht=" + element.value + "&rangeMaxGewicht=" + maxValue;
        }
        else
            url += "&gewicht=" + element.value;
    }

    element = document.getElementById("orderBy");
    url += "&orderBy=" + element.options[element.selectedIndex].value;
    if(fout)
        return null;
    fetch(rooturl + url)
    .then(function (response) {
        response.json().then(ToonResultaten);
    })
    .catch(function (error) {
        resultatenUl.style.display = "none";
        errorBericht.style.display = "block";

        errorBericht.innerText = error.name;
    });
}


document.getElementById("grootteOperator").onchange = function () {
    if (this.options[this.selectedIndex].value === "range")
        document.getElementById("maxGrootte").removeAttribute("hidden");
    else
        document.getElementById("maxGrootte").setAttribute("hidden", "");
}


document.getElementById("gewichtOperator").onchange = function () {
    if (this.options[this.selectedIndex].value === "range")
        document.getElementById("maxGewicht").removeAttribute("hidden");
    else
        document.getElementById("maxGewicht").setAttribute("hidden", "");
}



function ToonResultaten(data) {
    if (data.length > 0) {
        resultatenUl.style.display = "block";
        errorBericht.style.display = "none";

        for (const gebruiker of data) {
            const li = document.createElement("li");
            li.onclick = function () {window.location.href = "profiel.html?id=" + gebruiker.id; }
            let element = document.createElement("a");
            
            li.setAttribute("class", "profielKlein");
            element.innerText = gebruiker.nickname;
            element.setAttribute("href", "profiel.html?id=" + gebruiker.id);
            li.appendChild(element);

            element = document.createElement("img");
            element.setAttribute("src", "https://scrumserver.tenobe.org/scrum/img/" + gebruiker.foto);
            element.setAttribute("alt", gebruiker.nickname);
            li.appendChild(element);

            element = document.createElement("p");
            element.innerText = "beroep: " + gebruiker.beroep;
            li.appendChild(element);

            element = document.createElement("p");
            element.innerText = "geslacht: " + (gebruiker.sexe == "m" ? "Man" : "Vrouw");
            li.appendChild(element);

            element = document.createElement("p");
            element.innerText = "oogkleur: " + gebruiker.oogkleur;
            li.appendChild(element);

            element = document.createElement("p");
            element.innerText = "haarkleur: " + gebruiker.haarkleur;
            li.appendChild(element);

            element = document.createElement("p");
            element.innerText = "gewicht: " + gebruiker.gewicht;
            li.appendChild(element);

            element = document.createElement("p");
            element.innerText = "grootte: " + gebruiker.grootte;
            li.appendChild(element);
            
            element = document.createElement("button");
            element.innerText = "Toevoegen aan favorieten";
            element.onclick = function() {toevoegenFav(gebruiker.id);};
            li.appendChild(element);


            resultatenUl.appendChild(li);
        }
    }
    else {
        resultatenUl.style.display = "none";
        errorBericht.style.display = "block";

        errorBericht.innerText = "Geen profielen gevonden";
    }
    
    document.getElementsByTagName("title")[0].innerText = data.length + " zoekresultaten - Flexi Dating";
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


function ControleerIngevuldNr(element, max, min) {
    const waarde = document.getElementById(element).value;
    if (waarde === "" || waarde > max || isNaN(waarde) || waarde < min ) {
        document.getElementById(element + "Fout").style.display = "block";
        fout = true;
    } else {
        document.getElementById(element + "Fout").style.display = "none";
    }
}