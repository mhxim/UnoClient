let apiService = new ApiService();
const GAME_API_URL = 'http://ims.kanti-sargans.ch/ims18/UnoA/api.php/'; // kanti URL: http://ims.kanti-sargans.ch/ims18/UnoA/api.php/ UNO A: http://uno.mine.nu:524/api.php/
const GAME_TIMER_INTERVAL = 3000;
const GAME_PLAYERID = 1;
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

let findOptimalCard = ((color, number) => {
	let _optimalCards = [];
	console.log(gameCards);
	gameCards.forEach((card) => {
		if(card.farbe == color 
			|| card.zahl == number) _optimalCards.push(card);
	});
	return _optimalCards[0];
});

let getOptimalCard = (() => {
	let _optimalCard = null;
	_optimalCard = findOptimalCard(gameScore.aktuelleKarte.farbe, gameScore.aktuelleKarte.zahl);
	return _optimalCard;
});

let processGameInputs = (() => {
	isPlayerTurn = checkPlayerTurn();
	if(isPlayerTurn) optimalCard = getOptimalCard();
}); 

let sendGameOutputs = (() => {
	if(isPlayerTurn 
		&& optimalCard) apiService.playCard(gameScore.spielID, optimalCard).then((playedCard) => removeCard(playedCard));
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