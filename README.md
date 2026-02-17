# 📄 Yonis Yusuf - CV Webbplats

En interaktiv CV-webbplats byggd med HTML, CSS och JavaScript som visar min arbetslivserfarenhet med avancerad funktionalitet.

## 💡 Inspiration & Bakgrund

https://wag1angel.github.io/Yonis-website/

Detta projekt började med mitt fysiska CV i PDF-format som jag använt för jobbansökningar. Jag insåg att ett digitalt CV skulle vara mycket mer lättillgängligt - något jag enkelt kan dela via en länk istället för att skicka filer. Det kändes också som en perfekt möjlighet att visa mina tekniska färdigheter direkt genom själva CV:t.

![Det ursprungliga PDF-CVt som inspirerade webbplatsen](CV-Yonis-Yusuf.pdf)

Idén var enkel: Ta mitt befintliga CV och omvandla det till en responsiv, modern webbplats som fungerar lika bra på mobilen som på datorn. Samtidigt ville jag bygga något jag kan fortsätta utveckla - en grund för en framtida portfolio.

---

## 🎯 Projektbeskrivning

En responsiv CV-webbplats med **interaktiv JavaScript-funktionalitet**. Webbplatsen består av tre sidor:

- **CV-sida** (index.html) - Arbetslivserfarenhet med **filter, sortering och dynamisk rendering**
- **Personligt brev** (letter.html) - Presentation med **betygsformulär och validering**
- **Kontakt** (kontakt.html) - Kontaktuppgifter

---

## ✨ JavaScript-funktioner (NYTT!)

### 🔍 Filter & Sortering
- **Årfilter**: Filtrera jobb baserat på år (2026, 2025, 2024, osv.)
- **Sortering**: 
  - Nyast först (b - a)
  - Äldst först (a - b)
  - Alfabetisk ordning (A-Ö med svenska regler)
- **Smart filterlogik**: Jobb som sträcker sig över flera år visas i båda åren
  - Exempel: Fryshuset (2024-2025) visas både vid filter "2024" OCH "2025"

### 💾 LocalStorage
- Kommer ihåg användarens val mellan besök
- Sparar både filter och sortering
- Automatisk återställning vid sidladdning
- Ger bättre användarupplevelse - slipper välja om varje gång

### ⭐ Betygsformulär
- Betygsätt mitt personliga brev (1-5 stjärnor)
- **Validering**:
  - Kontrollerar att användaren valt betyg
  - Visar felmeddelande om inget valt
  - Success-meddelande efter betygsättning
- **UI-feedback**:
  - Formuläret döljs vid success
  - Tack-meddelande visas med valt betyg

### 🎨 Dynamisk Rendering
- Jobs renderas från JavaScript-array
- `createElement` och `appendChild` för DOM-manipulation
- Accordion-struktur för varje jobb
- Uppdateras automatiskt vid filter/sortering

---

## 🛠️ Tekniker

### HTML5
- Semantisk markup
- Tillgänglighet (ARIA, skip-link)
- `<details>` och `<summary>` för accordion

### CSS3
- Responsiv design
- Flexbox och Grid
- CSS-variabler
- Hamburger meny (checkbox-hack)
- Reduced motion support

### JavaScript (ES5)
- **DOM-manipulation**: 
  - `querySelector`, `querySelectorAll`
  - `createElement`, `appendChild`
  - `classList.add/remove`
  - `innerHTML`, `textContent`
- **Array-metoder**: 
  - `.filter()` för filtrering
  - `.sort()` för sortering
  - `.forEach()` för rendering
  - `.slice()` för array-kopiering
- **Event listeners**:
  - `click` för filter-knappar
  - `change` för dropdown
  - `submit` för formulär
  - `DOMContentLoaded` för init
- **LocalStorage API**:
  - `getItem()` för att hämta
  - `setItem()` för att spara
- **Formulärvalidering**:
  - `preventDefault()` för att stoppa sidladdning
  - Villkorlig logik för validering
  - UI-feedback med felmeddelanden

---

## 📂 Projektstruktur
```
📦 cv-projekt/
├── 📄 index.html          # CV-sida med filter & sortering
├── 📄 letter.html         # Personligt brev med betygsformulär
├── 📄 kontakt.html        # Kontaktsida
├── 📄 style.css           # All styling (~350 rader)
├── 📄 main.js             # JavaScript-funktionalitet (~290 rader)
└── 📁 assets/             # Bilder och ikoner
    ├── person-small.webp
    ├── person-medium.webp
    ├── person-large.webp
    ├── bag-small.webp
    ├── bag-medium.webp
    └── bag-large.webp
```

---

## 🎓 Skolprojekt - JavaScript i praktiken

Detta är mitt slutprojekt i JavaScript-kursen. Projektet demonstrerar:

### Uppfyllda krav:

**Struktur:**
- ✅ Minst 3 HTML-sidor (index, letter, kontakt)
- ✅ Extern JS-fil (main.js)
- ✅ Organiserad kod med funktioner

