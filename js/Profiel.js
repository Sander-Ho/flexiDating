"use strict";

const responseDiv = document.getElementById("response");
const url = "https://scrumserver.tenobe.org/scrum/api/";
const urlImg = "https://scrumserver.tenobe.org/scrum/img/";
const fotos = ["no_image.png", "man_1.png", "man_2.png", "man_3.png", "man_4.png", "man_5.png", "man_6.png", "man_7.png", "man_8.png", "man_9.png", "man_10.png", "man_11.png", "man_default.png", "adl.png", "bram.png", "danira.png", "ilse_debruyne.png", "jv.png", "kurt_decaluwe.png", "paul_ampersand.png", "vanessa_vaneenoo.png", "zorro.png",
    "woman_1.png", "woman_2.png", "woman_3.png", "woman_4.png", "woman_5.png", "woman_6.png", "woman_7.png", "woman_8.png", "woman_9.png", "woman_10.png", "woman_11.png", "woman_12.png", "woman_13.png", "woman_default.png"];
const fotoSelect = document.getElementById("fotoNieuw");
for (const foto in fotos) {
    const opt = document.createElement('option');
    opt.value = fotos[foto];
    opt.innerText = fotos[foto].slice(0, -4);
    fotoSelect.appendChild(opt);
}


const rooturl = "https://scrumserver.tenobe.org/scrum/api";
const errorBericht = document.getElementById("errorBericht");
const profielDiv = document.getElementById("profiel");

const gebruikerId = localStorage.getItem("id");
let profielId;

const qs = decodeURIComponent(window.location.search);
if (qs !== "") {
    profielId = qs.split('=')[1];
    if (!isNaN(profielId) && profielId !== null)
        ToonVolledigProfiel(profielId);
}
else {
    profielId = gebruikerId;
    ToonVolledigProfiel(gebruikerId);
}

function ToonVolledigProfiel(profielId) {
    fetch(rooturl + '/profiel/read_one.php?id=' + profielId)
        .then(function (response) {
            if (response.status === 200) {
                profielDiv.style.display = "block";
                response.json().then(ToonGegevensOpProfiel);
            }
            else {
                document.getElementsByTagName("title")[0].innerText = "Profiel bestaat niet - Flexi Dating";

                profielDiv.style.display = "none";
                errorBericht.style.display = "block";

                errorBericht.innerText = "Profiel bestaat niet.";
            }
        })
        .catch(function (error) {
            profielDiv.style.display = "none";
            errorBericht.style.display = "block";

            errorBericht.innerText = error.name;
        });
}


function BerekenSterrenbeeld(datum) {
    const geboortedatum = new Date(datum);
    const geboortedag = geboortedatum.getDate() + 1;
    const geboortemaand = geboortedatum.getMonth() + 1;
    //Steenbok 22 december tot 19 januari
    if ((geboortedag >= 22 && geboortemaand === 12) || (geboortedag <= 19 && geboortemaand === 1))
        return "Steenbok";
    // Waterman 20 januari tot 18 februari
    if ((geboortedag >= 20 && geboortemaand === 1) || (geboortedag <= 18 && geboortemaand === 2))
        return "Waterman";
    // Vissen 19 februari tot 20 maart
    if ((geboortedag >= 19 && geboortemaand === 2) || (geboortedag <= 20 && geboortemaand === 3))
        return "Vissen";
    // Ram 21 maart tot 19 april
    if ((geboortedag >= 21 && geboortemaand === 3) || (geboortedag <= 19 && geboortemaand === 4))
        return "Ram";
    // Stier 20 april tot 20 mei
    if ((geboortedag >= 20 && geboortemaand === 4) || (geboortedag <= 20 && geboortemaand === 5))
        return "Stier";
    // Tweeling 21 mei tot 20 juni
    if ((geboortedag >= 21 && geboortemaand === 5) || (geboortedag <= 20 && geboortemaand === 6))
        return "Tweeling";
    // Kreeft 21 juni tot 22 juli
    if ((geboortedag >= 21 && geboortemaand === 6) || (geboortedag <= 22 && geboortemaand === 7))
        return "Kreeft";
    // Leeuw 23 juli tot 22 augustus
    if ((geboortedag >= 20 && geboortemaand === 7) || (geboortedag <= 18 && geboortemaand === 8))
        return "Leeuw";
    // Maagd 23 augustus tot 22 september
    if ((geboortedag >= 23 && geboortemaand === 8) || (geboortedag <= 22 && geboortemaand === 9))
        return "Maagd";
    // Weegschaal 23 september tot 22 oktober
    if ((geboortedag >= 23 && geboortemaand === 9) || (geboortedag <= 22 && geboortemaand === 10))
        return "Weegschaal";
    // Schorpioen 23 oktober tot 21 november
    if ((geboortedag >= 23 && geboortemaand === 10) || (geboortedag <= 21 && geboortemaand === 11))
        return "Schorpioen";
    // Boogschutter 22 november tot 21 december
    if ((geboortedag >= 22 && geboortemaand === 11) || (geboortedag <= 21 && geboortemaand === 12))
        return "Boogschutter";
}

