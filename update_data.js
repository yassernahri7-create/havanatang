const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(p, 'utf8'));

data.carta.drinks = [
    { "id": "d-b1", "name": "Heineken 30 cl", "price": "50 DH", "tablePrice": "", "category": "Bières" },
    { "id": "d-b2", "name": "San Miguel", "price": "50 DH", "tablePrice": "", "category": "Bières" },
    { "id": "d-b3", "name": "Budweiser 20,7", "price": "50 DH", "tablePrice": "", "category": "Bières" },
    { "id": "d-b4", "name": "Casablanca 33 cl", "price": "60 DH", "tablePrice": "", "category": "Bières" },
    { "id": "d-b5", "name": "Smirnof ice", "price": "60 DH", "tablePrice": "", "category": "Bières" },
    { "id": "d-b6", "name": "Corona", "price": "60 DH", "tablePrice": "", "category": "Bières" },

    { "id": "d-a1", "name": "Pastis 51", "price": "70 DH", "tablePrice": "", "category": "Apèritif" },
    { "id": "d-a2", "name": "Ricard", "price": "70 DH", "tablePrice": "", "category": "Apèritif" },
    { "id": "d-a3", "name": "Campari", "price": "70 DH", "tablePrice": "", "category": "Apèritif" },
    { "id": "d-a4", "name": "Fernet Branca", "price": "70 DH", "tablePrice": "", "category": "Apèritif" },
    { "id": "d-a5", "name": "Jagermeister", "price": "70 DH", "tablePrice": "", "category": "Apèritif" },
    { "id": "d-a6", "name": "Martini", "price": "70 DH", "tablePrice": "", "category": "Apèritif" },

    { "id": "d-l1", "name": "Malibu", "price": "70 DH", "tablePrice": "", "category": "Liqueur" },
    { "id": "d-l2", "name": "Kahlua", "price": "70 DH", "tablePrice": "", "category": "Liqueur" },
    { "id": "d-l3", "name": "Get 27", "price": "70 DH", "tablePrice": "", "category": "Liqueur" },
    { "id": "d-l4", "name": "Baileys", "price": "70 DH", "tablePrice": "", "category": "Liqueur" },
    { "id": "d-l5", "name": "Jagermeister", "price": "70 DH", "tablePrice": "", "category": "Liqueur" },
    { "id": "d-l6", "name": "Amaretto", "price": "70 DH", "tablePrice": "", "category": "Liqueur" },

    { "id": "d-sm1", "name": "The Glentivet 12", "price": "70 DH", "tablePrice": "1200 DH", "category": "Single Malt" },
    { "id": "d-sm2", "name": "The Glentivet 15", "price": "80 DH", "tablePrice": "1400 DH", "category": "Single Malt" },
    { "id": "d-sm3", "name": "The Glentivet 18", "price": "90 DH", "tablePrice": "1500 DH", "category": "Single Malt" },
    { "id": "d-sm4", "name": "The Glentivet 21", "price": "200 DH", "tablePrice": "4000 DH", "category": "Single Malt" },
    { "id": "d-sm5", "name": "Glenfiddich 12", "price": "70 DH", "tablePrice": "1200 DH", "category": "Single Malt" },
    { "id": "d-sm6", "name": "Glenfiddich 15", "price": "80 DH", "tablePrice": "1400 DH", "category": "Single Malt" },

    { "id": "d-c1", "name": "Martel VS", "price": "70 DH", "tablePrice": "", "category": "Cognac" },
    { "id": "d-c2", "name": "Martel VSOP", "price": "80 DH", "tablePrice": "", "category": "Cognac" },
    { "id": "d-c3", "name": "Martel XO", "price": "100 DH", "tablePrice": "", "category": "Cognac" },
    { "id": "d-c4", "name": "Courvoisier VSOP", "price": "80 DH", "tablePrice": "", "category": "Cognac" },
    { "id": "d-c5", "name": "Hennessy VS", "price": "70 DH", "tablePrice": "", "category": "Cognac" },
    { "id": "d-c6", "name": "Rèmy Martin VSOP", "price": "80 DH", "tablePrice": "", "category": "Cognac" },

    { "id": "d-t1", "name": "Olmeca Altos Plata", "price": "70 DH", "tablePrice": "", "category": "Tequilla" },
    { "id": "d-t2", "name": "Olmeca Altos Reposado", "price": "70 DH", "tablePrice": "", "category": "Tequilla" },
    { "id": "d-t3", "name": "Camino", "price": "70 DH", "tablePrice": "", "category": "Tequilla" },

    { "id": "d-sh1", "name": "Samboca", "price": "70 DH", "tablePrice": "", "category": "Shooter" },
    { "id": "d-sh2", "name": "B52", "price": "70 DH", "tablePrice": "", "category": "Shooter" },

    { "id": "d-s1", "name": "Soda", "price": "70 DH", "tablePrice": "", "category": "Softs" },
    { "id": "d-s2", "name": "Jus de fruits", "price": "70 DH", "tablePrice": "", "category": "Softs" },
    { "id": "d-s3", "name": "Red Bull", "price": "100 DH", "tablePrice": "", "category": "Softs" },

    { "id": "d-ch1", "name": "Mumm Cordon Rouge", "price": "", "tablePrice": "1200 DH", "category": "Champagnes" },
    { "id": "d-ch2", "name": "Mumm Rosè", "price": "", "tablePrice": "1200 DH", "category": "Champagnes" },
    { "id": "d-ch3", "name": "Perrier Jouèt Grand Brut", "price": "", "tablePrice": "1800 DH", "category": "Champagnes" },
    { "id": "d-ch4", "name": "Launrent perrier B rut", "price": "", "tablePrice": "1200 DH", "category": "Champagnes" },
    { "id": "d-ch5", "name": "Launrent Perrier Rosè", "price": "", "tablePrice": "1800 DH", "category": "Champagnes" },

    { "id": "d-r1", "name": "Havana 7 Ans", "price": "80 DH", "tablePrice": "1200 DH", "category": "Rhum" },
    { "id": "d-r2", "name": "Bacardi Blanc", "price": "70 DH", "tablePrice": "1000 DH", "category": "Rhum" },

    { "id": "d-v1", "name": "Absolut Bleue", "price": "70 DH", "tablePrice": "1000 DH", "category": "Vodka" },
    { "id": "d-v2", "name": "Ciroc", "price": "80 DH", "tablePrice": "1200 DH", "category": "Vodka" },
    { "id": "d-v3", "name": "Belvedere", "price": "80 DH", "tablePrice": "1200 DH", "category": "Vodka" },

    { "id": "d-g1", "name": "Beefeater", "price": "70 DH", "tablePrice": "1000 DH", "category": "Gin" },
    { "id": "d-g2", "name": "Bombay Original", "price": "80 DH", "tablePrice": "1200 DH", "category": "Gin" },
    { "id": "d-g3", "name": "Hendrinck's", "price": "80 DH", "tablePrice": "1200 DH", "category": "Gin" },
    { "id": "d-g4", "name": "Tanqueray", "price": "80 DH", "tablePrice": "1200 DH", "category": "Gin" },
    { "id": "d-g5", "name": "Gordon's", "price": "70 DH", "tablePrice": "1000 DH", "category": "Gin" },

    { "id": "d-w1", "name": "Ballantine's Finest", "price": "70 DH", "tablePrice": "1000 DH", "category": "Whisky" },
    { "id": "d-w2", "name": "Chivas 12ans", "price": "80 DH", "tablePrice": "1200 DH", "category": "Whisky" },
    { "id": "d-w3", "name": "Jack daniel's", "price": "80 DH", "tablePrice": "1200 DH", "category": "Whisky" },
    { "id": "d-w4", "name": "Jack daniel's Honney", "price": "80 DH", "tablePrice": "1200 DH", "category": "Whisky" },
    { "id": "d-w5", "name": "Red Label", "price": "70 DH", "tablePrice": "1000 DH", "category": "Whisky" },
    { "id": "d-w6", "name": "Black Label", "price": "80 DH", "tablePrice": "1200 DH", "category": "Whisky" },

    { "id": "d-ca1", "name": "Melon Tomic", "price": "100 DH", "tablePrice": "", "category": "Cocktails Alcoolisès" },
    { "id": "d-ca2", "name": "Pink Lady", "price": "100 DH", "tablePrice": "", "category": "Cocktails Alcoolisès" },
    { "id": "d-ca3", "name": "Aloha a la Vanille", "price": "100 DH", "tablePrice": "", "category": "Cocktails Alcoolisès" },
    { "id": "d-ca4", "name": "Blue hawaiian", "price": "100 DH", "tablePrice": "", "category": "Cocktails Alcoolisès" },
    { "id": "d-ca5", "name": "Lynchburg Lemonad", "price": "100 DH", "tablePrice": "", "category": "Cocktails Alcoolisès" },
    { "id": "d-ca6", "name": "Elevenses", "price": "100 DH", "tablePrice": "", "category": "Cocktails Alcoolisès" },
    { "id": "d-ca7", "name": "El Ouahabi 87", "price": "100 DH", "tablePrice": "", "category": "Cocktails Alcoolisès" },
    { "id": "d-ca8", "name": "Zaaroura 42", "price": "100 DH", "tablePrice": "", "category": "Cocktails Alcoolisès" },

    { "id": "d-csa1", "name": "Pina Moclada", "price": "100 DH", "tablePrice": "", "category": "Cocktails sans Alcoolisès" },
    { "id": "d-csa2", "name": "Kiwi Cruch", "price": "100 DH", "tablePrice": "", "category": "Cocktails sans Alcoolisès" },
    { "id": "d-csa3", "name": "Limonade a la Franboise", "price": "100 DH", "tablePrice": "", "category": "Cocktails sans Alcoolisès" },
    { "id": "d-csa4", "name": "Fleur D'Amour", "price": "100 DH", "tablePrice": "", "category": "Cocktails sans Alcoolisès" },
    { "id": "d-csa5", "name": "Lynchburg Lemonade", "price": "100 DH", "tablePrice": "", "category": "Cocktails sans Alcoolisès" },
    { "id": "d-csa6", "name": "Rémy Martin VSOP", "price": "100 DH", "tablePrice": "", "category": "Cocktails sans Alcoolisès" }
];

fs.writeFileSync(p, JSON.stringify(data, null, 2));
console.log('Successfully updated data.json');
