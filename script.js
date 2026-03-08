const API_URL = "https://api.allorigins.win/raw?url=https://queue-times.com/parks/160/queue_times.json";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast?latitude=51.65&longitude=5.05&current_weather=true";

const basisWachttijden = { 1: 35, 2: 45, 3: 40, 4: 50, 5: 30, 6: 25, 7: 45, 8: 40, 9: 0, 10: 20, 11: 10, 12: 25, 13: 15, 14: 10, 15: 30, 16: 10, 17: 30, 18: 5, 19: 20 };

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

// De Master Lijst van alle sprookjes en hun looptijd vanaf de vorige
const masterSprookjes = [
    { id: "sp1", naam: "Doornroosje", wandelTijdVanafVorig: 0 },
    { id: "sp2", naam: "Kabouterdorp", wandelTijdVanafVorig: 3 },
    { id: "sp3", naam: "Langnek", wandelTijdVanafVorig: 2 },
    { id: "sp4", naam: "Roodkapje", wandelTijdVanafVorig: 4 },
    { id: "sp5", naam: "Pinokkio", wandelTijdVanafVorig: 2 },
    { id: "sp6", naam: "De Trollenkoning", wandelTijdVanafVorig: 2 },
    { id: "sp7", naam: "Raponsje", wandelTijdVanafVorig: 1 },
    { id: "sp8", naam: "De Kleine Zeemeermin", wandelTijdVanafVorig: 2 },
    { id: "sp9", naam: "Draak Lichtgeraakt", wandelTijdVanafVorig: 2 },
    { id: "sp10", naam: "De Wolf en de Zeven Geitjes", wandelTijdVanafVorig: 2 },
    { id: "sp11", naam: "Hans en Grietje", wandelTijdVanafVorig: 2 },
    { id: "sp12", naam: "Vrouw Holle", wandelTijdVanafVorig: 2 },
    { id: "sp13", naam: "Sneeuwwitje", wandelTijdVanafVorig: 3 },
    { id: "sp14", naam: "De Zes Zwanen", wandelTijdVanafVorig: 2 },
    { id: "sp15", naam: "Assepoester", wandelTijdVanafVorig: 2 },
    { id: "sp16", naam: "Sprookjesboom", wandelTijdVanafVorig: 3 },
    { id: "sp17", naam: "De Vliegende Fakir", wandelTijdVanafVorig: 1 },
    { id: "sp18", naam: "Indische Waterlelies", wandelTijdVanafVorig: 3 }
];

// Opgeslagen data
let prioriteiten = JSON.parse(localStorage.getItem('eftelingPrio')) || {};
let voltooid = new Set(JSON.parse(localStorage.getItem('eftelingVoltooid')) || []);
let activeView = localStorage.getItem('eftelingView') || 'attracties';
// Als er nog geen sprookjes zijn gekozen, gebruik deze default lijst
let selectedSprookjes = JSON.parse(localStorage.getItem('eftelingSprookjes')) || ["sp1", "sp2", "sp3", "sp4", "sp5", "sp11", "sp18"];

function save() {
    localStorage.setItem('eftelingPrio', JSON.stringify(prioriteiten));
    localStorage.setItem('eftelingVoltooid', JSON.stringify(Array.from(voltooid)));
    localStorage.setItem('eftelingView', activeView);
    localStorage.setItem('eftelingSprookjes', JSON.stringify(selectedSprookjes));
}

// 🌤️ LIVE WEER
async function updateWeather() {
    try {
        const response = await fetch(WEATHER_API);
        const data = await response.json();
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;
        let emoji = "☁️";
        if (code === 0) emoji = "☀️"; else if (code <= 2) emoji = "⛅"; else if (code <= 48) emoji = "🌫️"; else if (code <= 67) emoji = "🌧️"; else if (code <= 77) emoji = "🌨️"; else if (code <= 82) emoji = "🌦️"; else emoji = "⛈️"; 
        document.getElementById('weather-info').innerText = `${emoji} ${temp}°C`;
    } catch (e) { document.getElementById('weather-info').innerText = "⛅ --°C"; }
}

