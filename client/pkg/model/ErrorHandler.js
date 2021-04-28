class ErrorHandler {
    handleCode = ((errorCode, callback) => {
        switch(errorCode) {
            case 200:
                callback();
                break;
            case 208:
                console.log("Bereits Angemeldet");
                break;
            case 400:
                console.log("Fehlerhafter Request Syntax");
                break;
            case 401:
                console.log("Unauthorized");
                break;
            case 403:
                console.log("Nicht angemeldet");
                break;
            case 405:
                console.log("Karte ungültig");
                break;
            case 406:
                console.log("Falsches Payload");
                break;
            case 451:
                console.log("Karte ungültig");
                break;
            default:
                console.log("Unbekannter Fehler, bitte wenden Sie sich an die Administratoren.")
                break;
        }
    });
};