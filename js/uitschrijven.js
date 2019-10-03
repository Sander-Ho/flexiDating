"use strict";

document.getElementById("collapsible").onclick = function () {

    var content = document.getElementById("uitschrijvenFormulier")
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } 
        else {
            content.style.maxHeight = "180px";
        }
    };

document.getElementById('uitschrijvenKnop').onclick = function () {
    if (document.getElementById('nickname').value == "" || document.getElementById('wachtwoord').value == "") {
        message.style.color = "red";
        message.innerText = "Beide velden moeten ingevuld worden";
        return;
    }

    let rooturl = "https://scrumserver.tenobe.org/scrum/api";
    let nickname = document.getElementById('nickname').value;
    let wachtwoord = document.getElementById('wachtwoord').value;

    let url = "https://scrumserver.tenobe.org/scrum/api/profiel/authenticate.php";
    let data = {
        nickname: nickname,
        wachtwoord: wachtwoord
    }

    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then(function (response) {
            message.style.display = "block";
            if (response.status === 200) {
                console.log(localStorage.getItem("id"));
                let url = "https://scrumserver.tenobe.org/scrum/api/profiel/delete.php"
                let data = {
                    id: localStorage.getItem("id")
                }
                var request = new Request(url, {
                    method: 'DELETE',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });

                fetch(request)
                    .then(function (resp) { return resp.json();})
                    .then(function (data) { console.log(data); })
                    .then(function () { localStorage.removeItem("id");
                    window.location.href = "index.html"; })
                    .catch(function (error) { console.log(error); });
            }
            else {
                message.style.color = "red";
                if (response.status === 401) {
                    message.innerText = "incorrecte naam of wachtwoord";
                } else {
                    message.innerText = "er is een fout opgetreden bij het uitschrijven probeer opnieuw in een aantal minuten";
                }
            }

        })
        .catch(function (error) { console.log(error); });
};
