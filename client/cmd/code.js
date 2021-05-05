let btnSpielStart = document.getElementById("btnSpielStarten");
let btnSpielZuruecksetzen = document.getElementById("btnSpielZuruecksetzen");
let btnIntervalSetzen = document.getElementById("btnIntervalSetzen");
let selectAPI = document.getElementById("selectAPI");
let selectPlayer = document.getElementById("selectPlayer");

btnSpielStart.addEventListener("click", (() => {
    spielStarten();
}));

btnSpielZuruecksetzen.addEventListener("click", (() => {
    apiService.resetGame();
}));

btnIntervalSetzen.addEventListener("click", (() => {
    GAME_TIMER_INTERVAL = setInterval.value;
}));

selectAPI.addEventListener("change", (() => {
    GAME_API_URL = GAME_APIS[selectAPI.options[selectAPI.selectedIndex].value];
}));

selectPlayer.addEventListener("change", (() => {
    GAME_PLAYERID = selectPlayer.options[selectPlayer.selectedIndex].value;
}));

