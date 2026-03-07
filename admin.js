// Global error handling for easier debugging
window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.error('Window Error:', msg, url, lineNo, columnNo, error);
    alert('An unexpected error occurred. Please check the console or contact support. Error: ' + msg);
    return false;
};

let siteData = { events: [], carta: { drinks: [] }, photos: [], settings: {}, auth: {} };
let editingEventIndex = -1;
let editingCartaIndex = -1;
let editingPhotoIndex = -1;

// Check Login Status
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('havana_admin') === 'true') {
        document.getElementById('login-overlay').style.display = 'none';
        loadData();
    } else {
        document.getElementById('login-overlay').style.display = 'flex';
    }
});

function logout() {
    localStorage.removeItem('havana_admin');
    window.location.reload();
}

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-user').value;
    const password = document.getElementById('login-pass').value;

    console.log('Attempting login with:', { username, password });

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        console.log('Login response status:', res.status);
        const result = await res.json();
        console.log('Login response body:', result);

        if (res.ok) {
            localStorage.setItem('havana_admin', 'true');
            document.getElementById('login-overlay').style.display = 'none';
            loadData();
        } else {
            alert('Invalid credentials: ' + (result.error || 'Unknown error'));
        }
    } catch (err) {
        console.error('Login fetch error:', err);
        alert('Login failed: ' + err.message);
    }
}

async function loadData() {
    console.log('Fetching site data...');
    try {
        const res = await fetch('/api/data');
        if (!res.ok) throw new Error('Server returned ' + res.status);
        const data = await res.json();
        console.log('Raw data loaded:', data);

        // Robust initialization
        siteData = {
            events: data.events || [],
            carta: {
                drinks: (data.carta && data.carta.drinks) ? data.carta.drinks : []
            },
            photos: data.photos || [],
            settings: data.settings || {},
            auth: data.auth || {}
        };

        console.log('Normalized siteData:', siteData);
        renderAll();
    } catch (err) {
        console.error('Error loading data:', err);
        alert('Could not load data from server: ' + err.message);
    }
}

function renderAll() {
    console.log('Rendering all sections...');
    try {
        renderEvents();
        renderCarta();
        renderPhotos();
        // Populate settings form fields
        if (siteData.settings) {
            document.getElementById('set-tiktok').value = siteData.settings.tiktok || '';
            document.getElementById('set-insta').value = siteData.settings.instagram || '';
            document.getElementById('set-fb').value = siteData.settings.facebook || '';
            document.getElementById('set-wa').value = siteData.settings.whatsapp || '';
            document.getElementById('set-phone').value = siteData.settings.phone || '';
        }

        if (siteData.auth) {
            document.getElementById('set-user').value = siteData.auth.username || 'admin';
            document.getElementById('set-pass').value = siteData.auth.password || '';
        }
    } catch (e) {
        console.error('Render error:', e);
    }
}

function switchTab(e, tabId) {
    if (!e || !e.currentTarget) return;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    e.currentTarget.classList.add('active');
    const panel = document.getElementById('panel-' + tabId);
    if (panel) panel.classList.add('active');
}

async function uploadFile(fileInput) {
    if (!fileInput.files[0]) return '';
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    return data.url;
}

