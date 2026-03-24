const API_URL = "https://api.allorigins.win/raw?url=https://queue-times.com/parks/160/queue_times.json";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast?latitude=51.65&longitude=5.05&current_weather=true";

const basisWachttijden = { 
    1: 35, 2: 45, 3: 40, 4: 50, 5: 30, 6: 25, 7: 45, 8: 40, 
    9: 0, 10: 20, 11: 10, 12: 25, 13: 15, 14: 10, 15: 30, 
    16: 10, 17: 30, 18: 5, 19: 20 
};

let attractieData = [
    { id: 1, name: "Joris en de Draak", wait: 0, status: "Open", rijk: "Ruigrijk", img: "joris-en-de-draak.png", tags: ["achtbaan", "buiten"], beschrijving: "Aanschouw, dappere reizigers! Een bloeddorstige draak teistert het koninkrijk...", duur: "2 min", feitjes: ["Zet je schrap! Jullie houten strijdwagen bereikt een topsnelheid van 75 km/u."] },
    { id: 2, name: "Symbolica", wait: 0, status: "Open", rijk: "Fantasierijk", img: "symbolica.png", tags: ["familie", "binnen"], beschrijving: "Welkom, edele gasten! Treed binnen in het fonkelende Paleis der Fantasie...", duur: "7 min", feitjes: ["Met een prijskaartje van €35 miljoen is dit de duurste attractie ooit gebouwd in de Efteling."] },
    { id: 3, name: "Droomvlucht", wait: 0, status: "Open", rijk: "Marerijk", img: "droomvlucht.png", tags: ["familie", "binnen"], beschrijving: "Sluit je ogen, droom zacht, en ontwaak in een wereld waar wonderen werkelijkheid zijn...", duur: "6 min", feitjes: ["In het mysterieuze Zompenwoud regent het echt."] },
    { id: 4, name: "Danse Macabre", wait: 0, status: "Open", rijk: "Anderrijk", img: "danse-macabre.png", tags: ["familie", "binnen"], beschrijving: "Wees gewaarschuwd, stervelingen... Hier weerklinkt een ijzingwekkend koor...", duur: "3 min", feitjes: ["Deze duistere attractie is gebouwd op de heilige grond van het oude Spookslot."] },
    { id: 5, name: "Python", wait: 0, status: "Open", rijk: "Ruigrijk", img: "python.png", tags: ["achtbaan", "buiten"], beschrijving: "Kijk omhoog en huiver! Een gigantische stalen slang kronkelt door de bossen...", duur: "2 min", feitjes: ["Toen de Python in 1981 opende, was het de grootste achtbaan van Europa."] },
    { id: 6, name: "Vogel Rok", wait: 0, status: "Open", rijk: "Reizenrijk", img: "vogel-rok.png", tags: ["achtbaan", "binnen"], beschrijving: "Treed binnen in het domein van Sindbad de Zeeman en sta oog in oog met Vogel Rok...", duur: "1,5 min", feitjes: ["Het standbeeld bij de ingang is volgens het Guinness Book de grootste vogel van Europa."] },
    { id: 7, name: "Baron 1898", wait: 0, status: "Onderhoud", rijk: "Ruigrijk", img: "baron-1898.png", tags: ["achtbaan", "buiten"], beschrijving: "Kompels gezocht! Hoogmoedige mijnbaron Gustave Hooghmoed heeft goud gevonden...", duur: "2 min", feitjes: ["Tijdens de vrije val stort je maar liefst 37,5 meter verticaal naar beneden."] },
    { id: 8, name: "De Vliegende Hollander", wait: 0, status: "Onderhoud", rijk: "Ruigrijk", img: "de-vliegende-hollander.png", tags: ["achtbaan", "buiten"], beschrijving: "De gierige kapitein Willem van der Decken bracht een eeuwige vloek over zijn schip...", duur: "3,5 min", feitjes: ["Het is een combinatie van een darkride, een achtbaan én een waterattractie."] },
    { id: 9, name: "Sprookjesbos", wait: 0, status: "Open", rijk: "Marerijk", img: "sprookjesbos.png", tags: ["familie", "buiten"], beschrijving: "Welkom in mijn betoverde bos, waar sprookjes voor eeuwig voortleven...", duur: "Zelf bepalen", feitjes: ["Dit is waar het allemaal begon: het bos opende in 1952 met slechts 10 sprookjes."] },
    { id: 10, name: "Carnaval Festival", wait: 0, status: "Open", rijk: "Reizenrijk", img: "carnaval-festival.png", tags: ["familie", "binnen"], beschrijving: "Reis in slechts een paar minuten de hele wereld rond! Neem plaats in een vrolijk karretje...", duur: "8 min", feitjes: ["Het extreem herkenbare deuntje is geschreven door Toon Hermans."] },
    { id: 11, name: "Monorail", wait: 0, status: "Open", rijk: "Reizenrijk", img: "monorail.png", tags: ["familie", "buiten"], beschrijving: "Stap in de charmante, kruipende slakkentreintjes en zweef kalmpjes over het Volk van Laaf...", duur: "12 min", feitjes: ["Elke houten slak waar je in zit heeft een eigen, uniek serienummer op zijn huisje."] },
    { id: 12, name: "Fata Morgana", wait: 0, status: "Open", rijk: "Anderrijk", img: "fata-morgana.png", tags: ["familie", "binnen"], beschrijving: "Vaar mee naar de Verboden Stad uit de legendarische vertellingen van 1001 Nacht...", duur: "8 min", feitjes: ["De zware paleisdeuren openen puur door de waterstroming van jouw boot!"] },
    { id: 13, name: "Gondoletta", wait: 0, status: "Open", rijk: "Reizenrijk", img: "gondoletta.png", tags: ["familie", "buiten"], beschrijving: "Laat de drukte van het park even achter je. Neem plaats in een overdekt bootje...", duur: "20 min", feitjes: ["Dit systeem is oorspronkelijk aangelegd om de boten van Fata Morgana te testen!"] },
    { id: 14, name: "Halve Maen", wait: 0, status: "Open", rijk: "Ruigrijk", img: "halve-maen.png", tags: ["familie", "buiten"], beschrijving: "Kies het ruime sop en trotseer de golven! Dit machtige VOC-schip deinst niet terug...", duur: "3 min", feitjes: ["Op zijn hoogste punt zwaait dit schip naar een hoek van maar liefst 180 graden."] },
    { id: 15, name: "Max & Moritz", wait: 0, status: "Open", rijk: "Anderrijk", img: "max-en-moritz.png", tags: ["achtbaan", "familie", "buiten"], beschrijving: "Die dekselse kwajongens Max en Moritz hebben weer snode plannen! Raas mee...", duur: "2 min", feitjes: ["Deze vrolijke dubbele achtbaan is gebouwd op de locatie van de oude Bobsleebaan."] },
    { id: 16, name: "Pagode", wait: 0, status: "Open", rijk: "Reizenrijk", img: "pagode.png", tags: ["familie", "buiten"], beschrijving: "Verhef jezelf boven de bomen en ontdek het park zoals de vogels dat doen...", duur: "5 min", feitjes: ["Tijdens de piek van de vlucht bevind je je maar liefst 45 meter boven de grond."] },
    { id: 17, name: "Piraña", wait: 0, status: "Onderhoud", rijk: "Anderrijk", img: "pirana.png", tags: ["familie", "buiten"], beschrijving: "Durf jij de wildwaterrivier te trotseren? Neem plaats in een dobberend vlot...", duur: "5 min", feitjes: ["Toen de Piraña opende in 1983, was het de eerste wildwaterbaan van dit type ter wereld."] },
    { id: 18, name: "Stoomcarrousel", wait: 0, status: "Open", rijk: "Marerijk", img: "stoomcarrousel.png", tags: ["familie", "binnen"], beschrijving: "Stap terug in de tijd in dit warme, rijkversierde paleis van spiegels en lichtjes...", duur: "2 min", feitjes: ["De Efteling kocht deze unieke 19e-eeuwse kermismolen op in 1955."] },
    { id: 19, name: "Villa Volta", wait: 0, status: "Open", rijk: "Marerijk", img: "villa-volta.png", tags: ["familie", "binnen"], beschrijving: "Treed binnen in het weelderige huis van Hugo van den Loonsche Duynen. Niets is wat het lijkt...", duur: "10 min", feitjes: ["Een geheim: jij gaat helemaal niet over de kop! Alleen de muren van de kamer draaien rond."] }
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

const horecaData = {
    "Ruigrijk": [{naam: "Station de Oost", desc: "Friet, Oosterse snacks, belegde broodjes en verse sappen."}, {naam: "De Likkebaerd", desc: "Verse frites, snacks en verkoelend ijs."}],
    "Marerijk": [{naam: "Het Witte Paard", desc: "Koffie, gebak, belegde broodjes en warme seizoensgerechten."}, {naam: "'t Poffertje", desc: "Heerlijke verse, warme poffertjes volgens oud-Hollands recept."}],
    "Anderrijk": [{naam: "Fabula Restaurant", desc: "Verse wereldse gerechten, burgers en gezonde salades."}, {naam: "Oase", desc: "Döner, Turkse pizza en koude dranken."}],
    "Reizenrijk": [{naam: "Kashba", desc: "Oosterse sferen met burgers, belegde broodjes en warme dranken."}, {naam: "Tokoloko", desc: "Koffiespecialiteiten en lekkere zoetigheden."}],
    "Fantasierijk": [{naam: "Polles Keuken", desc: "Magische pannenkoeken en heerlijke zoetigheden (vaak reserveren gewenst)."}],
    "Ingang": [{naam: "De Gebrande Boon", desc: "Verse koffie en ovenheerlijke broodjes om de dag te starten."}]
};

// GEFIXED: Forceer alle IDs vanuit opslag naar strikte nummers (type mismatch verhelpen)
let prioriteiten = JSON.parse(localStorage.getItem('eftelingPrio')) || {};
let voltooidArray = JSON.parse(localStorage.getItem('eftelingVoltooid')) || [];
let voltooid = new Set(voltooidArray.map(id => parseInt(id, 10)));
let activeView = localStorage.getItem('eftelingView') || 'attracties';
let selectedSprookjes = JSON.parse(localStorage.getItem('eftelingSprookjes')) || ["sp1", "sp2", "sp3", "sp4", "sp5", "sp11", "sp18"];
let lunchVoltooid = localStorage.getItem('eftelingLunch') === 'true';
let snackVoltooid = localStorage.getItem('eftelingSnack') === 'true';
let activeCategory = 'alle';
let vorigeStatussen = {}; 

function save() {
    localStorage.setItem('eftelingPrio', JSON.stringify(prioriteiten));
    localStorage.setItem('eftelingVoltooid', JSON.stringify(Array.from(voltooid)));
    localStorage.setItem('eftelingView', activeView);
    localStorage.setItem('eftelingSprookjes', JSON.stringify(selectedSprookjes));
    localStorage.setItem('eftelingLunch', lunchVoltooid);
    localStorage.setItem('eftelingSnack', snackVoltooid);
}

function formatTime(totalMinutes) {
    let h = Math.floor(totalMinutes / 60) % 24;
    let m = totalMinutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function bepaalSluitingsTijd() {
    const nu = new Date();
    const maand = nu.getMonth() + 1; 
    const dag = nu.getDay(); 
    const datum = nu.getDate();
    let sluitingUur = 18; 
    if (maand === 7 || maand === 8) sluitingUur = 22; 
    else if (dag === 0 || dag === 6) sluitingUur = 19; 
    if (maand === 12 && datum > 20) sluitingUur = 20; 
    if (maand === 1 && datum < 8) sluitingUur = 20; 
    if (maand === 5 && datum < 10) sluitingUur = 20; 
    return sluitingUur;
}

function getVerwachteWachtVoorTijd(attractie, uur) {
    let base = basisWachttijden[attractie.id] || 20;
    let factor = 1.0;
    let dag = new Date().getDay();
    if (dag === 0 || dag === 6) factor += 0.3; 
    if (uur < 12) factor *= (attractie.rijk === "Fantasierijk" || attractie.rijk === "Marerijk") ? 1.2 : 0.7; 
    else if (uur >= 12 && uur < 16) factor *= 1.4; 
    else factor *= (attractie.rijk === "Ruigrijk") ? 1.1 : 0.6; 
    return base * factor;
}

function showToast(message) {
    const toast = document.getElementById('toast-container');
    document.getElementById('toast-message').innerText = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 6000);
}

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
    attractieData.forEach(a => {
        if (a.status !== "Onderhoud" && a.id !== 9) {
            let rawWacht = getVerwachteWachtVoorTijd(a, uur);
            let random = Math.floor(Math.random() * 11) - 5; 
            a.wait = Math.round(Math.max(5, Math.round(rawWacht + random)) / 5) * 5; 
            a.status = "Open";
            vorigeStatussen[a.id] = "Open"; 
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
            let planAangepast = false;

            data.lands.forEach(land => {
                land.rides.forEach(ride => {
                    let apiName = ride.name.toLowerCase().trim();
                    let match = attractieData.find(a => a.name.toLowerCase().trim() === apiName);
                    if (match && match.id !== 9) { 
                        let newStatus = ride.is_open ? "Open" : "Gesloten";
                        match.wait = ride.wait_time; 
                        match.status = newStatus;

                        let prevStatus = vorigeStatussen[match.id];
                        if (prevStatus === "Open" && newStatus === "Gesloten") {
                            if (prioriteiten[match.id] > 0 && !voltooid.has(match.id)) {
                                showToast(`Let op: ${match.name} is in storing gegaan. Je route wordt aangepast!`);
                                planAangepast = true;
                            }
                        }
                        vorigeStatussen[match.id] = newStatus;
                    }
                });
            });
            ind.innerText = "● LIVE " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            if(planAangepast && activeView === 'plan') berekenOptimalePlan(false);
        }
    } catch (e) {
        ind.innerText = "● OFFLINE SIM"; 
        ind.classList.add("offline");
    } finally {
        toonLijst(); 
    }
}

function setCategory(cat) {
    activeCategory = cat;
    document.querySelectorAll('.cat-pill').forEach(btn => {
        if(btn.id === 'filter-' + cat) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    toonLijst();
}

function toonLijst() {
    const container = document.getElementById('rollercoasters-container');
    container.innerHTML = "";
    
    const filteredData = attractieData.filter(a => {
        if (activeCategory === 'alle') return true;
        return a.tags && a.tags.includes(activeCategory);
    }).sort((a, b) => a.name.localeCompare(b.name));
    
    if (filteredData.length === 0) {
        container.innerHTML = "<p style='text-align:center; padding: 20px; color:#888;'>Geen attracties gevonden in deze categorie.</p>";
        return;
    }

    filteredData.forEach(item => {
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
    id = parseInt(id, 10); // Beveiliging type mismatch
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
    activeView = v; save();
    ['attracties','plan','sprookjes'].forEach(id => document.getElementById(id+'-view').style.display = 'none');
    document.getElementById(v+'-view').style.display = 'block';
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('nav-' + v).classList.add('active');
    document.getElementById('view-title').innerText = v === 'attracties' ? 'ATTRACTIES' : (v === 'plan' ? 'Jouw Dagplan' : 'Sprookjesbos');
    
    if (v === 'sprookjes') toonSprookjes();
    if (v === 'plan') berekenOptimalePlan(false);
    window.scrollTo(0,0);
}

// GEFIXED: Forceer nummer-type + stop event propagatie
function markAsDone(id, event) { 
    if(event) event.stopPropagation();
    voltooid.add(parseInt(id, 10)); 
    save(); 
    berekenOptimalePlan(false); 
    toonLijst(); 
}

function markBreakAsDone(type, event) {
    if(event) event.stopPropagation();
    if (type === 'lunch') lunchVoltooid = true;
    if (type === 'snack') snackVoltooid = true;
    save();
    berekenOptimalePlan(false);
}

function berekenOptimalePlan(switchAfter = true) {
    // Hier kijkt het algoritme of voltooid.has() true is. Dat werkt nu feilloos omdat beide nummers zijn.
    let ruweLijst = attractieData.filter(a => prioriteiten[a.id] > 0 && a.status === "Open" && !voltooid.has(a.id));
    
    if (ruweLijst.length === 0 && switchAfter) return alert("Kies eerst attracties uit de lijst!");

    if (ruweLijst.length > 0) {
        let nu = new Date();
        let actueleMinuten = nu.getHours() * 60 + nu.getMinutes();
        let startUur = nu.getHours();
        
        let sluitingUur = bepaalSluitingsTijd();
        const sluitingMinuten = sluitingUur * 60; 
        
        let lastVoltooidId = Array.from(voltooid).pop();
        let initieelRijk = lastVoltooidId ? attractieData.find(a => a.id === lastVoltooidId)?.rijk : "Ingang";

        ruweLijst.forEach(a => {
            let score = prioriteiten[a.id] * 20; 
            let verwacht = getVerwachteWachtVoorTijd(a, startUur);
            let wachtVerschil = verwacht - a.wait; 
            score += (wachtVerschil * 1.5); 
            score -= (a.wait * 0.5); 
            a.waarom = "";

            if (initieelRijk === "Ingang") {
                if (a.rijk === "Fantasierijk" || a.rijk === "Anderrijk") { score += 30; a.waarom = "Dichtbij de ingang!"; } 
                else if (wachtVerschil > 15) { a.waarom = "Nu rustiger dan normaal!"; } 
                else if (prioriteiten[a.id] === 5) { a.waarom = "Absolute top-prioriteit!"; } 
                else { a.waarom = "Logische start."; }
            } else {
                if (initieelRijk === a.rijk && a.id !== 9) { score += 40; a.waarom = "Dichtbij je locatie!"; } 
                else if (wachtVerschil > 15) { a.waarom = "Nu rustiger dan normaal!"; } 
                else if (prioriteiten[a.id] === 5) { a.waarom = "Absolute top-prioriteit!"; } 
                else { a.waarom = "Past goed in de route."; }
            }
            if (a.id === 9) { score = prioriteiten[a.id] * 15; if (initieelRijk === "Marerijk") score += 50; }
            a.smartScore = score;
        });

        ruweLijst.sort((a,b) => b.smartScore - a.smartScore);
        
        let planLijst = [];
        let huidigRijk = initieelRijk;
        let sluitingGetoond = false;
        let localLunchGehad = lunchVoltooid;
        let localSnackGehad = snackVoltooid;

        ruweLijst.forEach((a, index) => {
            let wandelTijd = (index === 0 && planLijst.length === 0) ? ((huidigRijk === "Ingang" || huidigRijk !== a.rijk) ? 8 : 3) : ((huidigRijk !== a.rijk) ? 8 : 3);
            let aankomst = actueleMinuten + wandelTijd;
            
            if (aankomst > 765 && !localLunchGehad) { 
                if (aankomst < 840) { 
                    planLijst.push({ 
                        isBreak: true, type: 'lunch', rijk: huidigRijk, aankomstTijd: formatTime(actueleMinuten), 
                        duur: 40, titel: "Tijd voor lunch?", desc: "Het is tijd voor een pauze. Plan hier ca. 40 min voor in." 
                    });
                    actueleMinuten += 40; aankomst += 40;
                }
                localLunchGehad = true; 
            } 
            
            if (aankomst > 945 && !localSnackGehad) { 
                if (aankomst < 1020) {
                    planLijst.push({ 
                        isBreak: true, type: 'snack', rijk: huidigRijk, aankomstTijd: formatTime(actueleMinuten), 
                        duur: 25, titel: "Kleine versnapering", desc: "Pak een momentje rust en een snack. Plan ca. 25 min in." 
                    });
                    actueleMinuten += 25; aankomst += 25;
                }
                localSnackGehad = true;
            }

            let aankomstUur = Math.floor(aankomst / 60) % 24;
            let isNuDoen = planLijst.length === 0;
            let geprojecteerdeWacht = isNuDoen ? a.wait : Math.round(getVerwachteWachtVoorTijd(a, aankomstUur) / 5) * 5;

            let ritDuur = parseInt(a.duur) || 5;
            let klaar = aankomst + geprojecteerdeWacht + ritDuur;

            a.aankomstTijd = formatTime(aankomst);
            a.teLaat = aankomst >= sluitingMinuten;
            if (a.teLaat && !sluitingGetoond) {
                a.toonSluiting = true;
                sluitingGetoond = true;
            } else {
                a.toonSluiting = false;
            }

            a.geplandeWacht = geprojecteerdeWacht;
            a.isBreak = false;
            a.wandelTijdStr = `ca. ${wandelTijd} min lopen`;

            planLijst.push(a);

            actueleMinuten = klaar;
            huidigRijk = a.rijk;
        });

        const top = planLijst[0];
        let topHtml = "";
        
        if (top.isBreak) {
            topHtml = `
            <div class="plan-header-card break-mode">
                <span class="badge">NU DOEN • ${top.aankomstTijd}</span>
                <div class="top-attraction-name">${top.titel}</div>
                <div style="font-size:14px; color:#555; margin-bottom:15px; font-weight:600;">${top.desc}</div>
                <button class="btn-horeca" onclick="openHorecaModal('${top.rijk}', '${top.type}')">
                    🍔 Horeca in de buurt bekijken
                </button>
                <button onclick="markBreakAsDone('${top.type}', event)" class="done-btn" style="background:var(--smart-green);">✓ Hervat Route</button>
            </div>`;
        } else {
            let wHtml = top.id === 9 ? `<div style="font-size:22px; color:var(--efteling-gold); font-weight:900; margin: 10px 0;">Geniet van het groen</div>` : `<div style="font-size:28px; color:var(--efteling-gold); font-weight:900; margin: 10px 0;">${top.geplandeWacht} MIN</div>`;
            let tagHtml = top.waarom ? `<div class="smart-tag"><img src="icon-feitje.png" class="fact-icon" alt="Feitje">${top.waarom}</div>` : '';
            let topWarning = top.teLaat ? `<div class="divider warning" style="margin-top: 0; margin-bottom: 20px;"><span>Park sluit om ${sluitingUur}:00</span></div>` : '';

            topHtml = `
            ${topWarning}
            <div class="plan-header-card" style="${top.teLaat ? 'opacity: 0.5; filter: grayscale(80%);' : ''}">
                <span class="badge">NU DOEN • ${top.aankomstTijd}</span>
                <div class="top-attraction-name">${top.name}</div>
                ${tagHtml}${wHtml}
                <p style="font-size:13px; font-weight:700; color:#888; margin-bottom:15px;">
                    <img src="icon-wandelen.png" class="stat-icon" alt="Wandelen"> ${top.wandelTijdStr} • <img src="icon-locatie.png" class="stat-icon" alt="Locatie"> ${top.rijk}
                </p>
                <button onclick="markAsDone(${top.id}, event)" class="done-btn">✓ Bezocht</button>
            </div>`;
        }
        
        document.getElementById('next-step-container').innerHTML = topHtml;
            
        let routeHtml = '';
        planLijst.slice(1).forEach((item) => {
            if (item.isBreak) {
                routeHtml += `
                <div class="smart-break-card" onclick="openHorecaModal('${item.rijk}', '${item.type}')">
                    <img src="icon-pauze.png" class="smart-break-icon" alt="Pauze">
                    <div class="smart-break-text">
                        <h4>${item.titel}</h4>
                        <p>${item.desc} Tik voor locaties.</p>
                    </div>
                </div>`;
            } else {
                if (item.toonSluiting) {
                    routeHtml += `<div class="divider warning"><span>Park sluit om ${sluitingUur}:00</span></div>`;
                }

                routeHtml += `
                    <div class="card ${item.teLaat ? 'te-laat' : ''}" style="margin: 8px 15px; transform:scale(0.96)">
                        <div class="card-content">
                            <h3>${item.name}</h3>
                            <p style="margin:5px 0 0 0; color: #666; font-size: 13px; font-weight:700;">${item.id === 9 ? "Wandeling" : `Verwacht: ${item.geplandeWacht} min`}</p>
                            <div class="timeline-time">${item.aankomstTijd}</div>
                        </div>
                    </div>`;
            }
        });
        
        document.getElementById('route-container').innerHTML = routeHtml;

    } else {
        document.getElementById('next-step-container').innerHTML = `<div class="plan-header-card"><div class="top-attraction-name">Alles bezocht!</div><p style="font-weight:700; color:#888;">Geniet van de rest van je dag.</p></div>`;
        document.getElementById('route-container').innerHTML = "";
    }
    
    if (switchAfter) switchView('plan');
}

function toonSprookjes() {
    const c = document.getElementById('sprookjes-route-container');
    let html = "", totalTime = 0, accuWalk = 0, count = 0;
    masterSprookjes.forEach((s) => {
        accuWalk += s.wandelTijdVanafVorig; 
        if (selectedSprookjes.includes(s.id)) {
            count++; totalTime += accuWalk;
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

function resetData() { 
    if(confirm("Weet je het zeker? Alles wordt gewist.")) { 
        localStorage.clear(); 
        location.reload(); 
    } 
}

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

function openHorecaModal(rijk, type) {
    let opties = horecaData[rijk] || horecaData["Marerijk"];
    let titel = type === 'lunch' ? 'Tijd voor Lunch' : 'Tijd voor een Snack';
    document.getElementById('horeca-modal-title').innerText = titel;
    document.getElementById('horeca-modal-desc').innerText = `Hier kun je nu terecht in het ${rijk}:`;
    
    document.getElementById('horeca-modal-list').innerHTML = opties.map(o => `
        <div class="horeca-item">
            <h4>${o.naam}</h4><p>${o.desc}</p>
        </div>
    `).join('');
    
    document.getElementById('horeca-modal').style.display = 'flex';
}

function closeHorecaModal(e) {
    if (e && e.target !== document.getElementById('horeca-modal') && e.target.className !== 'close-btn' && !e.target.classList.contains('secondary-btn')) return;
    document.getElementById('horeca-modal').style.display = 'none';
}

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