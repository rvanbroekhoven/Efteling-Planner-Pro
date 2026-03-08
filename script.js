const API_URL = "https://api.allorigins.win/raw?url=https://queue-times.com/parks/160/queue_times.json";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast?latitude=51.65&longitude=5.05&current_weather=true";

let attractieData = [
    { id: 1, name: "Joris en de Draak", wait: 20, status: "Open", rijk: "Ruigrijk", img: "joris-en-de-draak.png" },
    { id: 2, name: "Symbolica", wait: 15, status: "Open", rijk: "Fantasierijk", img: "symbolica.png" },
    { id: 3, name: "Droomvlucht", wait: 15, status: "Open", rijk: "Marerijk", img: "droomvlucht.png" },
    { id: 4, name: "Danse Macabre", wait: 13, status: "Open", rijk: "Anderrijk", img: "danse-macabre.png" },
    { id: 5, name: "Python", wait: 10, status: "Open", rijk: "Ruigrijk", img: "python.png" },
    { id: 6, name: "Vogel Rok", wait: 15, status: "Open", rijk: "Reizenrijk", img: "vogel-rok.png" },
    { id: 7, name: "Baron 1898", wait: 0, status: "Onderhoud", rijk: "Ruigrijk", img: "baron-1898.png" },
    { id: 8, name: "De Vliegende Hollander", wait: 0, status: "Onderhoud", rijk: "Ruigrijk", img: "de-vliegende-hollander.png" },
    { id: 9, name: "Sprookjesbos", wait: 5, status: "Open", rijk: "Marerijk", img: "sprookjesbos.png" },
    { id: 10, name: "Carnaval Festival", wait: 5, status: "Open", rijk: "Reizenrijk", img: "carnaval-festival.png" },
    { id: 11, name: "Monorail", wait: 5, status: "Open", rijk: "Reizenrijk", img: "monorail.png" },
    { id: 12, name: "Fata Morgana", wait: 10, status: "Open", rijk: "Anderrijk", img: "fata-morgana.png" },
    { id: 13, name: "Gondoletta", wait: 5, status: "Open", rijk: "Reizenrijk", img: "gondoletta.png" },
    { id: 14, name: "Halve Maen", wait: 5, status: "Open", rijk: "Ruigrijk", img: "halve-maen.png" },
    { id: 15, name: "Max & Moritz", wait: 15, status: "Open", rijk: "Anderrijk", img: "max-en-moritz.png" },
    { id: 16, name: "Pagode", wait: 5, status: "Open", rijk: "Reizenrijk", img: "pagode.png" },
    { id: 17, name: "Piraña", wait: 0, status: "Onderhoud", rijk: "Anderrijk", img: "pirana.png" },
    { id: 18, name: "Stoomcarrousel", wait: 5, status: "Open", rijk: "Marerijk", img: "stoomcarrousel.png" },
    { id: 19, name: "Villa Volta", wait: 10, status: "Open", rijk: "Marerijk", img: "villa-volta.png" }
];

const sprookjesRoute = [
    { naam: "Doornroosje", wandeltijd: 0 },
    { naam: "Kabouterdorp", wandeltijd: 3 },
    { naam: "Langnek", wandeltijd: 2 },
    { naam: "Roodkapje", wandeltijd: 4 },
    { naam: "Pinokkio", wandeltijd: 2 },
    { naam: "Hans en Grietje", wandeltijd: 3 },
    { naam: "Indische Waterlelies", wandeltijd: 5 }
];

let prioriteiten = JSON.parse(localStorage.getItem('eftelingPrio')) || {};
let voltooid = new Set(JSON.parse(localStorage.getItem('eftelingVoltooid')) || []);
let activeView = localStorage.getItem('eftelingView') || 'attracties';

function save() {
    localStorage.setItem('eftelingPrio', JSON.stringify(prioriteiten));
    localStorage.setItem('eftelingVoltooid', JSON.stringify(Array.from(voltooid)));
    localStorage.setItem('eftelingView', activeView);
}

// 🌤️ LIVE WEER
async function updateWeather() {
    try {
        const response = await fetch(WEATHER_API);
        if (!response.ok) throw new Error("Weer data niet bereikbaar");
        const data = await response.json();
        
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;
        
        let emoji = "☁️";
        if (code === 0) emoji = "☀️"; 
        else if (code === 1 || code === 2) emoji = "⛅"; 
        else if (code === 3) emoji = "☁️"; 
        else if (code >= 45 && code <= 48) emoji = "🌫️"; 
        else if (code >= 51 && code <= 67) emoji = "🌧️"; 
        else if (code >= 71 && code <= 77) emoji = "🌨️"; 
        else if (code >= 80 && code <= 82) emoji = "🌦️"; 
        else if (code >= 95) emoji = "⛈️"; 

        document.getElementById('weather-info').innerText = `${emoji} ${temp}°C`;
    } catch (e) {
        document.getElementById('weather-info').innerText = "⛅ --°C";
    }
}

// 🎢 LIVE WACHTTIJDEN
async function updateWachttijden() {
    document.getElementById('last-update').innerText = "VERVERSEN...";
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Netwerkfout");
        const data = await response.json();
        
        if (data && data.lands) {
            data.lands.forEach(land => {
                land.rides.forEach(ride => {
                    let match = attractieData.find(a => ride.name.includes(a.name) || a.name.includes(ride.name));
                    if (match) {
                        match.wait = ride.wait_time;
                        match.status = ride.is_open ? "Open" : "Gesloten";
                    }
                });
            });
            document.getElementById('last-update').innerText = "● LIVE " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
    } catch (e) {
        document.getElementById('last-update').innerText = "OFFLINE";
    } finally {
        toonLijst();
        if (activeView === 'plan') berekenOptimalePlan(false);
    }
}