function ToonGegevensOpProfiel(data) {
    //Profiel
    var geslacht;
    if(data.sexe == "m") {geslacht = "Geslacht: Man"}
    if(data.sexe == "v") {geslacht = "Geslacht: Vrouw"}
    else {geslacht = "Geslacht: Niet-binair"};

    document.getElementsByTagName("title")[0].innerText = data.nickname + " - Flexi Dating";
    document.getElementById("nickname").innerText = data.nickname;
    document.getElementById("profielfoto").src = "https://scrumserver.tenobe.org/scrum/img/" + data.foto;
    document.getElementById("profielfoto").setAttribute("alt", data.nickname);
    document.getElementById("beroep").innerText = "Beroep: " + data.beroep;
    document.getElementById("sexe").innerText = " " + geslacht;
    document.getElementById("oogkleur").innerText = "Oogkleur: " + data.oogkleur;
    document.getElementById("haarkleur").innerText = "Haarkleur: " + data.haarkleur;
    document.getElementById("gewicht").innerText = "Gewicht: " + data.gewicht;
    document.getElementById("grootte").innerText = "Grootte: " + data.grootte;

    document.getElementById('beroepNieuw').value = data.beroep;
    document.getElementById('voornaamNieuw').value = data.voornaam;
    document.getElementById('familienaamNieuw').value = data.familienaam;
    document.getElementById('emailNieuw').value = data.email;
    document.getElementById('fotoNieuw').value = data.foto;
    document.getElementById('geboortedatumNieuw').value = data.geboortedatum;
    document.getElementById('gewichtNieuw').value = data.gewicht;
    document.getElementById('grootteNieuw').value = data.grootte;
    document.getElementById('haarkleurNieuw').value = data.haarkleur;
    document.getElementById('nicknameNieuw').value = data.nickname;
    document.getElementById('oogkleurNieuw').value = data.oogkleur;
    document.getElementById('sexeNieuw').value = data.sexe;
    document.getElementById('wachtwoord1Nieuw').value = data.wachtwoord;
    document.getElementById('wachtwoord2Nieuw').value = data.wachtwoord;

    //Aanpas
    const sterrenbeeld = BerekenSterrenbeeld(data.geboortedatum);
    document.getElementById("sterrenbeeld").innerText = "sterrenbeeld: " + sterrenbeeld;
    document.getElementById("sterrenbeeldfoto").src = "images/" + sterrenbeeld + ".png";
    const gesprekKnop = document.getElementById("gesprekKnop");

    if (gebruikerId === profielId /* || ontgrendeld? */) {
        let element = document.getElementById("naam");
        element.innerText = "Naam: " + data.voornaam + " " + data.familienaam;
        element.removeAttribute("hidden");

        element = document.getElementById("geboortedatum");
        element.innerText = "Geboortedatum: " + data.geboortedatum;
        element.removeAttribute("hidden");

        element = document.getElementById("email");
        element.innerText = "E-Mail: " + data.email;
        element.removeAttribute("hidden");
        gesprekKnop.setAttribute("hidden", "");
    }
    else {
        document.getElementById("naam").setAttribute("hidden", "");
        document.getElementById("geboortedatum").setAttribute("hidden", "");
        document.getElementById("email").setAttribute("hidden", "");
        gesprekKnop.style.display = "block";
        gesprekKnop.onclick = function () {
            window.location.href = "chat.html?nieuwGesprekId=" + profielId;
        }
    }
}
document.getElementById("aanpasKnop").onclick = function () {
    if (document.getElementById("AanpassenProfiel").style.display == "block") {
        document.getElementById("AanpassenProfiel").style.display = "none";
    }
    else {
        document.getElementById("AanpassenProfiel").style.display = "block";
    }
}

