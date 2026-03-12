const API_URL = "https://api.allorigins.win/raw?url=https://queue-times.com/parks/160/queue_times.json";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast?latitude=51.65&longitude=5.05&current_weather=true";

const basisWachttijden = { 1: 35, 2: 45, 3: 40, 4: 50, 5: 30, 6: 25, 7: 45, 8: 40, 9: 0, 10: 20, 11: 10, 12: 25, 13: 15, 14: 10, 15: 30, 16: 10, 17: 30, 18: 5, 19: 20 };

let attractieData = [
    { id: 1, name: "Joris en de Draak", wait: 0, status: "Open", rijk: "Ruigrijk", img: "joris-en-de-draak.png", 
      beschrijving: "Aanschouw, dappere reizigers! Een bloeddorstige draak teistert het koninkrijk. Treed in de voetsporen van de legendarische Joris en kies jullie strijdwagen van Water of Vuur. Alleen door dapper samen te werken en genadeloos door de houten bochten te razen, kunnen jullie het beest verslaan en als ware helden triomferen!", 
      duur: "2 min", feitjes: ["Zet je schrap! Jullie houten strijdwagen bereikt een duizelingwekkende topsnelheid van maar liefst 75 kilometer per uur.", "Let goed op: de banen van Water en Vuur zijn niet exact hetzelfde, maar kruisen elkaar op spectaculaire wijze gedurende de rit.", "Voor de bouw van deze gigantische constructie zijn ruim 100.000 stalen bouten gebruikt om het hout te temmen."] },
    
    { id: 2, name: "Symbolica", wait: 0, status: "Open", rijk: "Fantasierijk", img: "symbolica.png", 
      beschrijving: "Welkom, edele gasten! Treed binnen in het fonkelende Paleis der Fantasie. De vrolijke nar Pardoes nodigt jullie uit voor een geheime audiëntie bij koning Pardulfus. Neem plaats in een magisch, ronddraaiend voertuig en laat je meevoeren door verborgen kamers vol glinsterende schatten, heldhaftige verhalen en wonderlijke muziek.", 
      duur: "7 min", feitjes: ["Aan het begin van de rit mag je zelf kiezen of je de Schattentour, Heldentour of Muziektour wilt beleven. Elke route toont andere geheimen!", "Met een prijskaartje van €35 miljoen is dit de allerduurste attractie die de Efteling ooit heeft gebouwd.", "Kijk goed om je heen in het paleis; veel van de magische effecten werken geheel zonder zichtbare rails op de vloer."] },
    
    { id: 3, name: "Droomvlucht", wait: 0, status: "Open", rijk: "Marerijk", img: "droomvlucht.png", 
      beschrijving: "Sluit je ogen, droom zacht, en ontwaak in een wereld waar wonderen werkelijkheid zijn. Zweef in een zacht gondeltje door weelderige bossen waar elfen dansen, trollen stoeien in de modder en kastelen gewichtloos door de nachtelijke hemel zweven. Een reis die de ziel betovert.", 
      duur: "6 min", feitjes: ["De geur van frisse dennenbomen en zoete bloemen die je ruikt, is echt! Er zijn speciale geurmachines verstopt in de scènes.", "In het mysterieuze Zompenwoud regent het echt. Miljoenen druppeltjes vallen daar onafgebroken naar beneden.", "De indrukwekkende sterrenhemel aan het einde van de rit wordt gevormd door meer dan een miljoen piepkleine lichtpuntjes."] },
    
    { id: 4, name: "Danse Macabre", wait: 0, status: "Open", rijk: "Anderrijk", img: "danse-macabre.png", 
      beschrijving: "Wees gewaarschuwd, stervelingen... Hier, op de ruïnes van een verlaten abdij, weerklinkt een ijzingwekkend koor. Neem plaats in de immense koorbanken en geef je over aan de macabere wals. De geesten ontwaken en sleuren je mee in een razende, bovennatuurlijke dans die je nooit meer zult vergeten.", 
      duur: "3 min", feitjes: ["Deze duistere attractie is gebouwd op de heilige grond van het oude, legendarische Spookslot.", "Je neemt plaats op een gigantisch, draaiend platform dat niet alleen roteert, maar ook onverwachts kantelt en zakt.", "De griezelige vioolmuziek die je hoort is het beroemde klassieke stuk 'Danse Macabre' van componist Camille Saint-Saëns."] },
    
    { id: 5, name: "Python", wait: 0, status: "Open", rijk: "Ruigrijk", img: "python.png", 
      beschrijving: "Kijk omhoog en huiver! Een gigantische stalen slang kronkelt door de bossen van het Ruigrijk. Ben jij dapper genoeg om de stalen buik van de Python te betreden? Maak je klaar voor een meedogenloze rit vol dubbele loopings en scherpe kurkentrekkers die je wereld volledig op zijn kop zetten.", 
      duur: "2 min", feitjes: ["Toen de Python in 1981 opende, was het de grootste en meest spectaculaire achtbaan van heel Europa.", "In 2018 werd de achtbaan bijna volledig gesloopt en stukje voor stukje weer opgebouwd met een soepelere baan.", "Al generaties lang is de Python de ultieme vuurdoop voor Efteling-bezoekers. Durf jij?"] },
    
    { id: 6, name: "Vogel Rok", wait: 0, status: "Open", rijk: "Reizenrijk", img: "vogel-rok.png", 
      beschrijving: "Treed binnen in het domein van Sindbad de Zeeman en sta oog in oog met de mythische Vogel Rok. Voordat je het weet, grijpt deze gigantische roofvogel jouw karretje vast met zijn vlijmscherpe klauwen en vlieg je met een rotvaart door het pikkedonker. Een duizelingwekkende vlucht langs slangen en stormen!", 
      duur: "1,5 min", feitjes: ["Het imposante standbeeld van de vogel bij de ingang is volgens het Guinness Book of Records de grootste vogel van Europa.", "Tijdens de donkere vlucht vlieg je met een snelheid van 65 kilometer per uur door de pikzwarte hallen.", "De meeslepende, bombastische orkestmuziek is speciaal voor de achtbaan gecomponeerd door Ruud Bos."] },
    
    { id: 7, name: "Baron 1898", wait: 0, status: "Onderhoud", rijk: "Ruigrijk", img: "baron-1898.png", 
      beschrijving: "Kompels gezocht! Hoogmoedige mijnbaron Gustave Hooghmoed heeft goud gevonden in de diepten van de aarde. Ondanks de waarschuwingen van de mysterieuze Witte Wieven, stuurt hij jou de mijnschacht in. Bereid je voor op een ijzingwekkende vrije val recht de donkere, mistige aarde in.", 
      duur: "2 min", feitjes: ["Tijdens de vrije val stort je maar liefst 37,5 meter verticaal naar beneden, een gat in de grond in.", "De massieve klok bovenaan de toren luidt daadwerkelijk iedere keer als er een treintje vol kompels vertrekt.", "Let op de prachtige details: het hele gebouw is ontworpen als een authentieke Nederlandse steenkolenmijn uit eind 19e eeuw."] },
    
    { id: 8, name: "De Vliegende Hollander", wait: 0, status: "Onderhoud", rijk: "Ruigrijk", img: "de-vliegende-hollander.png", 
      beschrijving: "De gierige kapitein Willem van der Decken trotseerde een zware storm op Paaszondag en bracht daarmee een eeuwige vloek over zijn schip. Stap aan boord van dit vervloekte schip in de zeventiende-eeuwse haven, vaar de donkere, mistige zeeholte in en ontsnap via een spectaculaire waterafdaling uit zijn klauwen!", 
      duur: "3,5 min", feitjes: ["De prachtige gevels in de wachtrij en haven zijn exacte kopieën van bestaande historische panden uit Nederlandse Hanzesteden.", "De huiveringwekkende mist in de donkere tunnel onderin het gebouw wordt gemaakt van ijskoud, verneveld water.", "Het is een combinatie van een darkride, een achtbaan én een waterattractie (een zogenaamde watercoaster)."] },
    
    { id: 9, name: "Sprookjesbos", wait: 0, status: "Open", rijk: "Marerijk", img: "sprookjesbos.png", 
      beschrijving: "Welkom in mijn betoverde bos, waar sprookjes voor eeuwig voortleven. Wandel over de slingerende zandpaden, luister naar de wind in de bladeren en ontdek de verhalen van Roodkapje, de sluwe wolf, de Dansende Schoentjes en Langnek. Neem de tijd, want in dit woud is magie overal te vinden.", 
      duur: "Zelf bepalen", feitjes: ["Dit is waar het allemaal begon: het bos opende op 31 mei 1952 met slechts 10 originele sprookjes.", "De legendarische illustrator Anton Pieck ontwierp de kenmerkende, romantische sfeer van het bos.", "Vroeger werden alle bewegende figuren in het bos bestuurd met behulp van ouderwetse, draaiende grammofoonplaten."] },
    
    { id: 10, name: "Carnaval Festival", wait: 0, status: "Open", rijk: "Reizenrijk", img: "carnaval-festival.png", 
      beschrijving: "Reis in slechts een paar minuten de hele wereld rond! Neem plaats in een vrolijk karretje en laat de immer lachende Jokie de Prrretneus je meenemen van de Nederlandse klederdracht tot aan de jungles van Afrika en de besneeuwde bergtoppen van de Alpen. Een feest van kleur en muziek!", 
      duur: "8 min", feitjes: ["Het extreem herkenbare (en aanstekelijke) deuntje is geschreven door de bekende cabaretier Toon Hermans.", "Tijdens deze overdekte reis passeer je meer dan 270 vrolijk bewegende en zingende poppen.", "In Japan bestaat een bijna identieke attractie die met de hulp van de Efteling is ontworpen."] },
    
    { id: 11, name: "Monorail", wait: 0, status: "Open", rijk: "Reizenrijk", img: "monorail.png", 
      beschrijving: "Stap in de charmante, kruipende slakkentreintjes en zweef kalmpjes over het Volk van Laaf. Vanuit de lucht krijg je een uniek, rustgevend panorama van de Efteling. Perfect om even de benen te laten rusten terwijl de wereld onder je door trekt.", 
      duur: "12 min", feitjes: ["Zin in actie? Je kunt zelf de pedalen gebruiken om je slak voort te bewegen, of gewoon ontspannen en hem het werk laten doen.", "Het biedt een van de mooiste fotomomenten om het Lavenlaar van bovenaf te bekijken.", "Let maar eens op: elke houten slak waar je in zit heeft een eigen, uniek serienummer op zijn huisje."] },
    
    { id: 12, name: "Fata Morgana", wait: 0, status: "Open", rijk: "Anderrijk", img: "fata-morgana.png", 
      beschrijving: "Vaar mee naar de Verboden Stad uit de legendarische vertellingen van 1001 Nacht. Jouw sloep glijdt door donkere oerwouden, bruisende Oosterse markten en zwaar bewaakte paleiskamers. Pas op voor de reusachtige Djinn en de slinkse krokodillen in het water!", 
      duur: "8 min", feitjes: ["Tijdens je mysterieuze boottocht kom je maar liefst meer dan 130 complexe, bewegende animatronics tegen.", "Let op de luchtlucht: de jungle scène ruikt daadwerkelijk naar een vochtig, tropisch oerwoud door verborgen geurverspreiders.", "De zware paleisdeuren openen niet elektrisch; ze worden puur opengeduwd door de waterstroming van jouw naderende boot!"] },
    
    { id: 13, name: "Gondoletta", wait: 0, status: "Open", rijk: "Reizenrijk", img: "gondoletta.png", 
      beschrijving: "Laat de drukte van het park even achter je. Neem plaats in een overdekt bootje en dobber een kleine twintig minuten lang over de rimpelloze Siervijver. Geniet van de prachtige bloementuinen, kwakende eendjes en de betoverende achtergrondmuziek.", 
      duur: "20 min", feitjes: ["Geloof het of niet, dit systeem is oorspronkelijk aangelegd om de boten van Fata Morgana te testen!", "Het gigantische wiel dat alle boten onzichtbaar voortrekt, ligt stil en verborgen onder het wateroppervlak.", "Dit is veruit de populairste attractie om even een broodje te eten en de voeten rust te geven."] },
    
    { id: 14, name: "Halve Maen", wait: 0, status: "Open", rijk: "Ruigrijk", img: "halve-maen.png", 
      beschrijving: "Kies het ruime sop en trotseer de golven! Dit machtige VOC-schip deinst niet terug voor een storm. Krijg de kriebels in je buik wanneer dit kolossale schommelschip je metershoog de lucht in zwiept, om je vervolgens weer meedogenloos te laten vallen.", 
      duur: "3 min", feitjes: ["Toen hij werd gebouwd, stond de Halve Maen officieel in het Guinness Book of Records als grootste schommelschip ter wereld.", "Op zijn hoogste punt zwaait dit gigantische schip naar een hoek van maar liefst 180 graden.", "Ondanks zijn grootte wordt het hele schip aangedreven door één enkele, grote autoband onder de kiel!"] },
    
    { id: 15, name: "Max & Moritz", wait: 0, status: "Open", rijk: "Anderrijk", img: "max-en-moritz.png", 
      beschrijving: "Die dekselse kwajongens Max en Moritz hebben weer snode plannen! Neem plaats in hun zelfgebouwde zeepkisten en raas met een rotsnelheid door het dennenbos. Let goed op, want deze twee bengels halen allerlei streken uit tijdens jouw rit...", 
      duur: "2 min", feitjes: ["Deze vrolijke dubbele achtbaan is gebouwd op de exacte locatie van de legendarische Zwitserse Bobsleebaan.", "Omdat de rit zo kort is, maakt het treintje altijd standaard twéé rondes over de baan.", "Probeer maar eens op de 'scheetkussens' in de wachtrij te zitten... Ze produceren échte windgeluiden!"] },
    
    { id: 16, name: "Pagode", wait: 0, status: "Open", rijk: "Reizenrijk", img: "pagode.png", 
      beschrijving: "Verhef jezelf boven de bomen en ontdek het park zoals de vogels dat doen. Stap in deze schitterende Thaise tempel die traag en gracieus opstijgt naar grote hoogte. Terwijl hij rustig ronddraait, heb je een onbelemmerd, 360-graden uitzicht over het hele Rijk der Fantasie.", 
      duur: "5 min", feitjes: ["Tijdens de piek van de vlucht bevind je je maar liefst 45 meter boven de grond.", "De indrukwekkende en massieve hef-arm weegt een duizelingwekkende 225 ton.", "De techniek achter deze zwevende tempel komt direct uit de zware offshore kraan-industrie."] },
    
    { id: 17, name: "Piraña", wait: 0, status: "Onderhoud", rijk: "Anderrijk", img: "pirana.png", 
      beschrijving: "Durf jij de wildwaterrivier te trotseren? Neem plaats in een dobberend vlot en laat je meevoeren over de woeste stroomversnellingen van de Piraña. Langs oude Inca-tempels, gevaarlijke rotsen en spugende godenbeelden. Eén waarschuwing: je blijft niet droog!", 
      duur: "5 min", feitjes: ["Toen de Piraña opende in 1983, was het de allereerste wildwaterbaan van zijn soort in de hele wereld.", "Aan het einde van de rit wachten de watergoden Acolna en Chura om je nog één laatste, kletsnatte groet te brengen.", "De gigantische pompen verplaatsen samen maar liefst 3,5 miljoen liter kolkend water per uur."] },
    
    { id: 18, name: "Stoomcarrousel", wait: 0, status: "Open", rijk: "Marerijk", img: "stoomcarrousel.png", 
      beschrijving: "Stap terug in de tijd in dit warme, rijkversierde paleis van spiegels en lichtjes. Kies een prachtig uitgesneden paard of neem plaats in een sierlijk koetsje. De ronkende tonen van het authentieke orgel en het gedempte carrousel-licht zorgen voor pure, klassieke romantiek.", 
      duur: "2 min", feitjes: ["De Efteling bouwde de molen niet zelf, maar kocht deze unieke 19e-eeuwse kermismolen op in 1955.", "De schitterende, nostalgische muziek komt uit een écht en origineel Gavioli-draaiorgel.", "Voordat hij een vaste plek in het park kreeg, trok deze carrousel jarenlang over kermissen door heel Nederland."] },
    
    { id: 19, name: "Villa Volta", wait: 0, status: "Open", rijk: "Marerijk", img: "villa-volta.png", 
      beschrijving: "Treed binnen in het weelderige huis van Hugo van den Loonsche Duynen. Maar wees op je hoede! Ooit plunderde hij als leider van de wrede Bokkenrijders een abdij en haalde een gruwelijke vloek op zijn hals. Niets is meer wat het lijkt: onder en boven versmelten in een duizelingwekkende illusie.", 
      duur: "10 min", feitjes: ["Villa Volta opende in 1996 en was hiermee officieel het allereerste moderne 'Madhouse' ter wereld.", "Hugo, de vloek en de Bokkenrijders zijn gebaseerd op een bestaande en donkere 18e-eeuwse Brabantse sage.", "Een geheim: jij gaat helemaal niet over de kop! Alleen de muren van de kamer draaien rond, jouw bank schommelt slechts."] }
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