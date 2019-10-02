window.onload = function() {

  const waarde = localStorage.getItem("id");
  const locatie = window.location.search.split('');
  if(waarde === null && !(locatie !== "index.html" && locatie !== "Aanmelden.html" && locatie !== "registreren.html"))
  {
    window.location.href = "index.html";

  }
	if(!isNaN(waarde))
	{
		fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + waarde)
    	.then(function (response) {
        	if (response.status === 200){
        	    response.json().then(ToonNaam); 
        	}   
    	});
	}
};
function ToonNaam(data) {
	const ingelogd = document.getElementById("ingelogd");
	const uitloggen = document.getElementById("uitloggen");
	ingelogd.style.display = "block";
	uitloggen.style.display = "block";
	ingelogd.innerText = "u bent ingelogd als " + data.nickname;
	uitloggen.onclick = function() {
		localStorage.removeItem("id");
		window.location.href = "index.html";
	};
}