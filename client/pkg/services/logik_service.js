class Numbercard{
    played = 0;
    0 = 1;
    1 = 2;
    2 = 2;
    3 = 2;
    4 = 2;
    5 = 2;
    6 = 2;
    7 = 2;
    8 = 2;
    9 = 2;
}

class LogikService {
    TOTAL_CARD_AMOUNT = 108;
    NUMBER_CARDS_PER_COLOR = this.TOTAL_CARD_AMOUNT/4;
    NUMBER_CARDs
    totalCardsLeft = 108;
    numberCardsLeft = 76;
    actionCardsLeft = 24;
    wildCardsLeft = 8;
    playedCards = [];
    myCards = [];

    addmyCard = ((myCard) => {
        this.myCards.push(myCard);
        this.updateLeftCards(myCard);
    });

    addPlayedCard = ((playedCard) => {
        this.playedCards.push(playedCard);
        this.updateLeftCards(playedCard);
    });

    updateLeftCards = ((playedCard) => {
        this.totalCardsLeft--;
        //TODO CHECK CARD TYPE
        // switch(this.playedCard.type) {
        //     case 'action': 
        //         break;
        // }
    });

    findPossibleCard = ((actualColor, actualNumber) => {
        let _possibleCards = [];
        myCards.forEach((card) => {
            if(card.farbe == actualColor 
                || card.zahl == actualNumber) _possibleCards.push(card);
        });
        return _possibleCards;
    });

    findOptimalCard = ((actualColor, actualNumber) => {
        let _possibleCards = this.findPossibleCard(actualColor, actualNumber);
        let _greenCards = new Numbercard();
        let _redCards = new Numbercard();
        let _yellowCards = new Numbercard();
        let _blueCards = new Numbercard();
        let _myNumbers = [];

        this.myCards.forEach((myCard) => {
            _myNumbers.push(myCard.zahl);
        });

        this.playedCards.forEach((playedCard) => {
            switch(playedCard.farbe) {
                case 'gruen': _greenCards.played++; _greenCards[playedCard.zahl]--; break;
                case 'rot': _redCards.played++; _redCards[playedCard.zahl]--; break;
                case 'gelb': _yellowCards.played++; _yellowCards[playedCard.zahl]--; break;
                case 'blau': _blueCards.played++; _blueCards[playedCard.zahl]--; break;
            }
        });

        let _probabilityNumberCards = {
            green: (_greenCards.played/this.NUMBER_CARDS_PER_COLOR)*100,
            red: (_redCards.played/this.NUMBER_CARDS_PER_COLOR)*100,
            yellow: (_yellowCards.played/this.NUMBER_CARDS_PER_COLOR)*100,
            blue: (_blueCards.played/this.NUMBER_CARDS_PER_COLOR)*100,
        };
    });
}