let allesok = true;
document.getElementById("aanpassen").addEventListener('click', function (e) {
    let profielId = localStorage.getItem("id");
    let nieuweVoornaam = document.getElementById('voornaamNieuw').value;
    let nieuweFamilienaam = document.getElementById('familienaamNieuw').value;
    let nieuweEmail = document.getElementById('emailNieuw').value;
    let nieuweFoto = document.getElementById('fotoNieuw').value;
    let nieuweGeboortedatum = document.getElementById('geboortedatumNieuw').value;
    let nieuweGewicht = document.getElementById('gewichtNieuw').value;
    let nieuweGrootte = document.getElementById('grootteNieuw').value;
    let nieuweHaarkleur = document.getElementById('haarkleurNieuw').value;
    let nieuweNickname = document.getElementById('nicknameNieuw').value;
    let nieuweOogkleur = document.getElementById('oogkleurNieuw').value;
    let nieuweSexe = document.getElementById('sexeNieuw').value;
    let nieuweWachtwoord = document.getElementById('wachtwoord1Nieuw').value;
    let nieuweBeroep = document.getElementById('beroepNieuw').value;

    ControleerIngevuld("familienaamNieuw", 1000);
    ControleerIngevuld("voornaamNieuw", 1000);
    ControleerIngevuld("nicknameNieuw", 100);
    ControleerIngevuld("beroepNieuw", 1000);
    ControleerIngevuld("oogkleurNieuw", 50);
    ControleerIngevuld("haarkleurNieuw", 50);
    ControleerIngevuldNr("gewichtNieuw", 400, 40);
    ControleerIngevuldNr("grootteNieuw", 250, 100);
    ControleerIngevuld("wachtwoord1Nieuw", 1000);

    const emailregex = new RegExp('^.+@.+\..+$');
    allesok = true;
    const email = document.getElementById("emailNieuw").value;
    if (!emailregex.test(email) || email.length > 1000) {
        allesok = false;
        document.getElementById("emailNieuwFout").style.display = "block";
    } else {
        document.getElementById("emailNieuwFout").style.display = "none";
    }
    const wachtwoord1 = document.getElementById("wachtwoord1Nieuw").value;
    const wachtwoord2 = document.getElementById("wachtwoord2Nieuw").value;
    if (wachtwoord1 !== wachtwoord2) {
        allesok = false;
        document.getElementById("verschillendWachtwoordFout").innerText = "Wachtwoord moeten identiek zijn";
        document.getElementById("verschillendWachtwoordFout").style.display = "block";
    }
    else{
        document.getElementById("verschillendWachtwoordFout").style.display = "none";
    }

    const foto = document.getElementById("fotoNieuw").value;
    if (foto === "") {
        allesok = false;
        document.getElementById("fotoNieuwFout").style.display = "block";
    } else {
        document.getElementById("fotoNieuwFout").style.display = "none";
    }

    const geslacht = document.getElementById("sexeNieuw").value;
    if (geslacht === "") {
        allesok = false;
        document.getElementById("sexeNieuwFout").style.display = "block";
    } else {
        document.getElementById("sexeNieuwFout").style.display = "none";
    }
    const geboortedatumWaarde = String(document.getElementById("geboortedatumNieuw").value);
    if (geboortedatumWaarde === "" || BerekenLeeftijd(new Date(geboortedatumWaarde)) < 18 || geboortedatumWaarde === "dd/mm/yyyy") {
        allesok = false;
        if (geboortedatumWaarde === "" || geboortedatumWaarde === "dd/mm/yyyy") {

            document.getElementById("geboortedatumNieuwFout").style.display = "block";
        }
        else {
            document.getElementById("leeftijdNieuwFout").style.display = "block";
        }
    } else {
        document.getElementById("geboortedatumNieuwFout").style.display = "none";

        document.getElementById("leeftijdNieuwFout").style.display = "none";
    }
    document.getElementById("fotoNieuw").onchange = function () {
        const fotoString = document.getElementById("fotoNieuw").value;
        if (fotoString !== "") {
            document.getElementById("fotoVoorbeeld").style.display = "block";
            document.getElementById("fotoVoorbeeld").src = urlImg + fotoString;
        } else {
            document.getElementById("fotoVoorbeeld").style.display = "none";
        }
    };

    function BerekenLeeftijd(dateString) {
        const vandaag = new Date();
        const geboortedatum = new Date(dateString);
        let leeftijd = vandaag.getFullYear() - geboortedatum.getFullYear();
        const m = vandaag.getMonth() - geboortedatum.getMonth();
        if (m < 0 || (m === 0 && vandaag.getDate() < geboortedatum.getDate())) {
            leeftijd -= 1;
        }
        return leeftijd;
    }
    function ControleerIngevuldNr(element, max, min) {
        const waarde = document.getElementById(element).value;
        if (waarde === "" || waarde > max || isNaN(waarde) || waarde < min) {
            document.getElementById(element + "Fout").style.display = "block";
            allesok = false;
        } else {
            document.getElementById(element + "Fout").style.display = "none";
            return waarde;
        }
    }
    function ControleerIngevuld(element, validatieLengte) {
        const waarde = document.getElementById(element).value;
        if (waarde === "" || waarde.length > validatieLengte) {
            document.getElementById(element + "Fout").style.display = "block";
            allesok = false;
        } else {
            document.getElementById(element + "Fout").style.display = "none";
            return waarde;
        }
    }
    if (allesok === true) {
        let url = 'https://scrumserver.tenobe.org/scrum/api/profiel/read_one.php?id=' + profielId;
        fetch(url)
            .then(function (resp) { return resp.json(); })
            .then(function (data) {
                //nadat de vorige promise opgelost werd kwamen we in deze procedure tercht
                //hier kunnen we nu , met het resultat (data) van de vorige promise, aan de slag
                //we passen de voornaam aan en sturen ook dit terug zodat deze promise afgesloten kan worden                        
                let urlUpdate = 'https://scrumserver.tenobe.org/scrum/api/profiel/update.php';

                data['beroep'] = nieuweBeroep;
                data['email'] = nieuweEmail;
                data['familienaam'] = nieuweFamilienaam;
                data['foto'] = nieuweFoto;
                data['geboortedatum'] = nieuweGeboortedatum;
                data['gewicht'] = nieuweGewicht;
                data['grootte'] = nieuweGrootte;
                data['haarkleur'] = nieuweHaarkleur;
                data['nickname'] = nieuweNickname;
                data['oogkleur'] = nieuweOogkleur;
                data['sexe'] = nieuweSexe;
                data['voornaam'] = nieuweVoornaam;
                data['wachtwoord'] = nieuweWachtwoord;

                var request = new Request(urlUpdate, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
                fetch(request)
                    .then(function (resp) { return resp.json(); })
                    .then(function (data) { console.log(data); window.location.href = "profiel.html"; })
                    .catch(function (error) { console.log(error); });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});



