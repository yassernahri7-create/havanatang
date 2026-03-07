const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(p, 'utf8'));

if (data.carta && data.carta.drinks) {
    data.carta.drinks.forEach(d => {
        if (!d.category) {
            d.category = 'Otros'; // Default category
        }
    });
}

fs.writeFileSync(p, JSON.stringify(data, null, 2));
console.log('Fixed missing categories in data.json');
