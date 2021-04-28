class ApiService {
    GAME_API_URI;
    GAME_SESSION_ID;
    test;

    apiFunction = {
        LOGIN: 'anmelden',
        SCORE: 'spielstand',
        TAKE_CARD: 'ziehen',
        PLAY: 'spielen',
        RESET: 'zuruecksetzen'
    }

    setApiUri = ((apiUri) => {
        this.GAME_API_URI = apiUri;
    })

    loginToGame = (async (playerId) => {
        let _startTime,
            _gameCards,
            _sessionID;

        return Promise.resolve($.ajax(this.GAME_API_URI + this.apiFunction.LOGIN, { 
            type: 'POST',
            dataType: 'json', 
            data: JSON.stringify({ 
                spielerID: playerId
            }),

            complete: function (res) {                 
                switch(res.status) { 
                    case 200: 
                        _sessionID = res.responseJSON.sessionID;
                        _startTime = res.responseJSON.spielStart;
                        _gameCards = res.responseJSON.karten;
                        break; 
                }
            }
        })).then(() => {
            this.GAME_SESSION_ID = _sessionID;
            return [
                _startTime, 
                _gameCards
            ];
        })
    });

    getGameScore = (async () => {
        let _gameScore;

        return Promise.resolve($.ajax(this.GAME_API_URI + this.apiFunction.SCORE, { 
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({ 
                sessionID: this.GAME_SESSION_ID
            }),

            complete: function (res) {                 
                switch(res.status) { 
                    case 200:
                        _gameScore = res.responseJSON;
                        console.log(res.responseJSON)
                        break; 
                }
            }
        })).then(() => {
            return _gameScore;
        });
    });

    takeCard = (async () => { 
        let _takenCard;

        return Promise.resolve($.ajax(this.GAME_API_URI + this.apiFunction.TAKE_CARD, { 
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({ 
                sessionID: this.GAME_SESSION_ID
            }),

            complete: function (res) {                 
                switch(res.status) { 
                    case 200:               
                        _takenCard = res.responseJSON.karte;
                        break; 
                } 
            }
        })).then(() => {
            return _takenCard;
        });
    });

    playCard = (async (gameId, card) => {
        let _removedCard;

        return Promise.resolve($.ajax(this.GAME_API_URI + this.apiFunction.PLAY, {
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                sessionID: this.GAME_SESSION_ID,
                aktuellesSpiel: {
                    spield: gameId
                },
                karte: {
                    farbe: card.farbe,
                    zahl: card.zahl
                }
            }),
            complete: function (res) {
                switch(res.status) {
                    case 200: 
                        _removedCard = card;
                        break;
                }
            }
        })).then(() => {
            return _removedCard;
        });
    });

    resetGame = (async () => {
        return Promise.resolve($.ajax(this.GAME_API_URI + this.apiFunction.RESET, {
            type: 'GET',
            dataType: 'json',
        }));
    });
}