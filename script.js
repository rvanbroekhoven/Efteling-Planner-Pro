const API_URL = "https://api.allorigins.win/raw?url=https://queue-times.com/parks/160/queue_times.json";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast?latitude=51.65&longitude=5.05&current_weather=true";

// Basis data voor de offline simulatie-motor
const basisWachttijden = {
    1: 35, 2: 45, 3: 40, 4: 50, 5: 30, 6: 25, 7: 45, 8: 40, 
    9: 0, 10: 20, 11: 10, 12: 25, 13: 15, 14: 10, 15: 30, 
    16: 10, 17: 30, 18: 5, 19: 20
};

let attractieData = [
    { id: 1, name: "Joris en de Draak", wait: 0, status: "Open", rijk: "Ruigrijk", img: "joris-en-de-draak.png" },
    { id: 2, name: "Symbolica", wait: 0, status: "Open", rijk: "Fantasierijk", img: "symbolica.png" },
    { id: 3, name: "Droomvlucht", wait: 0, status: "Open", rijk: "Marerijk", img: "droomvlucht.png" },
    { id: 4, name: "Danse Macabre", wait: 0, status: "Open", rijk: "Anderrijk", img: "danse-macabre.png" },
    { id: 5, name: "Python", wait: 0, status: "Open", rijk: "Ruigrijk", img: "python.png" },
    { id: 6, name: "Vogel Rok", wait: 0, status: "Open", rijk: "Reizenrijk", img: "vogel-rok.png" },
    { id: 7, name: "Baron 1898", wait: 0, status: "Onderhoud", rijk: "Ruigrijk", img: "baron-1898.png" },
    { id: 8, name: "De Vliegende Hollander", wait: 0, status: "Onderhoud", rijk: "Ruigrijk", img: "de-vliegende-hollander.png" },
    { id: 9, name: "Sprookjesbos", wait: 0, status: "Open", rijk: "Marerijk", img: "sprookjesbos.png" },
    { id: 10, name: "Carnaval Festival", wait: 0, status: "Open", rijk: "Reizenrijk", img: "carnaval-festival.png" },
    { id: 11, name: "Monorail", wait: 0, status: "Open", rijk: "Reizenrijk", img: "monorail.png" },
    { id: 12, name: "Fata Morgana", wait: 0, status: "Open", rijk: "Anderrijk", img: "fata-morgana.png" },
    { id: 13, name: "Gondoletta", wait: 0, status: "Open", rijk: "Reizenrijk", img: "gondoletta.png" },
    { id: 14, name: "Halve Maen", wait: 0, status: "Open", rijk: "Ruigrijk", img: "halve-maen.png" },
    { id: 15, name: "Max & Moritz", wait: 0, status: "Open", rijk: "Anderrijk", img: "max-en-moritz.png" },
    { id: 16, name: "Pagode", wait: 0, status: "Open", rijk: "Reizenrijk", img: "pagode.png" },
    { id: 17, name: "Piraña", wait: 0, status: "Onderhoud", rijk: "Anderrijk", img: "pirana.png" },
    { id: 18, name: "Stoomcarrousel", wait: 0, status: "Open", rijk: "Marerijk", img: "stoomcarrousel.png" },
    { id: 19, name: "Villa Volta", wait: 0, status: "Open", rijk: "Marerijk", img: "villa-volta.png" }
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
        if (!response.ok) throw new Error("Weer data fail");
        const data = await response.json();
        
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;
        
        let emoji = "☁️";
        if (code === 0) emoji = "☀️"; 
        else if (code <= 2) emoji = "⛅"; 
        else if (code === 3) emoji = "☁️"; 
        else if (code <= 48) emoji = "🌫️"; 
        else if (code <= 67) emoji = "🌧️"; 
        else if (code <= 77) emoji = "🌨️"; 
        else if (code <= 82) emoji = "🌦️"; 
        else emoji = "⛈️"; 

        document.getElementById('weather-info').innerText = `${emoji} ${temp}°C`;
    } catch (e) {
        document.getElementById('weather-info').innerText = "⛅ --°C";
    }
}

