// --- CONSTANTEN ---
const API_URL = "https://api.allorigins.win/raw?url=https://queue-times.com/parks/160/queue_times.json";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast?latitude=51.65&longitude=5.05&current_weather=true";

const basisWachttijden = { 
    1: 35, 2: 45, 3: 40, 4: 50, 5: 30, 6: 25, 7: 45, 8: 40, 
    9: 0, 10: 20, 11: 10, 12: 25, 13: 15, 14: 10, 15: 30, 
    16: 10, 17: 30, 18: 5, 19: 20 
};

// --- DATA: ATTRACTIES MET GPS (LAT/LNG) ---
let attractieData = [
    { id: 1, name: "Joris en de Draak", wait: 0, status: "Open", rijk: "Ruigrijk", img: "joris-en-de-draak.png", lat: 51.6473, lng: 5.0505,
      beschrijving: "Aanschouw, dappere reizigers! Een bloeddorstige draak teistert het koninkrijk...", duur: "2 min", feitjes: ["Zet je schrap! Jullie houten strijdwagen bereikt een topsnelheid van 75 km/u."] },
    { id: 2, name: "Symbolica", wait: 0, status: "Open", rijk: "Fantasierijk", img: "symbolica.png", lat: 51.6496, lng: 5.0438,
      beschrijving: "Welkom, edele gasten! Treed binnen in het fonkelende Paleis der Fantasie...", duur: "7 min", feitjes: ["Met een prijskaartje van €35 miljoen is dit de duurste attractie ooit gebouwd in de Efteling."] },
    { id: 3, name: "Droomvlucht", wait: 0, status: "Open", rijk: "Marerijk", img: "droomvlucht.png", lat: 51.6521, lng: 5.0416,
      beschrijving: "Sluit je ogen, droom zacht, en ontwaak in een wereld waar wonderen werkelijkheid zijn...", duur: "6 min", feitjes: ["In het mysterieuze Zompenwoud regent het echt."] },
    { id: 4, name: "Danse Macabre", wait: 0, status: "Open", rijk: "Anderrijk", img: "danse-macabre.png", lat: 51.6485, lng: 5.0417,
      beschrijving: "Wees gewaarschuwd, stervelingen... Hier weerklinkt een ijzingwekkend koor...", duur: "3 min", feitjes: ["Deze duistere attractie is gebouwd op de heilige grond van het oude Spookslot."] },
    { id: 5, name: "Python", wait: 0, status: "Open", rijk: "Ruigrijk", img: "python.png", lat: 51.6470, lng: 5.0520,
      beschrijving: "Kijk omhoog en huiver! Een gigantische stalen slang kronkelt door de bossen...", duur: "2 min", feitjes: ["Toen de Python in 1981 opende, was het de grootste achtbaan van Europa."] },
    { id: 6, name: "Vogel Rok", wait: 0, status: "Open", rijk: "Reizenrijk", img: "vogel-rok.png", lat: 51.6508, lng: 5.0475,
      beschrijving: "Treed binnen in het domein van Sindbad de Zeeman en sta oog in oog met Vogel Rok...", duur: "1,5 min", feitjes: ["Het standbeeld bij de ingang is volgens het Guinness Book de grootste vogel van Europa."] },
    { id: 7, name: "Baron 1898", wait: 0, status: "Onderhoud", rijk: "Ruigrijk", img: "baron-1898.png", lat: 51.6478, lng: 5.0487,
      beschrijving: "Kompels gezocht! Hoogmoedige mijnbaron Gustave Hooghmoed heeft goud gevonden...", duur: "2 min", feitjes: ["Tijdens de vrije val stort je maar liefst 37,5 meter verticaal naar beneden."] },
    { id: 8, name: "De Vliegende Hollander", wait: 0, status: "Onderhoud", rijk: "Ruigrijk", img: "de-vliegende-hollander.png", lat: 51.6475, lng: 5.0494,
      beschrijving: "De gierige kapitein Willem van der Decken bracht een eeuwige vloek over zijn schip...", duur: "3,5 min", feitjes: ["Het is een combinatie van een darkride, een achtbaan én een waterattractie."] },
    { id: 9, name: "Sprookjesbos", wait: 0, status: "Open", rijk: "Marerijk", img: "sprookjesbos.png", lat: 51.6500, lng: 5.0400,
      beschrijving: "Welkom in mijn betoverde bos, waar sprookjes voor eeuwig voortleven...", duur: "Zelf bepalen", feitjes: ["Dit is waar het allemaal begon: het bos opende in 1952 met slechts 10 sprookjes."] },
    { id: 10, name: "Carnaval Festival", wait: 0, status: "Open", rijk: "Reizenrijk", img: "carnaval-festival.png", lat: 51.6510, lng: 5.0485,
      beschrijving: "Reis in slechts een paar minuten de hele wereld rond! Neem plaats in een vrolijk karretje...", duur: "8 min", feitjes: ["Het extreem herkenbare deuntje is geschreven door Toon Hermans."] },
    { id: 11, name: "Monorail", wait: 0, status: "Open", rijk: "Reizenrijk", img: "monorail.png", lat: 51.6505, lng: 5.0480,
      beschrijving: "Stap in de charmante, kruipende slakkentreintjes en zweef kalmpjes over het Volk van Laaf...", duur: "12 min", feitjes: ["Elke houten slak waar je in zit heeft een eigen, uniek serienummer op zijn huisje."] },
    { id: 12, name: "Fata Morgana", wait: 0, status: "Open", rijk: "Anderrijk", img: "fata-morgana.png", lat: 51.6476, lng: 5.0440,
      beschrijving: "Vaar mee naar de Verboden Stad uit de legendarische vertellingen van 1001 Nacht...", duur: "8 min", feitjes: ["De zware paleisdeuren openen puur door de waterstroming van jouw boot!"] },
    { id: 13, name: "Gondoletta", wait: 0, status: "Open", rijk: "Reizenrijk", img: "gondoletta.png", lat: 51.6495, lng: 5.0465,
      beschrijving: "Laat de drukte van het park even achter je. Neem plaats in een overdekt bootje...", duur: "20 min", feitjes: ["Dit systeem is oorspronkelijk aangelegd om de boten van Fata Morgana te testen!"] },
    { id: 14, name: "Halve Maen", wait: 0, status: "Open", rijk: "Ruigrijk", img: "halve-maen.png", lat: 51.6482, lng: 5.0490,
      beschrijving: "Kies het ruime sop en trotseer de golven! Dit machtige VOC-schip deinst niet terug...", duur: "3 min", feitjes: ["Op zijn hoogste punt zwaait dit schip naar een hoek van maar liefst 180 graden."] },
    { id: 15, name: "Max & Moritz", wait: 0, status: "Open", rijk: "Anderrijk", img: "max-en-moritz.png", lat: 51.6488, lng: 5.0450,
      beschrijving: "Die dekselse kwajongens Max en Moritz hebben weer snode plannen! Raas mee...", duur: "2 min", feitjes: ["Deze vrolijke dubbele achtbaan is gebouwd op de locatie van de oude Bobsleebaan."] },
    { id: 16, name: "Pagode", wait: 0, status: "Open", rijk: "Reizenrijk", img: "pagode.png", lat: 51.6490, lng: 5.0460,
      beschrijving: "Verhef jezelf boven de bomen en ontdek het park zoals de vogels dat doen...", duur: "5 min", feitjes: ["Tijdens de piek van de vlucht bevind je je maar liefst 45 meter boven de grond."] },
    { id: 17, name: "Piraña", wait: 0, status: "Onderhoud", rijk: "Anderrijk", img: "pirana.png", lat: 51.6480, lng: 5.0460,
      beschrijving: "Durf jij de wildwaterrivier te trotseren? Neem plaats in een dobberend vlot...", duur: "5 min", feitjes: ["Toen de Piraña opende in 1983, was het de eerste wildwaterbaan van dit type ter wereld."] },
    { id: 18, name: "Stoomcarrousel", wait: 0, status: "Open", rijk: "Marerijk", img: "stoomcarrousel.png", lat: 51.6515, lng: 5.0425,
      beschrijving: "Stap terug in de tijd in dit warme, rijkversierde paleis van spiegels en lichtjes...", duur: "2 min", feitjes: ["De Efteling kocht deze unieke 19e-eeuwse kermismolen op in 1955."] },
    { id: 19, name: "Villa Volta", wait: 0, status: "Open", rijk: "Marerijk", img: "villa-volta.png", lat: 51.6525, lng: 5.0420,
      beschrijving: "Treed binnen in het weelderige huis van Hugo van den Loonsche Duynen. Niets is wat het lijkt...", duur: "10 min", feitjes: ["Een geheim: jij gaat helemaal niet over de kop! Alleen de muren van de kamer draaien rond."] }
];

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

