
           document.getElementById('submitKnop').addEventListener('click', function (e) {
               let nickname = document.getElementById('nickname').value;
               let wachtwoord = document.getElementById('wachtwoord').value;

               let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/authenticate.php';
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
                   .then(function (resp) { return resp.json(); })
                   .then(function (data) { console.log(data); })
                   .catch(function (error) { console.log(error); });
           });