// 🧠 SIMULATIE
function genereerSimulatieTijden() {
    const nu = new Date(), uur = nu.getHours(), dag = nu.getDay();
    let factor = 1.0;
    if (dag === 0 || dag === 6) factor += 0.3; 
    if (uur < 10 || uur >= 18) factor *= 0.6; else if (uur >= 12 && uur <= 15) factor *= 1.3; 
    attractieData.forEach(a => {
        if (a.status !== "Onderhoud" && a.id !== 9) {
            let base = basisWachttijden[a.id] || 20;
            let random = Math.floor(Math.random() * 11) - 5; 
            a.wait = Math.round(Math.max(5, Math.round((base * factor) + random)) / 5) * 5; 
            a.status = "Open";
        }
    });
}

// 🎢 WACHTTIJDEN
async function updateWachttijden() {
    const ind = document.getElementById('last-update');
    ind.innerText = "VERVERSEN..."; ind.classList.remove("offline");
    genereerSimulatieTijden();
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Netwerkfout");
        const data = await response.json();
        if (data && data.lands) {
            data.lands.forEach(land => {
                land.rides.forEach(ride => {
                    let apiName = ride.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                    let match = attractieData.find(a => a.name.toLowerCase().replace(/[^a-z0-9]/g, '') === apiName);
                    if (match && match.id !== 9) { match.wait = ride.wait_time; match.status = ride.is_open ? "Open" : "Gesloten"; }
                });
            });
            ind.innerText = "● LIVE " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
    } catch (e) {
        ind.innerText = "● OFFLINE SIM"; ind.classList.add("offline");
    } finally {
        toonLijst(); if (activeView === 'plan') berekenOptimalePlan(false);
    }
}

function toonLijst() {
    const container = document.getElementById('rollercoasters-container');
    container.innerHTML = "";
    [...attractieData].sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
        const p = prioriteiten[item.id] || 0, isGedaan = voltooid.has(item.id);
        const isDicht = item.status === "Gesloten" || item.status === "Onderhoud";
        const isVillaVolta = item.id === 19 ? "upside-down" : "";
        let sterren = "";
        for(let i=1; i<=5; i++) sterren += `<span class="star ${i<=p?'active':''}" onclick="${isDicht ? '' : `setPriority(${item.id},${i})`}">★</span>`;
        
        let waitDisplay = item.id === 9 ? "display: none;" : (isDicht ? "background:#555;" : "");
        
        container.innerHTML += `
            <div class="card ${isDicht ? 'onderhoud' : ''} ${isVillaVolta}" style="${isGedaan?'opacity:0.5':''}">
                <div class="card-img" style="background-image: url('${item.img}');"></div>
                <div class="card-content">
                    <span class="wait-badge" style="${waitDisplay}">${!isDicht ? item.wait + ' min' : 'DICHT'}</span>
                    <h3>${item.name}</h3><p class="rijk-tekst">${item.rijk}</p><div class="star-rating">${sterren}</div>
                </div>
            </div>`;
    });
}

function setPriority(id, val) { prioriteiten[id] = (prioriteiten[id] === val) ? 0 : val; voltooid.delete(id); save(); toonLijst(); }
function wisPrioriteiten() { if(confirm("Selectie wissen?")) { prioriteiten = {}; voltooid.clear(); save(); toonLijst(); } }

