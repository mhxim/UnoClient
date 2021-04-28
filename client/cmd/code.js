let btnSpielStart = document.getElementById("btnSpielStarten");
let btnSpielZuruecksetzen = document.getElementById("btnSpielZuruecksetzen");

btnSpielStart.addEventListener("click", (() => {
    spielStarten();
}));

btnSpielZuruecksetzen.addEventListener("click", (() => {
    apiService.resetGame();
}));