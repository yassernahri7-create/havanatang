const path = require('path');
const fs = require('fs');

const DATA_FILE = path.join(__dirname, 'data.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

const INITIAL_DATA = {
    events: [
        {
            id: 'ev-1',
            image: '',
            day: 'SUNDAY',
            date: 'DOMINGO 8 FEBRERO',
            details: 'ENTRADA LIBRE TODA LA NOCHE\nHAPPY HOUR DE 22H A 00H',
            musicBy: 'DJ MARTINEZ',
            themeColor: '#ff2d2d'
        },
        {
            id: 'ev-2',
            image: '',
            day: 'SATURDAY',
            date: 'SÁBADO 7 FEBRERO',
            details: 'ENTRADA LIBRE TODA LA NOCHE\nHAPPY HOUR DE 21H A 23H\nCOPAS 7,5€',
            musicBy: 'DJ MARTINEZ',
            themeColor: '#4f72ff'
        },
        {
            id: 'ev-3',
            image: '',
            day: 'FRIDAY',
            date: 'VIERNES 6 FEBRERO',
            details: 'ENTRADA LIBRE TODA LA NOCHE\nHAPPY HOUR DE 21H A 23H\nCOPAS 7€',
            musicBy: 'DJ MARTINEZ',
            themeColor: '#00f5ff'
        }
    ],
    carta: {
        drinks: [
            { id: 'd-1', name: 'Margarita Signature', price: '120 MAD', tablePrice: '2000 MAD', image: '', category: 'Cocktails' },
            { id: 'd-2', name: 'Piña Colada', price: '110 MAD', tablePrice: '1800 MAD', image: '', category: 'Cocktails' },
            { id: 'd-3', name: 'Jägermeister Shot', price: '80 MAD', tablePrice: '1500 MAD (Botella)', image: '', category: 'Shots' }
        ]
    },
    photos: [
        { id: 'p-1', type: 'image', src: 'https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&q=80', alt: 'Party' },
        { id: 'p-2', type: 'image', src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', alt: 'Drinks' },
        { id: 'p-3', type: 'image', src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', alt: 'Dance' },
        { id: 'p-4', type: 'image', src: 'https://images.unsplash.com/photo-1558317751-bc3ed6f85f72?w=800&q=80', alt: 'Vibe' }
    ]
};

if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
}
