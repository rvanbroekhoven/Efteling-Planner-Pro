const API_URL = "https://api.allorigins.win/raw?url=https://queue-times.com/parks/160/queue_times.json";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast?latitude=51.65&longitude=5.05&current_weather=true";

const basisWachttijden = { 1: 35, 2: 45, 3: 40, 4: 50, 5: 30, 6: 25, 7: 45, 8: 40, 9: 0, 10: 20, 11: 10, 12: 25, 13: 15, 14: 10, 15: 30, 16: 10, 17: 30, 18: 5, 19: 20 };

let attractieData = [
    { id: 1, name: "Joris en de Draak", wait: 0, status: "Open", rijk: "Ruigrijk", img: "joris-en-de-draak.png", beschrijving: "Houten race-achtbaan waar Water en Vuur strijden.", duur: "2 min", feitjes: ["De topsnelheid is 75 km/u.", "Water en Vuur hebben een eigen afzonderlijke baan.", "Er zijn meer dan 100.000 bouten gebruikt."] },
    { id: 2, name: "Symbolica", wait: 0, status: "Open", rijk: "Fantasierijk", img: "symbolica.png", beschrijving: "Een betoverend paleis vol magie en verborgen kamers.", duur: "7 min", feitjes: ["Er zijn 3 verschillende routes (Schatten, Helden, Muziek).", "Het is de duurste attractie ooit gebouwd in de Efteling (€35 miljoen).", "Pardoes ontwierp dit paleis zelf."] },
    { id: 3, name: "Droomvlucht", wait: 0, status: "Open", rijk: "Marerijk", img: "droomvlucht.png", beschrijving: "Zweef door de wondere wereld van elfen en trollen.", duur: "6 min", feitjes: ["Geopend in 1993.", "Er hangen echte geurmachines in de attractie.", "De kastelen in het Zompenwoud zweven echt aan het plafond."] },
    { id: 4, name: "Danse Macabre", wait: 0, status: "Open", rijk: "Anderrijk", img: "danse-macabre.png", beschrijving: "Griezelig muzikaal spektakel op een abdijplein.", duur: "3 min", feitjes: ["Vervangt het bekende Spookslot.", "Je zit op een gigantisch draaiend koorbank-systeem.", "Het koor zingt het klassieke stuk 'Danse Macabre'."] },
    { id: 5, name: "Python", wait: 0, status: "Open", rijk: "Ruigrijk", img: "python.png", beschrijving: "Klassieke stalen achtbaan met dubbele looping en kurkentrekker.", duur: "2 min", feitjes: ["Geopend in 1981, toen de grootste van Europa.", "In 2018 is de baan grotendeels afgebroken en vernieuwd.", "Vroeger mocht je pas in de Python als je 1.20m was (nu nog steeds)."] },
    { id: 6, name: "Vogel Rok", wait: 0, status: "Open", rijk: "Reizenrijk", img: "vogel-rok.png", beschrijving: "Indoor achtbaan in het donker.", duur: "1,5 min", feitjes: ["De vogel bij de ingang is de grootste van Europa volgens het Guinness Book.", "Tijdens de rit klinkt muziek van Ruud Bos.", "Je vliegt met 65 km/u door het donker."] },
    { id: 7, name: "Baron 1898", wait: 0, status: "Onderhoud", rijk: "Ruigrijk", img: "baron-1898.png", beschrijving: "Dive coaster waarbij je 37,5 meter een mijnschacht in stort.", duur: "2 min", feitjes: ["De vrije val is 37,5 meter diep.", "Je valt in een mistige put geregeerd door de Witte Wieven.", "De grote klok luidt elke keer als een trein vertrekt."] },
    { id: 8, name: "De Vliegende Hollander", wait: 0, status: "Onderhoud", rijk: "Ruigrijk", img: "de-vliegende-hollander.png", beschrijving: "Waterachtbaan rondom het behekste spookschip van Willem van der Decken.", duur: "3,5 min", feitjes: ["De voorgevel is een mix van bestaande historische panden.", "De mist in de donkere tunnel is koud water.", "Het schip 'duikt' aan het einde met een flinke splash in het water."] },
    { id: 9, name: "Sprookjesbos", wait: 0, status: "Open", rijk: "Marerijk", img: "sprookjesbos.png", beschrijving: "Het hart van de Efteling, vol bekende en onbekende sprookjes.", duur: "Zelf bepalen", feitjes: ["Geopend op 31 mei 1952 met slechts 10 sprookjes.", "Anton Pieck is de originele ontwerper.", "Alle originele beelden werden bediend met oude grammofoonplaten."] },
    { id: 10, name: "Carnaval Festival", wait: 0, status: "Open", rijk: "Reizenrijk", img: "carnaval-festival.png", beschrijving: "Vrolijke indoor rit langs verschillende landen van de wereld.", duur: "8 min", feitjes: ["Geopend in 1984.", "Het bekende deuntje is geschreven door Toon Hermans.", "Jokie de Prrretneus is de hoofdbewoner van de attractie."] },
    { id: 11, name: "Monorail", wait: 0, status: "Open", rijk: "Reizenrijk", img: "monorail.png", beschrijving: "Rondrit in een slakkentrein boven het Lavenlaar.", duur: "12 min", feitjes: ["Je kunt zelf trappen, of de slak het werk laten doen.", "Biedt een mooi uitzicht over de huizen van het Volk van Laaf.", "Elke slak heeft een eigen uniek nummer."] },
    { id: 12, name: "Fata Morgana", wait: 0, status: "Open", rijk: "Anderrijk", img: "fata-morgana.png", beschrijving: "Verboden boottocht door een mysterieuze stad uit 1001 Nacht.", duur: "8 min", feitjes: ["Er zijn meer dan 130 bewegende poppen (animatronics).", "De jungle scène ruikt echt naar oerwoud en nattigheid.", "De deuren openen automatisch door de waterstroming van de boot."] },
    { id: 13, name: "Gondoletta", wait: 0, status: "Open", rijk: "Reizenrijk", img: "gondoletta.png", beschrijving: "Rustige boottocht over de grote siervijver.", duur: "20 min", feitjes: ["Oorspronkelijk ontworpen als testsysteem voor Fata Morgana.", "Het trekwiel ligt onzichtbaar onder het wateroppervlak.", "Ideaal moment om even uit te rusten en wat te eten."] },
    { id: 14, name: "Halve Maen", wait: 0, status: "Open", rijk: "Ruigrijk", img: "halve-maen.png", beschrijving: "Een van de grootste schommelschepen ter wereld.", duur: "3 min", feitjes: ["Biedt plaats aan 85 personen per rit.", "Schommelt tot een indrukwekkende hoek van 180 graden.", "Geopend in 1982 en gebouwd door de Zwitserse fabrikant Intamin."] },
    { id: 15, name: "Max & Moritz", wait: 0, status: "Open", rijk: "Anderrijk", img: "max-en-moritz.png", beschrijving: "Dubbele familieachtbaan over de streken van twee kwajongens.", duur: "2 min", feitjes: ["Vervangt de legendarische oude Bobsleebaan.", "De trein maakt twee volledige rondes per rit.", "De fart-kussens in de wachtrij produceren échte geluiden..."] },
    { id: 16, name: "Pagode", wait: 0, status: "Open", rijk: "Reizenrijk", img: "pagode.png", beschrijving: "Vliegende Thaise tempel met een 360-graden uitzicht.", duur: "5 min", feitjes: ["Gaat tot maximaal 45 meter hoogte.", "De totale constructie weegt maar liefst 225 ton.", "De arm stamt uit de offshore techniek (kranen)."] },
    { id: 17, name: "Piraña", wait: 0, status: "Open", rijk: "Anderrijk", img: "pirana.png", beschrijving: "Wildwaterbaan met ronde boten in Zuid-Amerikaanse sferen.", duur: "5 min", feitjes: ["Dit was in 1983 de eerste wildwaterbaan van dit type ter wereld.", "Twee grote watergoden (Acolna en Chura) spuiten je aan het eind nat.", "De pompen verplaatsen 3,5 miljoen liter water per uur."] },
    { id: 18, name: "Stoomcarrousel", wait: 0, status: "Open", rijk: "Marerijk", img: "stoomcarrousel.png", beschrijving: "Schitterende, authentieke draaimolen uit 1895.", duur: "2 min", feitjes: ["Gekocht door de Efteling in 1955.", "Draait op échte, originele Gavioli orgelmuziek.", "Stond vóór de Efteling op diverse kermissen door Nederland."] },
    { id: 19, name: "Villa Volta", wait: 0, status: "Open", rijk: "Marerijk", img: "villa-volta.png", beschrijving: "Vervloekt huis dat volledig over de kop lijkt te draaien.", duur: "10 min", feitjes: ["Dit was het allereerste 'Madhouse' ter wereld.", "Bokkrijder Hugo van den Loonsche Duynen is de hoofdbewoner.", "De kamer draait, maar de banken schommelen slechts."] }
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

let prioriteiten = JSON.parse(localStorage.getItem('eftelingPrio')) || {};
let voltooid = new Set(JSON.parse(localStorage.getItem('eftelingVoltooid')) || []);
let activeView = localStorage.getItem('eftelingView') || 'attracties';
let selectedSprookjes = JSON.parse(localStorage.getItem('eftelingSprookjes')) || ["sp1", "sp2", "sp3", "sp4", "sp5", "sp11", "sp18"];

function save() {
    localStorage.setItem('eftelingPrio', JSON.stringify(prioriteiten));
    localStorage.setItem('eftelingVoltooid', JSON.stringify(Array.from(voltooid)));
    localStorage.setItem('eftelingView', activeView);
    localStorage.setItem('eftelingSprookjes', JSON.stringify(selectedSprookjes));
}

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

async function updateWachttijden() {
    const ind = document.getElementById('last-update');
    ind.innerText = "VERVERSEN..."; ind.classList.remove("offline");
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Netwerkfout");
        const data = await response.json();
        if (data && data.lands) {
            data.lands.forEach(land => {
                land.rides.forEach(ride => {
                    let apiName = ride.name.toLowerCase().trim();
                    let match = attractieData.find(a => a.name.toLowerCase().trim() === apiName);
                    if (match && match.id !== 9) { match.wait = ride.wait_time; match.status = ride.is_open ? "Open" : "Gesloten"; }
                });
            });
            ind.innerText = "● LIVE " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
    } catch (e) {
        ind.innerText = "● OFFLINE SIM"; ind.classList.add("offline");
    } finally {
        toonLijst(); 
        if (activeView === 'plan') berekenOptimalePlan(false);
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
                <div class="card-img" style="background-image: url('${item.img}');" onclick="openAttractieModal(${item.id})"></div>
                <div class="card-content">
                    <span class="wait-badge" style="${waitDisplay}">${!isDicht ? item.wait + ' min' : 'DICHT'}</span>
                    <h3 onclick="openAttractieModal(${item.id})">${item.name}</h3><p class="rijk-tekst">${item.rijk}</p><div class="star-rating">${sterren}</div>
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

function getVerwachteWachtVoorTijd(attractie, uur) {
    let base = basisWachttijden[attractie.id] || 20;
    let factor = 1.0;
    if(uur < 12) { factor = (attractie.rijk === "Fantasierijk" || attractie.rijk === "Marerijk") ? 1.2 : 0.7; }
    else if(uur >= 12 && uur < 16) { factor = 1.4; }
    else { factor = (attractie.rijk === "Ruigrijk") ? 1.1 : 0.6; }
    return base * factor;
}

function berekenOptimalePlan(switchAfter = true) {
    let lijst = attractieData.filter(a => prioriteiten[a.id] > 0 && a.status === "Open" && !voltooid.has(a.id));
    if(lijst.length === 0 && switchAfter) return alert("Kies eerst attracties uit de lijst!");

    if(lijst.length > 0) {
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
                    score += 30; a.waarom = "💡 Dichtbij de ingang!";
                } else if (wachtVerschil > 15) { a.waarom = "💡 Nu veel rustiger dan normaal!";
                } else if (prioriteiten[a.id] === 5) { a.waarom = "💡 Jouw absolute top-prioriteit!";
                } else { a.waarom = "💡 Logische start van je dag."; }
            } else {
                if (huidigRijk === a.rijk && a.id !== 9) { 
                    score += 40; a.waarom = "💡 Dichtbij je huidige locatie!";
                } else if (wachtVerschil > 15) { a.waarom = "💡 Nu veel rustiger dan normaal!";
                } else if (prioriteiten[a.id] === 5) { a.waarom = "💡 Jouw absolute top-prioriteit!";
                } else { a.waarom = "💡 Past goed in je route."; }
            }

            if (a.id === 9) {
                score = prioriteiten[a.id] * 15;
                if (huidigRijk === "Marerijk") score += 50;
            }
            a.smartScore = score;
        });

        lijst.sort((a,b) => b.smartScore - a.smartScore);
        
        const top = lijst[0];
        let wHtml = top.id === 9 ? `<div style="font-size:22px; color:var(--efteling-gold); font-weight:900; margin: 10px 0;">Geniet van het groen</div>` : `<div style="font-size:28px; color:var(--efteling-gold); font-weight:900; margin: 10px 0;">${top.wait} MIN</div>`;
        let tagHtml = top.waarom ? `<div class="smart-tag">${top.waarom}</div>` : '';

        document.getElementById('next-step-container').innerHTML = `
            <div class="plan-header-card"><span class="badge">NU DOEN</span><div class="top-attraction-name">${top.name}</div>
            ${tagHtml}${wHtml}
            <p style="font-size:13px; font-weight:700; color:#888; margin-bottom:15px;">Locatie: ${top.rijk}</p><button onclick="markAsDone(${top.id})" class="done-btn">✓ Bezocht</button></div>`;
            
        document.getElementById('route-container').innerHTML = lijst.slice(1).map(a => `
            <div class="card" style="margin: 8px 15px; opacity:0.85; transform:scale(0.96)">
                <div class="card-content"><h3>${a.name}</h3><p style="margin:5px 0 0 0; color: #666; font-size: 13px; font-weight:700;">${a.id === 9 ? "Wandeling" : `Nu: ${a.wait} min`}</p></div>
            </div>`).join('');
    } else {
        document.getElementById('next-step-container').innerHTML = `<div class="plan-header-card"><div class="top-attraction-name">Alles bezocht! 🏰</div><p style="font-weight:700; color:#888;">Tijd voor een snack.</p></div>`;
        document.getElementById('route-container').innerHTML = "";
    }
    if(switchAfter) switchView('plan');
}