**JavaScript-funktioner (minst 3, varav 1 form):**
1. ✅ **Form + validering** (KRAV) - Betygsformulär med dropdown-validering
2. ✅ **Dynamisk lista** - Jobs renderas från array med `createElement`
3. ✅ **Filter/sortering** - Årfilter + 3 sorteringsalternativ
4. ✅ **LocalStorage** - Sparar användarens filter- och sorteringsval

**Kodkvalitet:**
- ✅ Tydlig struktur med funktioner (`initIndex`, `initRating`, `renderJobs`)
- ✅ Återanvändbar kod (render-funktion anropas vid alla uppdateringar)
- ✅ Kommentarer på svenska för att förklara logik
- ✅ State-hantering med variabler (`currentFilter`, `currentSort`)

**Tillgänglighet:**
- ✅ Tangentbordsnavigation fungerar
- ✅ UI-feedback ("Inga jobb hittades", felmeddelanden, success)
- ✅ Inga brutna flöden

---

## 💡 JavaScript-koncept som används

### 1. DOM-manipulation
```javascript
// Hitta element
const jobsContainer = document.querySelector('#jobs-container');

// Skapa element
const details = document.createElement('details');

// Lägg till på sidan
jobsContainer.appendChild(details);
```

### 2. Filter-logik
```javascript
// Visa bara jobb som pågick under valt år
let filteredJobs = jobs.filter(function(job) {
  return job.fromYear <= filterYear && job.toYear >= filterYear;
});
```

### 3. Sortering
```javascript
// Nyast först
filteredJobs.sort(function(a, b) {
  return b.toYear - a.toYear;
});
```

### 4. LocalStorage
```javascript
// Spara val
localStorage.setItem('userFilter', currentFilter);

// Hämta nästa gång
const saved = localStorage.getItem('userFilter');
```

### 5. Formulärvalidering
```javascript
if (!stars) {
  errorElement.textContent = 'Du måste välja ett betyg.';
  return;
}
```

---

## 🧗 Utmaningar & Lösningar

### Utmaning 1: Jobb över flera år
**Problem**: Fryshuset (apr 2024 - maj 2025) ska visas både vid filter "2024" OCH "2025".

**Första lösningen**: Dela upp i två separata jobb-objekt.
- ❌ **Problem**: Samma jobb visades två gånger på sidan.

**Slutlig lösning**: 
- Lagt till `fromYear` och `toYear` i varje jobb-objekt
- Smart filter-logik: `job.fromYear <= filterYear && job.toYear >= filterYear`
- ✅ **Resultat**: Ett jobb, men visas i flera år!
```javascript
{
  company: "Fryshuset",
  from: "apr 2024",
  to: "maj 2025",
  fromYear: 2024,  // För filtrering
  toYear: 2025     // För filtrering
}
```

### Utmaning 2: localStorage vid första besöket
**Problem**: Hur hantera när inget finns sparat?

**Lösning**: Default-värden med if-satser
```javascript
let savedFilter = localStorage.getItem('userFilter');
if (!savedFilter) {
  savedFilter = 'all'; // Default
}
```

### Utmaning 3: Sortering utan att ändra original
**Problem**: `.sort()` ändrar original-arrayen!

**Lösning**: Kopiera först med `.slice()`
```javascript
filteredJobs = filteredJobs.slice().sort(function(a, b) {
  return b.toYear - a.toYear;
});
```

### Utmaning 4: Formulär som laddar om sidan
**Problem**: När formulär skickas laddas sidan om och allt försvinner.

**Lösning**: `e.preventDefault()`
```javascript
ratingForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Stoppa sidladdning!
  // Hantera formulär med JavaScript istället
});
```

---

## 📸 Skärmdumpar

### Desktop-vy med Filter & Sortering
![Desktop CV-sida med filter-knappar och sortering](screenshot-desktop.png)
*CV-sidan med interaktiva filter (Alla, 2026, 2025, 2024) och dropdown för sortering*

### Mobil-vy
![Mobil vy med öppen hamburgermeny](screenshot-mobile.png)
*Responsiv design med hamburgermeny*

---

## 🚀 Publicering

Webbplatsen är publicerad på GitHub Pages:
👉 **https://wag1angel.github.io/Yonis-website/**

---

## 🚀 Framtidsplaner

Den här webbplatsen är bara början. Mina planer inkluderar:

- **Portfolio-sektion**: Visa mina kodprojekt med demos och källkod
- **Projekt-loggar**: Dokumentera min utveckling och vad jag lär mig
- **Interaktiva demos**: Experimentera med nya tekniker och visa upp dem
- **Blogg**: Skriva om utmaningar jag löst och saker jag lärt mig
- **Fler JavaScript-funktioner**:
  - Sökfält för att söka i jobb
  - Export till PDF-funktion
  - Dark mode med toggle
  - Fler filter-alternativ (företag, roll)

---

## 📜 Licens

Detta projekt är skapat för utbildningssyfte.

---

## 📧 Kontakt

**Yonis Yusuf**  
📧 yonis.yusuf1@outlook.com  
📱 072-256 0919  
💼 [GitHub](https://github.com/wag1angel)

---

⭐ **Ge gärna feedback genom betygsformuläret på letter.html!**

---

*Skapat som examinationsprojekt i JavaScript Grundkurs - IT-Högskolan 2025*