// --- STATE MANAGEMENT ---
let prioriteiten = JSON.parse(localStorage.getItem('eftelingPrio')) || {};
let voltooid = new Set(JSON.parse(localStorage.getItem('eftelingVoltooid')) || []);
let activeView = localStorage.getItem('eftelingView') || 'attracties';
let selectedSprookjes = JSON.parse(localStorage.getItem('eftelingSprookjes')) || ["sp1", "sp2", "sp3", "sp4", "sp5", "sp11", "sp18"];
let currentRouteLijst = []; // Voor de Leaflet map

// --- MAP VARIABELEN ---
let map = null;
let markerLayer = null;
let routePolylineLayer = null;

function save() {
    localStorage.setItem('eftelingPrio', JSON.stringify(prioriteiten));
    localStorage.setItem('eftelingVoltooid', JSON.stringify(Array.from(voltooid)));
    localStorage.setItem('eftelingView', activeView);
    localStorage.setItem('eftelingSprookjes', JSON.stringify(selectedSprookjes));
}

// --- API FUNCTIES ---
async function updateWeather() {
    try {
        const response = await fetch(WEATHER_API);
        const data = await response.json();
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;
        
        let icon = "weer-bewolkt.png";
        if (code === 0) icon = "weer-zon.png"; 
        else if (code <= 2) icon = "weer-halfbewolkt.png"; 
        else if (code <= 48) icon = "weer-mist.png"; 
        else if (code <= 67) icon = "weer-regen.png"; 
        else if (code <= 77) icon = "weer-sneeuw.png"; 
        else if (code <= 82) icon = "weer-buien.png"; 
        else icon = "weer-onweer.png"; 
        
        document.getElementById('weather-info').innerHTML = `<img src="${icon}" class="weather-icon" alt="Weer"> ${temp}°C`;
    } catch (e) { 
        document.getElementById('weather-info').innerHTML = `<img src="weer-halfbewolkt.png" class="weather-icon" alt="Weer"> --°C`; 
    }
}