function markAsDone(id) { voltooid.add(id); save(); berekenOptimalePlan(false); toonLijst(); }

function toonSprookjes() {
    const c = document.getElementById('sprookjes-route-container');
    let html = "", totalTime = 0, accuWalk = 0, count = 0;
    masterSprookjes.forEach((s) => {
        accuWalk += s.wandelTijdVanafVorig; 
        if(selectedSprookjes.includes(s.id)) {
            count++; totalTime += accuWalk;
            html += `<div class="route-step"><div class="step-num">${count}</div><div><strong style="font-size: 16px; font-weight:800; color:var(--efteling-blue);">${s.naam}</strong><div class="walk-time" style="font-weight:600; font-size:12px;">🚶 ${count === 1 ? 'Startpunt' : accuWalk + ' min lopen'}</div></div></div>`;
            accuWalk = 0; 
        }
    });
    if(html === "") html = "<p style='text-align:center; color:#888; padding:20px;'>Geen sprookjes geselecteerd.</p>";
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

// ℹ️ NIEUW: Logica voor de Attractie Details Modal
function openAttractieModal(id) {
    const attr = attractieData.find(a => a.id === id);
    if(!attr) return;

    document.getElementById('attractie-modal-img').style.backgroundImage = `url('${attr.img}')`;
    document.getElementById('attractie-modal-title').innerText = attr.name;
    document.getElementById('attractie-modal-rijk').innerText = '📍 ' + attr.rijk;
    document.getElementById('attractie-modal-duur').innerText = '⏱️ ' + (attr.duur || 'Onbekend');
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

window.onload = () => {
    genereerSimulatieTijden(); 
    toonLijst();
    if(activeView === 'plan') berekenOptimalePlan(false);
    if(activeView === 'sprookjes') toonSprookjes();
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