function toonLijst() {
    const container = document.getElementById('rollercoasters-container');
    container.innerHTML = "";
    
    let gesorteerdeAttracties = [...attractieData].sort((a, b) => a.name.localeCompare(b.name));
    
    gesorteerdeAttracties.forEach(item => {
        const p = prioriteiten[item.id] || 0;
        const isGedaan = voltooid.has(item.id);
        const isDicht = item.status === "Gesloten" || item.status === "Onderhoud";
        
        // VILLA VOLTA: Zet de speciale class aan
        const isVillaVolta = item.id === 19 ? "upside-down" : "";
        
        let sterren = "";
        for(let i=1; i<=5; i++) {
            sterren += `<span class="star ${i<=p?'active':''}" onclick="${isDicht ? '' : `setPriority(${item.id},${i})`}">★</span>`;
        }
        
        container.innerHTML += `
            <div class="card ${isDicht ? 'onderhoud' : ''} ${isVillaVolta}" style="${isGedaan?'opacity:0.5':''}">
                <div class="card-img" style="background-image: url('${item.img}');"></div>
                <div class="card-content">
                    <span class="wait-badge" style="${isDicht ? 'background:#555;' : ''}">${!isDicht ? item.wait + ' min' : 'DICHT'}</span>
                    <h3>${item.name}</h3>
                    <p>${item.rijk}</p>
                    <div class="star-rating">${sterren}</div>
                </div>
            </div>`;
    });
}

function setPriority(id, val) {
    prioriteiten[id] = (prioriteiten[id] === val) ? 0 : val;
    voltooid.delete(id); 
    save();
    toonLijst();
}

function wisPrioriteiten() {
    if(confirm("Weet je zeker dat je alle sterren wilt wissen?")) {
        prioriteiten = {};
        voltooid.clear(); 
        save();
        toonLijst();
    }
}

function switchView(v) {
    activeView = v;
    save();
    ['attracties','plan','sprookjes'].forEach(id => document.getElementById(id+'-view').style.display = 'none');
    document.getElementById(v+'-view').style.display = 'block';
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('nav-' + v).classList.add('active');

    const titels = { 'attracties': 'Mijn Prioriteiten', 'plan': 'Jouw Dagplan', 'sprookjes': 'Sprookjesbos' };
    document.getElementById('view-title').innerText = titels[v];

    if(v === 'sprookjes') toonSprookjes();
    if(v === 'plan') berekenOptimalePlan(false);
    window.scrollTo(0,0);
}

function berekenOptimalePlan(switchAfter = true) {
    let lijst = attractieData.filter(a => prioriteiten[a.id] > 0 && a.status === "Open" && !voltooid.has(a.id));
    if(lijst.length === 0 && switchAfter) return alert("Kies eerst attracties uit de lijst!");

    if(lijst.length > 0) {
        lijst.sort((a,b) => (prioriteiten[b.id]*40 - b.wait) - (prioriteiten[a.id]*40 - a.wait));
        const top = lijst[0];
        document.getElementById('next-step-container').innerHTML = `
            <div class="plan-header-card">
                <span class="badge">NU DOEN</span>
                <div class="top-attraction-name">${top.name}</div>
                <div style="font-size:28px; color:var(--efteling-gold); font-weight:900; margin: 10px 0;">${top.wait} MIN</div>
                <p style="font-size:13px; font-weight:700; color:#888; margin-bottom:15px;">Locatie: ${top.rijk}</p>
                <button onclick="markAsDone(${top.id})" class="done-btn">✓ Bezocht</button>
            </div>`;
        document.getElementById('route-container').innerHTML = lijst.slice(1).map(a => `
            <div class="card" style="margin: 8px 15px; opacity:0.85; transform:scale(0.96)">
                <div class="card-content">
                    <h3>${a.name}</h3>
                    <p style="margin:5px 0 0 0; color: #666; font-size: 13px; font-weight:700;">Verwachte wachttijd: ${a.wait} min</p>
                </div>
            </div>`).join('');
    } else {
        document.getElementById('next-step-container').innerHTML = `<div class="plan-header-card"><div class="top-attraction-name">Alles bezocht! 🏰</div><p style="font-weight:700; color:#888;">Tijd voor een snack.</p></div>`;
        document.getElementById('route-container').innerHTML = "";
    }
    if(switchAfter) switchView('plan');
}

function markAsDone(id) {
    voltooid.add(id); save(); berekenOptimalePlan(false); toonLijst();
}

function toonSprookjes() {
    const c = document.getElementById('sprookjes-route-container');
    let totalTime = 0;
    c.innerHTML = sprookjesRoute.map((s,i) => {
        totalTime += s.wandeltijd;
        return `<div class="route-step">
            <div class="step-num">${i+1}</div>
            <div>
                <strong style="font-size: 16px; font-weight:800; color:var(--efteling-blue);">${s.naam}</strong>
                <div class="walk-time" style="font-weight:600; font-size:12px;">🚶 ${s.wandeltijd === 0 ? 'Startpunt' : s.wandeltijd + ' min wandelen vanaf vorige'}</div>
            </div>
        </div>`;
    }).join('');
    document.getElementById('sprookjes-stats').innerText = `Totale wandeling: ca. ${totalTime + 20} min`;
}

function resetData() { if(confirm("Weet je het zeker? Alles wordt gewist.")) { localStorage.clear(); location.reload(); } }

window.onload = () => {
    toonLijst(); 
    updateWeather(); 
    updateWachttijden(); 
    setInterval(updateWachttijden, 60000); 
    setInterval(updateWeather, 1800000); 
    switchView(activeView);
};