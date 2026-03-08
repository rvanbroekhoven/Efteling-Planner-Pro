// Nieuwe, stabielere proxy via AllOrigins in de hoop dat Safari deze makkelijker toelaat
const API_URL = "https://api.allorigins.win/raw?url=https://queue-times.com/parks/160/queue_times.json";

let attractieData = [
    { id: 1, name: "Joris en de Draak", wait: 20, status: "Open" },
    { id: 2, name: "Symbolica", wait: 15, status: "Open" },
    { id: 3, name: "Droomvlucht", wait: 15, status: "Open" },
    { id: 4, name: "Danse Macabre", wait: 13, status: "Open" },
    { id: 5, name: "Python", wait: 10, status: "Open" },
    { id: 6, name: "Vogel Rok", wait: 15, status: "Open" },
    { id: 7, name: "Baron 1898", wait: 0, status: "Onderhoud" },
    { id: 8, name: "De Vliegende Hollander", wait: 0, status: "Onderhoud" },
    { id: 9, name: "Sprookjesbos", wait: 5, status: "Open" }
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
            // Tijd noteren als succesvol (zonder seconden om breedte klein te houden)
            document.getElementById('last-update').innerText = "● LIVE " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
    } catch (e) {
        console.warn("Kon live data niet ophalen door Safari blokkade of proxy limiet.", e);
        // Fallback tekst
        document.getElementById('last-update').innerText = "OFFLINE";
    } finally {
        toonLijst();
        if (activeView === 'plan') berekenOptimalePlan(false);
    }
}

function toonLijst() {
    const container = document.getElementById('rollercoasters-container');
    container.innerHTML = "";
    attractieData.forEach(item => {
        const p = prioriteiten[item.id] || 0;
        const isGedaan = voltooid.has(item.id);
        let sterren = "";
        for(let i=1; i<=5; i++) {
            sterren += `<span class="star ${i<=p?'active':''}" onclick="setPriority(${item.id},${i})">★</span>`;
        }
        container.innerHTML += `
            <div class="card" style="${isGedaan?'opacity:0.5':''}">
                <div class="card-img">${item.name[0]}</div>
                <div class="card-content">
                    <span class="wait-badge">${item.status === 'Open' ? item.wait + ' min' : 'DICHT'}</span>
                    <h3>${item.name}</h3>
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
                <div style="font-size:24px; color:var(--efteling-gold); font-weight:800;">${top.wait} MIN</div>
                <button onclick="markAsDone(${top.id})" class="done-btn">✓ Bezocht</button>
            </div>`;
        document.getElementById('route-container').innerHTML = lijst.slice(1).map(a => `
            <div class="card" style="opacity:0.85; transform:scale(0.96)">
                <div class="card-content"><h3>${a.name}</h3><p style="margin:5px 0 0 0; color: #666;">Verwachte wachttijd: ${a.wait} min</p></div>
            </div>`).join('');
    } else {
        document.getElementById('next-step-container').innerHTML = `<div class="plan-header-card"><div class="top-attraction-name">Alles bezocht! 🏰</div><p>Tijd voor een snack.</p></div>`;
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
                <strong style="font-family: 'Playfair Display', serif; font-size: 18px;">${s.naam}</strong>
                <div class="walk-time">🚶 ${s.wandeltijd === 0 ? 'Startpunt' : s.wandeltijd + ' min wandelen vanaf vorige'}</div>
            </div>
        </div>`;
    }).join('');
    document.getElementById('sprookjes-stats').innerText = `Totale wandeling: ca. ${totalTime + 20} min`;
}

function resetData() { if(confirm("Weet je het zeker? Alles wordt gewist.")) { localStorage.clear(); location.reload(); } }

// INITIALISATIE
window.onload = () => {
    toonLijst(); 
    updateWachttijden(); 
    setInterval(updateWachttijden, 60000);
    switchView(activeView);
};