
const waarde = localStorage.getItem("id");
const locatieArray = window.location.pathname.split('/');
const locatie = locatieArray[locatieArray.length - 1];
if(waarde === null && !(locatie === "index.html" || locatie === "aanmelden.html" || locatie === "registreren.html"))
{
	window.location.href = "index.html";

}
Array.prototype.forEach.call(document.getElementsByClassName("welingelogd"), function(element){
	element.style.display = "none";
});
if(!isNaN(waarde) && waarde !== null)
{
	fetch("https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=" + waarde)
	.then(function (response) {
		if (response.status === 200){
			response.json().then(ToonNaam);
			Array.prototype.forEach.call(document.getElementsByClassName("nietingelogd"), function(element){
				element.style.display = "none";
			});
			Array.prototype.forEach.call(document.getElementsByClassName("welingelogd"), function(element){
				element.style.display = "block";
			});
		}   
	});
	

};
function ToonNaam(data) {
	const ingelogd = document.getElementById("ingelogd");
	const uitloggen = document.getElementById("uitloggen");
	ingelogd.style.display = "block";
	uitloggen.style.display = "block";
	ingelogd.innerText = "Welkom, " + data.nickname;
	uitloggen.onclick = function() {
		localStorage.removeItem("id");
		window.location.href = "index.html";
	};
}