function genereerSimulatieTijden() {
    const nu = new Date();
    const uur = nu.getHours();
    const dag = nu.getDay();
    
    let factor = 1.0;
    if (dag === 0 || dag === 6) factor += 0.3; 
    if (uur < 10 || uur >= 18) factor *= 0.6; 
    else if (uur >= 12 && uur <= 15) factor *= 1.3; 
    
    attractieData.forEach(a => {
        if (a.status !== "Onderhoud" && a.id !== 9) {
            let base = basisWachttijden[a.id] || 20;
            let random = Math.floor(Math.random() * 11) - 5; 
            a.wait = Math.round(Math.max(5, Math.round((base * factor) + random)) / 5) * 5; 
            a.status = "Open";
        }
    });
}

async function updateWachttijden() {
    const ind = document.getElementById('last-update');
    ind.innerText = "VERVERSEN..."; 
    ind.classList.remove("offline");
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Netwerkfout");
        const data = await response.json();
        
        if (data && data.lands) {
            data.lands.forEach(land => {
                land.rides.forEach(ride => {
                    let apiName = ride.name.toLowerCase().trim();
                    let match = attractieData.find(a => a.name.toLowerCase().trim() === apiName);
                    if (match && match.id !== 9) { 
                        match.wait = ride.wait_time; 
                        match.status = ride.is_open ? "Open" : "Gesloten"; 
                    }
                });
            });
            ind.innerText = "● LIVE " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
    } catch (e) {
        ind.innerText = "● OFFLINE SIM"; 
        ind.classList.add("offline");
    } finally {
        toonLijst(); 
        if (activeView === 'plan') berekenOptimalePlan(false);
    }
}