// 🧠 SLIMME SIMULATIE
function genereerSimulatieTijden() {
    const nu = new Date();
    const uur = nu.getHours();
    const dag = nu.getDay(); // 0 = Zondag, 6 = Zaterdag

    let drukteFactor = 1.0;
    if (dag === 0 || dag === 6) drukteFactor += 0.3; // Weekend
    if (uur < 10 || uur >= 18) drukteFactor *= 0.6; // Ochtend/avond
    else if (uur >= 12 && uur <= 15) drukteFactor *= 1.3; // Piekuren

    attractieData.forEach(a => {
        if (a.status !== "Onderhoud" && a.id !== 9) { // 9 = Sprookjesbos
            let base = basisWachttijden[a.id] || 20;
            let random = Math.floor(Math.random() * 11) - 5; 
            let gesimuleerd = Math.max(5, Math.round((base * drukteFactor) + random));
            a.wait = Math.round(gesimuleerd / 5) * 5; 
            a.status = "Open";
        }
    });
}

// 🎢 LIVE WACHTTIJDEN MET FALLBACK & EXACT MATCH
async function updateWachttijden() {
    const indicator = document.getElementById('last-update');
    indicator.innerText = "VERVERSEN...";
    indicator.classList.remove("offline");

    // 1. Zorg altijd voor een gesimuleerd "Vangnet"
    genereerSimulatieTijden();

    // 2. Probeer echte data op te halen
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Netwerkfout");
        const data = await response.json();
        
        if (data && data.lands) {
            data.lands.forEach(land => {
                land.rides.forEach(ride => {
                    // DE OPLOSSING: Een 100% exacte match voorkomt dat Single-Rider overschrijft!
                    let apiName = ride.name.toLowerCase().trim();
                    let match = attractieData.find(a => a.name.toLowerCase().trim() === apiName);

                    if (match && match.id !== 9) { // Nooit wachttijd voor Sprookjesbos
                        match.wait = ride.wait_time;
                        match.status = ride.is_open ? "Open" : "Gesloten";
                    }
                });
            });
            indicator.innerText = "● LIVE " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
    } catch (e) {
        indicator.innerText = "● OFFLINE SIM";
        indicator.classList.add("offline");
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
        const isSprookjesbos = item.id === 9;
        const isVillaVolta = item.id === 19 ? "upside-down" : "";
        
        let sterren = "";
        for(let i=1; i<=5; i++) {
            sterren += `<span class="star ${i<=p?'active':''}" onclick="${isDicht ? '' : `setPriority(${item.id},${i})`}">★</span>`;
        }
        
        // Verberg de wachttijd badge volledig voor het Sprookjesbos
        let waitDisplay = isSprookjesbos ? "display: none;" : (isDicht ? "background:#555;" : "");
        let waitText = !isDicht ? item.wait + ' min' : 'DICHT';

        container.innerHTML += `
            <div class="card ${isDicht ? 'onderhoud' : ''} ${isVillaVolta}" style="${isGedaan?'opacity:0.5':''}">
                <div class="card-img" style="background-image: url('${item.img}');"></div>
                <div class="card-content">
                    <span class="wait-badge" style="${waitDisplay}">${waitText}</span>
                    <h3>${item.name}</h3>
                    <p class="rijk-tekst">${item.rijk}</p>
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
        
        let isSprookjesbos = top.id === 9;
        let wachttijdHtml = isSprookjesbos ? `<div style="font-size:22px; color:var(--efteling-gold); font-weight:900; margin: 10px 0;">Geniet van het groen</div>` : `<div style="font-size:28px; color:var(--efteling-gold); font-weight:900; margin: 10px 0;">${top.wait} MIN</div>`;

        document.getElementById('next-step-container').innerHTML = `
            <div class="plan-header-card">
                <span class="badge">NU DOEN</span>
                <div class="top-attraction-name">${top.name}</div>
                ${wachttijdHtml}
                <p style="font-size:13px; font-weight:700; color:#888; margin-bottom:15px;">Locatie: ${top.rijk}</p>
                <button onclick="markAsDone(${top.id})" class="done-btn">✓ Bezocht</button>
            </div>`;
            
        document.getElementById('route-container').innerHTML = lijst.slice(1).map(a => {
            let verwachtTekst = a.id === 9 ? "Wandeling" : `Verwachte wachttijd: ${a.wait} min`;
            return `
            <div class="card" style="margin: 8px 15px; opacity:0.85; transform:scale(0.96)">
                <div class="card-content">
                    <h3>${a.name}</h3>
                    <p style="margin:5px 0 0 0; color: #666; font-size: 13px; font-weight:700;">${verwachtTekst}</p>
                </div>
            </div>`;
        }).join('');
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
    updateWeather(); 
    updateWachttijden(); 
    setInterval(updateWachttijden, 60000); 
    setInterval(updateWeather, 1800000); 
    switchView(activeView);
};