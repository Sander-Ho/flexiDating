"use strict";

const rooturl = "https://scrumserver.tenobe.org/scrum/api";
const errorBericht = document.getElementById("errorBericht");
const resultatenUl = document.getElementById("resultaten");


document.getElementById("zoek").onclick = function () {
    let url = "/profiel/search.php?";
    let element;

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

    if ((element = document.getElementById("grootte")).value != 0) {
        let operatorSelect = document.getElementById("grootteOperator");
        let operator = operatorSelect.options[operatorSelect.selectedIndex].value;
        let maxValue = document.getElementById("maxGrootte").value;

        url += "&grootteOperator=" + operator;
        if (operator === "range")
            url += "&rangeMinGrootte=" + element.value + "&rangeMaxGrootte=" + maxValue;
        else
            url += "&grootte=" + element.value;
    }

    if ((element = document.getElementById("gewicht")).value != 0) {
        let operatorSelect = document.getElementById("gewichtOperator");
        let operator = operatorSelect.options[operatorSelect.selectedIndex].value;
        let maxValue = document.getElementById("maxGewicht").value;

        url += "&gewichtOperator=" + operator;
        if (operator === "range")
            url += "&rangeMinGewicht=" + element.value + "&rangeMaxGewicht=" + maxValue;
        else
            url += "&gewicht=" + element.value;
    }

    element = document.getElementById("orderBy");
    url += "&orderBy=" + element.options[element.selectedIndex].value;

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
            element.innerText = gebruiker.beroep;
            li.appendChild(element);
    
            element = document.createElement("p");
            element.innerText = (gebruiker.sexe === "m" ? "Man" : "Vrouw");
            li.appendChild(element);
    
            element = document.createElement("p");
            element.innerText = gebruiker.oogkleur;
            li.appendChild(element);
    
            element = document.createElement("p");
            element.innerText = gebruiker.haarkleur;
            li.appendChild(element);
    
            element = document.createElement("p");
            element.innerText = gebruiker.gewicht;
            li.appendChild(element);
    
            element = document.createElement("p");
            element.innerText = gebruiker.grootte;
            li.appendChild(element);
    
            resultatenUl.appendChild(li);
        }
    }
    else {
        resultatenUl.style.display = "none";
        errorBericht.style.display = "block";

        errorBericht.innerText = "Geen profielen gevonden";
    }
    
}