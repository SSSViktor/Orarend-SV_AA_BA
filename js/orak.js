fetch('fejlec.html')
  .then(response => response.text())
  .then(html => {
      const navbar = document.getElementById('fejlec');
      navbar.innerHTML = html;

      let fejlec_meret = 72;
      let lastScrollTop = 0;

      window.addEventListener("scroll", function() {
          navbar.style.transition = `top ${fejlec_meret/200}s ease-in-out, box-shadow ${fejlec_meret/200}s ease-in-out`;
          let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

          if (currentScroll > lastScrollTop) {
              navbar.style.top = -fejlec_meret + "px";
              navbar.style.boxShadow = currentScroll > fejlec_meret ? "none" : "0 4px 8px rgba(0,0,0,0.2)";
          } else {
              navbar.style.top = "0";
              navbar.style.boxShadow = currentScroll > 0 ? "0 4px 8px rgba(0,0,0,0.2)" : "none";
          }

          lastScrollTop = currentScroll;
      });
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
        document.getElementById("tartalom").style.display = "none";
        document.getElementById("tanar").style.display = "none";
        document.getElementById("tantargyNev").style.display = "none";
        return;
    }   
    document.getElementById("tantargyNev").innerText = ora.nev;
    document.getElementById("tanar").innerText = ora.tanar; 
    document.getElementById("aloldalNev").innerText = ora.fejlecNev;
    document.getElementById("kep").src = ora.img


    const oraSzam = urlOra.get("oraSzam"); // pl. ?ora=matek&oraSzam=1
    const oraido = orak[0][`${oraSzam}.ora`];
    document.getElementById("oraIdo").innerText = "Óra idelye: "+oraido;
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
