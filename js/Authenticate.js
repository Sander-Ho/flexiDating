"use strict";
const messageLabel = document.getElementById("message");

document.getElementById('submitKnop').onclick = function() {
  let nickname = document.getElementById('nickname').value;
  let wachtwoord = document.getElementById('wachtwoord').value;

  let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/authenticate.php';
  let data = {
    nickname: nickname,
    wachtwoord: wachtwoord
  };

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
    if (response.status === 200){
      response.json().then(LogIn)
      message.style.color = "black";
      message.innerText = "U bent ingelogd";
    } else {
      message.style.color = "red";
      if (response.status === 401) {
        message.innerText = "incorrecte naam of wachtwoord"; 
      } else {
        message.innerText = "er is een fout opgetreden bij het inloggen probeer opnieuw in een aantal minuten";
      }
    }

  })
  .catch(function (error) { console.log(error); });
};
function LogIn(data) {
  localStorage.setItem("id", data.id);

}
