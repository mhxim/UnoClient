let apiService = new ApiService();
let logikService = new LogikService();

const GAME_APIS = {
	UNOA: 'http://ims.kanti-sargans.ch/ims18/UnoA/api.php/',
	UNOB: 'http://ims.kanti-sargans.ch/ims18/UnoB/api.php/',
	UNOC: 'http://ims.kanti-sargans.ch/ims18/UnoC/api.php/',
}
let GAME_PLAYERID = 1;
let GAME_TIMER_INTERVAL = 3000;
let GAME_API_URL = GAME_APIS.UNOA;
let	GAME_SESSION_ID;
let	GAME_START_TIME;

// let UI_COMPONENTS = {
// 	CURRENT_CARD_DIV: document.getElementById("currentCardDiv"),
// 	MY_CARDS_DIV: document.getElementById("currentCardDiv")
// };

apiService.setApiUri(GAME_API_URL);
console.log(apiService);

const gameStatus = {
	WAIT_FOR_PLAYERS: 0,
	GAME_START: 1,
	GAME_ONGOING: 2,
	GAME_END: 3
}

let	gameLoopIteration = 0;
let gameScore;
let gameCards = [];
let optimalCard;

let isPlayerTurn = false;

// !!!!!!!!!!!!!!!!!!!
// Funktionen removecard, findoptimalcard und getoptimalcard werden entfernt und durch den logikservice ersetzt

let removeCard = ((_cardToRemove) => {
	gameCards
		.splice(
			gameCards
			.findIndex(card => 
				card.farbe == _cardToRemove.farbe
				&& card.zahl == _cardToRemove.zahl)
			, 1);
});

let getAllGameInputs = (() => {
	return Promise.all([
		apiService.getGameScore()
			.then((_gameScore) => { gameScore = _gameScore; gameCards = _gameScore.meineInformationen.karten; }),
	]);
});

let checkPlayerTurn = (() => {
	if(gameScore.aktuellerSpieler.spielerID == GAME_PLAYERID) return true;
	return false;
});

let findOptimalCard = ((actualColor, actualNumber) => {
	let _optimalCards = [];
	gameCards.forEach((card) => {
		if(card.farbe == actualColor 
			|| card.zahl == actualNumber 
			|| card.farbe == actualColor 
				&& card.zahl >= 10) _optimalCards.push(card);
		if(card.zahl == 13) { card.farbe = "gruen"; _optimalCards.push(card); }
	});
	return _optimalCards[0];
});

let getOptimalCard = (() => {
	let _optimalCard = null;
	_optimalCard = findOptimalCard(gameScore.aktuelleKarte.farbe, gameScore.aktuelleKarte.zahl);
	// _possibleCards = logikService.findPossibleCard(gameScore.aktuelleKarte.farbe, gameScore.aktuelleKarte.zahl);
	return _possibleCards[0];
});

let processGameInputs = (() => {
	isPlayerTurn = checkPlayerTurn();
	if(isPlayerTurn) optimalCard = getOptimalCard();
}); 

let sendGameOutputs = (() => {
	if(isPlayerTurn) 
		if(optimalCard) apiService.playCard(gameScore.spielID, optimalCard).then((playedCard) => removeCard(playedCard));
		else if (!optimalCard) apiService.takeCard().then((takenCard) => console.log(`gezogene Karte: ${takenCard}`))
});

let renderGame = (() => {
	console.log(`Game iteration: ${++gameLoopIteration}`);
});

let gameLoop = (() => {
	getAllGameInputs()
		.then(() => {
			processGameInputs();
			sendGameOutputs();
			renderGame();
		});
});

let spielStarten = (() => {
	let currentTime = new Date().getTime();
	apiService.setApiUri(GAME_API_URL);
	apiService.loginToGame(GAME_PLAYERID)
		.then(([startTime, gameCards]) => {
			console.log(apiService);
			GAME_START_TIME = startTime;
			gameCards = gameCards;

			let gameStartTime = Date.parse(GAME_START_TIME);
			let timeTillGameStart = gameStartTime - currentTime;
			console.log(`Time till Gamestart: ${timeTillGameStart}`);
			
			setTimeout(() => {
				gameLoop();
				setInterval(gameLoop, GAME_TIMER_INTERVAL);
			}, timeTillGameStart)
		})
});