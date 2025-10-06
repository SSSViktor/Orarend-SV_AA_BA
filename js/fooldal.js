window.addEventListener('load', () => {
    fetch('fejlec.html')  // A beilleszteni kívánt HTML fájl URL-je
          .then(response => response.text())  // A válasz szöveggé alakítása
          .then(html => {
            document.getElementById('fejlec').innerHTML = html;  // Beillesztés a fejlec div-be
          })
          .catch(error => console.error('Hiba a fetch során:', error));
          
    const oraGombok = document.querySelectorAll('#orarend td[data-ora]');

    oraGombok.forEach(td => {
        td.addEventListener('click', function() {
            const sor = this.closest('tr'); // az adott td sorát megkeressük
            const oraSzam = sor.querySelector('td:first-child').innerText; // első cella tartalma (1,2,3...)

            window.top.location.href = `ora.html?ora=${this.dataset.ora}&oraSzam=${oraSzam}`;
            //window.open(`ora.html?ora=${this.dataset.ora}&oraSzam=${oraSzam}`,'_blank');
        });
    });
});