// --- UI FUNCTIES ---
function toonLijst() {
    const container = document.getElementById('rollercoasters-container');
    container.innerHTML = "";
    
    const sortedData = [...attractieData].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedData.forEach(item => {
        const p = prioriteiten[item.id] || 0;
        const isGedaan = voltooid.has(item.id);
        const isDicht = item.status === "Gesloten" || item.status === "Onderhoud";
        const isVillaVolta = item.id === 19 ? "upside-down" : "";
        
        let sterren = "";
        for (let i = 1; i <= 5; i++) {
            let starImg = i <= p ? 'icon-ster-vol.png' : 'icon-ster-leeg.png';
            sterren += `<div class="star-icon" style="background-image: url('${starImg}');" onclick="${isDicht ? '' : `setPriority(${item.id},${i})`}"></div>`;
        }
        
        let waitDisplay = item.id === 9 ? "display: none;" : (isDicht ? "background:#555;" : "");
        
        container.innerHTML += `
            <div class="card ${isDicht ? 'onderhoud' : ''} ${isVillaVolta}" style="${isGedaan ? 'opacity:0.5' : ''}">
                <div class="card-img" style="background-image: url('${item.img}');" onclick="openAttractieModal(${item.id})"></div>
                <div class="card-content">
                    <span class="wait-badge" style="${waitDisplay}">${!isDicht ? item.wait + ' min' : 'DICHT'}</span>
                    <h3 onclick="openAttractieModal(${item.id})">${item.name}</h3>
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
    if(confirm("Selectie wissen?")) { 
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
    
    document.getElementById('view-title').innerText = v === 'attracties' ? 'ATTRACTIES' : (v === 'plan' ? 'Jouw Dagplan' : 'Sprookjesbos');
    
    if (v === 'sprookjes') toonSprookjes();
    if (v === 'plan') berekenOptimalePlan(false);
    window.scrollTo(0,0);
}

// --- ALGORITME & KAART INTEGRATIE ---
function getVerwachteWachtVoorTijd(attractie, uur) {
    let base = basisWachttijden[attractie.id] || 20;
    let factor = 1.0;
    if (uur < 12) { 
        factor = (attractie.rijk === "Fantasierijk" || attractie.rijk === "Marerijk") ? 1.2 : 0.7; 
    } else if (uur >= 12 && uur < 16) { 
        factor = 1.4; 
    } else { 
        factor = (attractie.rijk === "Ruigrijk") ? 1.1 : 0.6; 
    }
    return base * factor;
}

function toggleRouteKaart() {
    const wrap = document.getElementById('route-map-wrapper');
    if (wrap.style.display === 'none') {
        wrap.style.display = 'block';
        if (!map) {
            // Initialiseer Leaflet kaart gecentreerd op de Efteling
            map = L.map('leaflet-map').setView([51.649, 5.043], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap',
                maxZoom: 19
            }).addTo(map);
            markerLayer = L.layerGroup().addTo(map);
        }
        map.invalidateSize(); 
        updateMapRoute(); 
    } else {
        wrap.style.display = 'none';
    }
}

function updateMapRoute() {
    if (!map || currentRouteLijst.length === 0) return;
    
    markerLayer.clearLayers();
    if (routePolylineLayer) map.removeLayer(routePolylineLayer);

    let coordsStringArray = [];
    
    let customIcon = L.icon({
        iconUrl: 'icon-locatie.png',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
    });

    currentRouteLijst.forEach((a, index) => {
        if (a.lat && a.lng) {
            L.marker([a.lat, a.lng], {icon: customIcon})
             .bindPopup(`<b>${index + 1}. ${a.name}</b>`)
             .addTo(markerLayer);
            
            // OSRM verwacht format: longitude,latitude
            coordsStringArray.push(`${a.lng},${a.lat}`);
        }
    });

    // Haal de fysieke looproute op via OSRM OpenStreetMap Routing API
    if (coordsStringArray.length > 1) {
        let osrmUrl = `https://router.project-osrm.org/route/v1/foot/${coordsStringArray.join(';')}?overview=full&geometries=geojson`;
        fetch(osrmUrl)
            .then(res => res.json())
            .then(data => {
                if (data.routes && data.routes.length > 0) {
                    routePolylineLayer = L.geoJSON(data.routes[0].geometry, {
                        style: { color: '#001a33', weight: 4, opacity: 0.8, dashArray: '6, 8' }
                    }).addTo(map);
                    map.fitBounds(routePolylineLayer.getBounds(), {padding: [20, 20]});
                }
            })
            .catch(err => console.error("Fout bij ophalen OSRM route:", err));
    } else if (coordsStringArray.length === 1) {
        map.setView([currentRouteLijst[0].lat, currentRouteLijst[0].lng], 16);
    }
}

function berekenOptimalePlan(switchAfter = true) {
    let lijst = attractieData.filter(a => prioriteiten[a.id] > 0 && a.status === "Open" && !voltooid.has(a.id));
    
    if (lijst.length === 0 && switchAfter) return alert("Kies eerst attracties uit de lijst!");

    if (lijst.length > 0) {
        let nuUur = new Date().getHours();
        let lastVoltooidId = Array.from(voltooid).pop();
        let huidigRijk = lastVoltooidId ? attractieData.find(a => a.id === lastVoltooidId)?.rijk : "Ingang";

        lijst.forEach(a => {
            let score = prioriteiten[a.id] * 20; 
            let verwacht = getVerwachteWachtVoorTijd(a, nuUur);
            let wachtVerschil = verwacht - a.wait; 
            
            score += (wachtVerschil * 1.5); 
            score -= (a.wait * 0.5); 
            a.waarom = "";

            if (huidigRijk === "Ingang") {
                if (a.rijk === "Fantasierijk" || a.rijk === "Anderrijk") { 
                    score += 30; a.waarom = "Dichtbij de ingang!"; 
                } else if (wachtVerschil > 15) { 
                    a.waarom = "Nu veel rustiger dan normaal!"; 
                } else if (prioriteiten[a.id] === 5) { 
                    a.waarom = "Jouw absolute top-prioriteit!"; 
                } else { 
                    a.waarom = "Logische start van je dag."; 
                }
            } else {
                if (huidigRijk === a.rijk && a.id !== 9) { 
                    score += 40; a.waarom = "Dichtbij je huidige locatie!"; 
                } else if (wachtVerschil > 15) { 
                    a.waarom = "Nu veel rustiger dan normaal!"; 
                } else if (prioriteiten[a.id] === 5) { 
                    a.waarom = "Jouw absolute top-prioriteit!"; 
                } else { 
                    a.waarom = "Past goed in je route."; 
                }
            }

            if (a.id === 9) {
                score = prioriteiten[a.id] * 15;
                if (huidigRijk === "Marerijk") score += 50;
            }
            a.smartScore = score;
        });

        lijst.sort((a,b) => b.smartScore - a.smartScore);
        
        // Sla de lijst op voor de kaart update
        currentRouteLijst = lijst;
        if(document.getElementById('route-map-wrapper').style.display === 'block') {
            updateMapRoute();
        }
        
        const top = lijst[0];
        let wHtml = top.id === 9 ? `<div style="font-size:22px; color:var(--efteling-gold); font-weight:900; margin: 10px 0;">Geniet van het groen</div>` : `<div style="font-size:28px; color:var(--efteling-gold); font-weight:900; margin: 10px 0;">${top.wait} MIN</div>`;
        let tagHtml = top.waarom ? `<div class="smart-tag"><img src="icon-feitje.png" class="fact-icon" alt="Feitje">${top.waarom}</div>` : '';

        document.getElementById('next-step-container').innerHTML = `
            <div class="plan-header-card">
                <span class="badge">NU DOEN</span>
                <div class="top-attraction-name">${top.name}</div>
                ${tagHtml}${wHtml}
                <p style="font-size:13px; font-weight:700; color:#888; margin-bottom:15px;">
                    <img src="icon-locatie.png" class="stat-icon" alt="Locatie"> ${top.rijk}
                </p>
                <button onclick="markAsDone(${top.id})" class="done-btn">✓ Bezocht</button>
            </div>`;
            
        document.getElementById('route-container').innerHTML = lijst.slice(1).map(a => `
            <div class="card" style="margin: 8px 15px; opacity:0.85; transform:scale(0.96)">
                <div class="card-content">
                    <h3>${a.name}</h3>
                    <p style="margin:5px 0 0 0; color: #666; font-size: 13px; font-weight:700;">${a.id === 9 ? "Wandeling" : `Nu: ${a.wait} min`}</p>
                </div>
            </div>`).join('');
    } else {
        currentRouteLijst = [];
        if(map) { markerLayer.clearLayers(); if (routePolylineLayer) map.removeLayer(routePolylineLayer); }
        document.getElementById('next-step-container').innerHTML = `<div class="plan-header-card"><div class="top-attraction-name">Alles bezocht!</div><p style="font-weight:700; color:#888;">Tijd voor een snack.</p></div>`;
        document.getElementById('route-container').innerHTML = "";
    }
    
    if (switchAfter) switchView('plan');
}

function markAsDone(id) { 
    voltooid.add(id); 
    save(); 
    berekenOptimalePlan(false); 
    toonLijst(); 
}

// --- SPROOKJESBOS FUNCTIES ---
function toonSprookjes() {
    const c = document.getElementById('sprookjes-route-container');
    let html = "", totalTime = 0, accuWalk = 0, count = 0;
    
    masterSprookjes.forEach((s) => {
        accuWalk += s.wandelTijdVanafVorig; 
        if (selectedSprookjes.includes(s.id)) {
            count++; 
            totalTime += accuWalk;
            html += `
                <div class="route-step">
                    <div class="step-num">${count}</div>
                    <div>
                        <strong style="font-size: 16px; font-weight:800; color:var(--efteling-blue);">${s.naam}</strong>
                        <div class="walk-time" style="font-weight:600; font-size:12px;">
                            <img src="icon-wandelen.png" class="walk-icon" alt="Wandelen"> ${count === 1 ? 'Startpunt' : accuWalk + ' min lopen'}
                        </div>
                    </div>
                </div>`;
            accuWalk = 0; 
        }
    });
    
    if (html === "") html = "<p style='text-align:center; color:#888; padding:20px;'>Geen sprookjes geselecteerd.</p>";
    c.innerHTML = html;
    document.getElementById('sprookjes-stats').innerText = `Totale wandeling: ca. ${totalTime + (count * 3)} min`;
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
    selectedSprookjes = Array.from(document.querySelectorAll('#modal-list input[type="checkbox"]:checked')).map(cb => cb.value);
    save(); closeSprookjesModal(); toonSprookjes();
}
function resetData() { if(confirm("Weet je het zeker? Alles wordt gewist.")) { localStorage.clear(); location.reload(); } }

// --- ATTRACTIE MODAL FUNCTIES ---
function openAttractieModal(id) {
    const attr = attractieData.find(a => a.id === id);
    if (!attr) return;
    document.getElementById('attractie-modal-img').style.backgroundImage = `url('${attr.img}')`;
    document.getElementById('attractie-modal-title').innerText = attr.name;
    document.getElementById('attractie-modal-rijk').innerHTML = `<img src="icon-locatie.png" class="stat-icon" alt="Locatie"> ${attr.rijk}`;
    document.getElementById('attractie-modal-duur').innerHTML = `<img src="icon-tijd.png" class="stat-icon" alt="Tijd"> ${attr.duur || 'Onbekend'}`;
    document.getElementById('attractie-modal-desc').innerText = attr.beschrijving || '';
    if (attr.feitjes && attr.feitjes.length > 0) {
        const randomFeitje = attr.feitjes[Math.floor(Math.random() * attr.feitjes.length)];
        document.getElementById('attractie-modal-fact').innerText = randomFeitje;
        document.getElementById('attractie-fact-box').style.display = 'block';
    } else {
        document.getElementById('attractie-fact-box').style.display = 'none';
    }
    document.getElementById('attractie-modal').style.display = 'flex';
}

function closeAttractieModal(e) {
    if (e && e.target !== document.getElementById('attractie-modal') && e.target.className !== 'close-btn abs-close') return;
    document.getElementById('attractie-modal').style.display = 'none';
}

// --- INITIALISATIE ---
window.onload = () => {
    genereerSimulatieTijden(); 
    toonLijst();
    
    if (activeView === 'plan') berekenOptimalePlan(false);
    if (activeView === 'sprookjes') toonSprookjes();
    switchView(activeView);

    updateWeather(); 
    updateWachttijden(); 
    setInterval(updateWachttijden, 60000); 
    setInterval(updateWeather, 1800000); 

    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('hidden');
            setTimeout(() => splash.style.display = 'none', 400); 
        }
    }, 1200); 
};