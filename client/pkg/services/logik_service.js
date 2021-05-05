class Numbercard{
    unavailable = 0;
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
    TOTAL_NUMBER_CARDS = 76;
    TOTAL_ACTION_CARDS = 24;
    TOTAL_WILD_CARDS = 8;
    NUMBER_CARDS_PER_COLOR = this.TOTAL_NUMBER_CARDS/4;
    greenCards = new Numbercard();
    redCards = new Numbercard();
    yellowCards = new Numbercard();
    blueCards = new Numbercard();
    
    playedCards = [];
    myCards = [];

    addMyCard = ((cardToAdd) => {
        this.myCards.push(cardToAdd);
        this.adjustCardData(cardToAdd);
    });
    
    removeMyCard = ((cardToRemove) => {
        gameCards
            .splice(
                gameCards
                .findIndex(card => 
                    card.farbe == cardToRemove.farbe
                    && card.zahl == cardToRemove.zahl)
                , 1);
    });
    
    addPlayedCard = ((playedCard) => {
        this.playedCards.push(playedCard);
        this.adjustCardData(playedCard);
    });

    adjustCardData = ((card) => {
        switch(card.farbe) {
            case 'gruen': this.greenCards.unavailable++; this.greenCards[card.zahl]--; break;
            case 'rot': this.redCards.unavailable++; this.redCards[card.zahl]--; break;
            case 'gelb': this.yellowCards.unavailable++; this.yellowCards[card.zahl]--; break;
            case 'blau': this.blueCards.unavailable++; this.blueCards[card.zahl]--; break;
        }
    });

    findPossibleCard = ((actualColor, actualNumber) => {
        let _possibleCards = [];
        myCards.forEach((card) => {
            if(card.farbe == actualColor 
                || card.zahl == actualNumber 
                || card.farbe == actualColor 
                    && card.actualNumber >= 10) _possibleCards.push(card);
            if(card.actualNumber == 13) { card.farbe = "gruen"; _possibleCards.push(card); }
        });
        console.log(_possibleCards)
        return _possibleCards;
    });

    findOptimalCard = ((actualColor, actualNumber) => {
        let _possibleCards = this.findPossibleCard(actualColor, actualNumber);
        let _myNumbers = [];

        this.myCards.forEach((myCard) => {
            _myNumbers.push(myCard.zahl);
        });

        let _probabilityNumberCards = {
            green: ((this.NUMBER_CARDS_PER_COLOR - _greenCards.unavailable)/this.NUMBER_CARDS_PER_COLOR)*100,
            red: ((this.NUMBER_CARDS_PER_COLOR - _redCards.unavailable)/this.NUMBER_CARDS_PER_COLOR)*100,
            yellow: ((this.NUMBER_CARDS_PER_COLOR - _yellowCards.unavailable)/this.NUMBER_CARDS_PER_COLOR)*100,
            blue: ((this.NUMBER_CARDS_PER_COLOR - _blueCards.unavailable)/this.NUMBER_CARDS_PER_COLOR)*100,
        };
    });
}