function switchView(v) {
    activeView = v; save();
    ['attracties','plan','sprookjes'].forEach(id => document.getElementById(id+'-view').style.display = 'none');
    document.getElementById(v+'-view').style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('nav-' + v).classList.add('active');
    document.getElementById('view-title').innerText = v === 'attracties' ? 'ATTRACTIES' : (v === 'plan' ? 'Jouw Dagplan' : 'Sprookjesbos');
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
        let wHtml = top.id === 9 ? `<div style="font-size:22px; color:var(--efteling-gold); font-weight:900; margin: 10px 0;">Geniet van het groen</div>` : `<div style="font-size:28px; color:var(--efteling-gold); font-weight:900; margin: 10px 0;">${top.wait} MIN</div>`;
        document.getElementById('next-step-container').innerHTML = `
            <div class="plan-header-card"><span class="badge">NU DOEN</span><div class="top-attraction-name">${top.name}</div>${wHtml}
            <p style="font-size:13px; font-weight:700; color:#888; margin-bottom:15px;">Locatie: ${top.rijk}</p><button onclick="markAsDone(${top.id})" class="done-btn">✓ Bezocht</button></div>`;
            
        document.getElementById('route-container').innerHTML = lijst.slice(1).map(a => `
            <div class="card" style="margin: 8px 15px; opacity:0.85; transform:scale(0.96)">
                <div class="card-content"><h3>${a.name}</h3><p style="margin:5px 0 0 0; color: #666; font-size: 13px; font-weight:700;">${a.id === 9 ? "Wandeling" : `Verwachte wachttijd: ${a.wait} min`}</p></div>
            </div>`).join('');
    } else {
        document.getElementById('next-step-container').innerHTML = `<div class="plan-header-card"><div class="top-attraction-name">Alles bezocht! 🏰</div><p style="font-weight:700; color:#888;">Tijd voor een snack.</p></div>`;
        document.getElementById('route-container').innerHTML = "";
    }
    if(switchAfter) switchView('plan');
}

function markAsDone(id) { voltooid.add(id); save(); berekenOptimalePlan(false); toonLijst(); }

/* 🍄 SPROOKJESBOS LOGICA */
function toonSprookjes() {
    const c = document.getElementById('sprookjes-route-container');
    let html = "", totalTime = 0, accuWalk = 0, count = 0;
    
    // Het magische algoritme: Bereken wandeltijd dynamisch obv overgeslagen sprookjes
    masterSprookjes.forEach((s) => {
        accuWalk += s.wandelTijdVanafVorig; // Tel stappen altijd op
        if(selectedSprookjes.includes(s.id)) {
            count++;
            totalTime += accuWalk;
            html += `
                <div class="route-step">
                    <div class="step-num">${count}</div>
                    <div>
                        <strong style="font-size: 16px; font-weight:800; color:var(--efteling-blue);">${s.naam}</strong>
                        <div class="walk-time" style="font-weight:600; font-size:12px;">🚶 ${count === 1 ? 'Startpunt' : accuWalk + ' min lopen'}</div>
                    </div>
                </div>`;
            accuWalk = 0; // Reset teller na render
        }
    });
    
    if(html === "") html = "<p style='text-align:center; color:#888; padding:20px;'>Geen sprookjes geselecteerd.</p>";
    c.innerHTML = html;
    document.getElementById('sprookjes-stats').innerText = `Totale wandeling: ca. ${totalTime + (count * 3)} min`; // Incl kijktijd
}

function openSprookjesModal() {
    const container = document.getElementById('modal-list');
    container.innerHTML = masterSprookjes.map(s => `
        <label class="sprookje-label">
            <input type="checkbox" value="${s.id}" ${selectedSprookjes.includes(s.id) ? 'checked' : ''}>
            ${s.naam}
        </label>
    `).join('');
    document.getElementById('sprookjes-modal').style.display = "flex";
}

function closeSprookjesModal() { document.getElementById('sprookjes-modal').style.display = "none"; }

function saveSprookjes() {
    const checkboxes = document.querySelectorAll('#modal-list input[type="checkbox"]:checked');
    selectedSprookjes = Array.from(checkboxes).map(cb => cb.value);
    save(); closeSprookjesModal(); toonSprookjes();
}

function resetData() { if(confirm("Weet je het zeker? Alles wordt gewist.")) { localStorage.clear(); location.reload(); } }

window.onload = () => {
    updateWeather(); updateWachttijden(); 
    setInterval(updateWachttijden, 60000); setInterval(updateWeather, 1800000); 
    switchView(activeView);
};