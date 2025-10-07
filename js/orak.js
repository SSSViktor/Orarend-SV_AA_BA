fetch('../fejlec.html')  // A beilleszteni kívánt HTML fájl URL-je
          .then(response => response.text())  // A válasz szöveggé alakítása
          .then(html => {
            document.getElementById('fejlec').innerHTML = html;  // Beillesztés a fejlec div-be
          })
          .catch(error => console.error('Hiba a fetch során:', error));
async function oraBetolt() {
    const urlOra = new URLSearchParams(window.location.search);
    const oraNev = urlOra.get("ora"); // pl. ?ora=matek

    const adatok = await fetch("../data/orak.json");
    const orak = await adatok.json();
    const ora = orak.find(ora => ora.id === oraNev);

    if (!ora) {
        document.getElementById("tantargyNev").innerText = oraNev;
        document.getElementById("aloldalNev").innerText = "ora_nem_talalhato";
        document.title = "ora_nem_talalhato";
        return;
    }   
    document.getElementById("tantargyNev").innerText = ora.nev;
    document.getElementById("tanar").innerText = ora.tanar; 
    document.getElementById("aloldalNev").innerText = ora.fejlecNev;
    document.getElementById("kep").src = ora.img


    const oraSzam = urlOra.get("oraSzam"); // pl. ?ora=matek&oraSzam=1
    const oraido = orak[0][`${oraSzam}.ora`];
    document.getElementById("oraIdo").innerText = oraido;
    document.title = `${ora.nev} - ${oraSzam}. óra`

    const tananyag = ora.tananyag;
    const tananyagCim = document.createElement("h3");
    tananyagCim.innerText = tananyag.cim;
    const tananyagHely = document.getElementById("tananyag");
    tananyagHely.appendChild(tananyagCim);
    tananyag.tartalom.forEach(elem => {
        const tartalomCim = document.createElement("h4");
        tartalomCim.innerText = elem.cim;
        document.getElementById("tananyag").appendChild(tartalomCim);
        const ul = document.createElement("ul");
        elem.tartalom.forEach(pont => {
            const li = document.createElement("li");
            li.innerText = pont;
            ul.appendChild(li);
        });
        tananyagHely.appendChild(ul);
    });
}
window.onload = oraBetolt;