// EVENTS
function renderEvents() {
    const box = document.getElementById('events-list');
    if (!box) return;
    box.innerHTML = siteData.events.map((ev, i) => `
        <div class="item-row">
            ${ev.image ? `<img src="${ev.image}" class="img-preview" style="width: 60px; height: 80px; object-fit: cover; margin-right: 15px;">` : `<div style="width:60px;height:80px;background:#333;margin-right:15px;display:flex;align-items:center;justify-content:center;font-size:10px">No IMG</div>`}
            <div class="item-info">
                <strong style="font-size: 1.1rem; color: ${ev.themeColor || '#ff2d78'}">${ev.day || 'N/A'}</strong> - ${ev.date || 'No Date'}<br>
                <small style="white-space:pre-line; display:block; margin-top:5px; opacity:0.8">${ev.details || ''}</small>
                <div style="font-size: 0.8rem; margin-top: 5px; color: #00f5ff">Music: ${ev.musicBy || 'N/A'}</div>
            </div>
            <div class="item-actions">
                <button class="btn btn-edit" onclick="startEditEvent(${i})" style="background: #3498db; margin-right:5px;"><i class="fas fa-edit"></i></button>
                <button class="btn btn-delete" onclick="deleteEvent(${i})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function startEditEvent(index) {
    editingEventIndex = index;
    const ev = siteData.events[index];
    document.getElementById('ev-day').value = ev.day;
    document.getElementById('ev-date').value = ev.date;
    document.getElementById('ev-details').value = ev.details;
    document.getElementById('ev-music').value = ev.musicBy;
    document.getElementById('ev-color').value = ev.themeColor;

    const btn = document.querySelector('#form-event button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-save"></i> Update Event';
    btn.style.background = '#3498db';

    document.getElementById('form-event').scrollIntoView({ behavior: 'smooth' });
}

async function handleEventSubmit(e) {
    e.preventDefault();
    console.log('Submitting event form...');
    const btn = e.target.querySelector('button');
    const origText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    try {
        const fileInput = document.getElementById('ev-img');
        let imageUrl = '';

        if (fileInput && fileInput.files[0]) {
            imageUrl = await uploadFile(fileInput);
        }

        const eventData = {
            id: editingEventIndex > -1 ? siteData.events[editingEventIndex].id : 'ev-' + Date.now(),
            image: imageUrl || (editingEventIndex > -1 ? siteData.events[editingEventIndex].image : ''),
            day: (document.getElementById('ev-day').value || '').toUpperCase(),
            date: (document.getElementById('ev-date').value || '').toUpperCase(),
            details: document.getElementById('ev-details').value || '',
            musicBy: (document.getElementById('ev-music').value || '').toUpperCase(),
            themeColor: document.getElementById('ev-color').value || '#ff2d78'
        };

        if (editingEventIndex > -1) {
            siteData.events[editingEventIndex] = eventData;
            editingEventIndex = -1;
        } else {
            siteData.events.push(eventData);
        }

        e.target.reset();
        btn.innerHTML = '<i class="fas fa-plus"></i> Add Event';
        btn.style.background = '#ff2d78';
        renderEvents();
        console.log('Event added/updated successfully');
        await saveData(); // Auto-save to server
    } catch (err) {
        console.error('Submit error:', err);
        alert('Error saving event: ' + err.message);
        btn.innerHTML = origText;
    }
}

async function deleteEvent(index) {
    if (confirm('Delete this event?')) {
        siteData.events.splice(index, 1);
        renderEvents();
        await saveData();
    }
}

// CARTA
function renderCarta() {
    const box = document.getElementById('carta-list');
    if (!box) return;
    if (!siteData.carta || !siteData.carta.drinks) return;

    box.innerHTML = siteData.carta.drinks.map((d, i) => `
        <div class="item-row">
            ${d.image ? `<img src="${d.image}" class="img-preview" style="width: 50px; height: 50px; object-fit: cover; margin-right: 15px; border-radius: 50%;">` : '<div style="width:50px; height:50px; background:#333; margin-right:15px; border-radius:50%; display:flex; align-items:center; justify-content:center">🍸</div>'}
            <div class="item-info">
                <strong style="color: white">${d.name}</strong> <span style="background: rgba(0,245,255,0.1); color: #00f5ff; padding: 2px 6px; border-radius: 4px; font-size: 0.75em; margin-left: 5px">${d.category}</span><br>
                <span style="color: #ffd700; font-size: 0.9em;">Price: ${d.price || 'N/A'}</span> ${d.tablePrice ? `<span style="color: #ff2d78; font-size: 0.9em; margin-left: 10px">| VIP: ${d.tablePrice}</span>` : ''}
            </div>
            <div class="item-actions">
                <button class="btn btn-edit" onclick="startEditCarta(${i})" style="background: #3498db; margin-right:5px;"><i class="fas fa-edit"></i></button>
                <button class="btn btn-delete" onclick="deleteCarta(${i})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function startEditCarta(index) {
    editingCartaIndex = index;
    const d = siteData.carta.drinks[index];
    document.getElementById('crt-name').value = d.name;
    document.getElementById('crt-cat').value = d.category;
    document.getElementById('crt-price').value = d.price;
    document.getElementById('crt-table').value = d.tablePrice;

    const btn = document.querySelector('#form-carta button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-save"></i> Update Carta Item';
    btn.style.background = '#3498db';

    document.getElementById('form-carta').scrollIntoView({ behavior: 'smooth' });
}

async function handleCartaSubmit(e) {
    e.preventDefault();
    console.log('Submitting carta form...');
    const btn = e.target.querySelector('button');
    const origText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    try {
        const fileInput = document.getElementById('crt-img');
        let imageUrl = '';

        if (fileInput && fileInput.files[0]) {
            imageUrl = await uploadFile(fileInput);
        }

        const cartaData = {
            id: editingCartaIndex > -1 ? siteData.carta.drinks[editingCartaIndex].id : 'crt-' + Date.now(),
            image: imageUrl || (editingCartaIndex > -1 ? siteData.carta.drinks[editingCartaIndex].image : ''),
            name: document.getElementById('crt-name').value || '',
            category: document.getElementById('crt-cat').value || 'Cocktails',
            price: document.getElementById('crt-price').value || '',
            tablePrice: document.getElementById('crt-table').value || ''
        };

        if (editingCartaIndex > -1) {
            siteData.carta.drinks[editingCartaIndex] = cartaData;
            editingCartaIndex = -1;
        } else {
            siteData.carta.drinks.push(cartaData);
        }

        e.target.reset();
        btn.innerHTML = '<i class="fas fa-plus"></i> Add to Carta';
        btn.style.background = '#ff2d78';
        renderCarta();
        console.log('Carta item added/updated successfully');
        await saveData(); // Auto-save to server
    } catch (err) {
        console.error('Submit error:', err);
        alert('Error saving carta item: ' + err.message);
        btn.innerHTML = origText;
    }
}

async function deleteCarta(index) {
    if (confirm('Delete this drink?')) {
        siteData.carta.drinks.splice(index, 1);
        renderCarta();
        await saveData();
    }
}

// PHOTOS
function renderPhotos() {
    const box = document.getElementById('photos-list');
    box.innerHTML = siteData.photos.map((p, i) => `
        <div class="item-row">
            ${p.type === 'video'
            ? `<video src="${p.src}" style="width: 100px; height: 80px; object-fit: cover; margin-right: 15px;" muted></video>`
            : `<img src="${p.src}" class="img-preview" style="width: 100px; height: 80px; object-fit: cover; margin-right: 15px;">`}
            <div class="item-info">
                Type: ${p.type.toUpperCase()}
            </div>
            <div class="item-actions">
                <button class="btn btn-edit" onclick="startEditPhoto(${i})" style="background: #3498db; margin-right:5px;"><i class="fas fa-edit"></i></button>
                <button class="btn btn-delete" onclick="deletePhoto(${i})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function startEditPhoto(index) {
    editingPhotoIndex = index;
    const p = siteData.photos[index];

    document.getElementById('p-alt').value = p.alt || '';

    const btn = document.querySelector('#form-photo button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-save"></i> Update Gallery Item';
    btn.style.background = '#3498db';

    document.getElementById('form-photo').scrollIntoView({ behavior: 'smooth' });
}

async function handlePhotoSubmit(e) {
    e.preventDefault();
    console.log('Submitting photo form...');
    const btn = e.target.querySelector('button');
    const origText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';

    try {
        const fileInput = document.getElementById('p-file');
        let mediaUrl = '';

        if (fileInput && fileInput.files[0]) {
            mediaUrl = await uploadFile(fileInput);
        } else if (editingPhotoIndex > -1) {
            mediaUrl = siteData.photos[editingPhotoIndex].src;
        } else {
            throw new Error('Please select a file to upload');
        }

        const file = fileInput.files[0];
        const isVideo = file ? file.type.startsWith('video/') : (editingPhotoIndex > -1 ? siteData.photos[editingPhotoIndex].type === 'video' : false);

        const photoData = {
            id: editingPhotoIndex > -1 ? siteData.photos[editingPhotoIndex].id : 'p-' + Date.now(),
            type: isVideo ? 'video' : 'image',
            src: mediaUrl,
            alt: document.getElementById('p-alt').value || 'Gallery Media'
        };

        if (editingPhotoIndex > -1) {
            siteData.photos[editingPhotoIndex] = photoData;
            editingPhotoIndex = -1;
        } else {
            siteData.photos.push(photoData);
        }

        e.target.reset();
        btn.innerHTML = '<i class="fas fa-plus"></i> Add to Gallery';
        btn.style.background = '#ff2d78';
        renderPhotos();
        console.log('Media added/updated successfully');
        await saveData(); // Auto-save to server
    } catch (err) {
        console.error('Submit error:', err);
        alert('Error saving media: ' + err.message);
        btn.innerHTML = origText;
    }
}

async function handleSettingsSubmit(e) {
    e.preventDefault();
    console.log('Saving settings...');
    const btn = e.target.querySelector('button');
    const origText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

    if (!siteData.settings) siteData.settings = {};

    siteData.settings.tiktok = document.getElementById('set-tiktok').value;
    siteData.settings.instagram = document.getElementById('set-insta').value;
    siteData.settings.facebook = document.getElementById('set-fb').value;
    siteData.settings.whatsapp = document.getElementById('set-wa').value;
    siteData.settings.phone = document.getElementById('set-phone').value;

    try {
        await saveData();
        btn.innerHTML = origText;
    } catch (err) {
        btn.innerHTML = origText;
        alert('Error saving settings: ' + err.message);
    }
}

async function handleAuthSubmit(e) {
    e.preventDefault();
    if (!confirm('Are you sure you want to change the admin login credentials?')) return;

    const btn = e.target.querySelector('button');
    const origText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';

    if (!siteData.auth) siteData.auth = {};

    siteData.auth.username = document.getElementById('set-user').value;
    siteData.auth.password = document.getElementById('set-pass').value;

    try {
        await saveData();
        btn.innerHTML = origText;
        alert('Credentials updated successfully. Please keep them safe!');
    } catch (err) {
        btn.innerHTML = origText;
        alert('Error updating credentials: ' + err.message);
    }
}

async function deletePhoto(index) {
    if (confirm('Delete this media?')) {
        siteData.photos.splice(index, 1);
        renderPhotos();
        await saveData();
    }
}

async function saveData() {
    const btn = document.getElementById('save-all');
    if (!btn) return;
    const origText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SAVING ALL CHANGES...';
    btn.disabled = true;

    try {
        const res = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(siteData)
        });

        if (!res.ok) throw new Error('Server returned ' + res.status);

        btn.innerHTML = origText;
        btn.disabled = false;

        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = 'Website updated successfully!';
            toast.style.background = '#2ecc71';
            toast.style.opacity = '1';
            setTimeout(() => toast.style.opacity = '0', 3000);
        }
    } catch (err) {
        console.error('Save error:', err);
        alert('CRITICAL ERROR: Could not save changes to the website! ' + err.message);
        btn.innerHTML = origText;
        btn.disabled = false;
    }
}

// Start loading if already logged in (checked by DOMContentLoaded above)
// loadData(); // Handled by handleLogin or DOMContentLoaded

