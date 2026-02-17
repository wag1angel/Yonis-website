// ===== JOBB DATA =====
// Alla mina jobb i en lista
const jobs = [
  {
    company: "Fryshuset",
    role: "Trygghetsvärd",
    from: "apr 2024",
    to: "maj 2025",
    fromYear: 2024,
    toYear: 2025,
    tasks: [
      "Skapade en trygg miljö för ungdomar som trygghetsvärd på Fryshuset.",
      "Var en närvarande vuxen och förebyggde konflikter.",
      "Byggde relationer och samarbetade med skolor, fritidsgårdar och lokala föreningar för att ge ungdomarna stöd."
    ]
  },
  {
    company: "Fryshuset IT avdelning",
    role: "Praktik",
    from: "aug 2022",
    to: "jun 2023",
    fromYear: 2022,
    toYear: 2023,
    tasks: [
      "Hantering av skolkonton och teknikrelaterade problem för elever.",
      "Support inom system som Schoolsoft och Google Drive."
    ]
  },
  {
    company: "Matrix",
    role: "",
    from: "jun 2022",
    to: "aug 2022",
    fromYear: 2022,
    toYear: 2022,
    tasks: [
      "Hanterade kassaarbete, betalningar och returer, samt säkerställde korrekt kassaredovisning.",
      "Assisterade kunder med produktfrågor och bidrog till en positiv kundupplevelse."
    ]
  },
  {
    company: "IRepairofSweden",
    role: "",
    from: "aug 2021",
    to: "jun 2022",
    fromYear: 2021,
    toYear: 2022,
    tasks: [
      "Mottog och dokumenterade trasiga mobiler.",
      "Identifierade skador och skickade vidare till reparationsavdelningen."
    ]
  },
  {
    company: "Myrorna",
    role: "",
    from: "apr 2019",
    to: "maj 2019",
    fromYear: 2019,
    toYear: 2019,
    tasks: [
      "Sorterade och packade kläder för försäljning och distribution.",
      "Bidrog till att hålla arbetsytor organiserade och effektiva."
    ]
  },
  {
    company: "Rollers and Bowlers",
    role: "",
    from: "apr 2018",
    to: "maj 2018",
    fromYear: 2018,
    toYear: 2018,
    tasks: [
      "Ansvarade för kassatjänst och servering av mat till kunder.",
      "Upprätthöll en trevlig atmosfär och gav god service i en snabbmatsmiljö."
    ]
  },
  {
    company: "Jordbro Direkten",
    role: "",
    from: "apr 2017",
    to: "maj 2017",
    fromYear: 2017,
    toYear: 2017,
    tasks: [
      "Hanterade kassaarbete och hjälpte kunder med betalningar.",
      "Assisterade med diverse arbetsuppgifter för att säkerställa en smidig butikdrift."
    ]
  }
];

// ===== CV-SIDAN (index.html) =====
function initIndex() {
  // Hitta element på sidan
  const jobsContainer = document.querySelector('#jobs-container');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const sortSelect = document.querySelector('#sort-select');
  
  // Om inte på CV-sidan, sluta här
  if (!jobsContainer) return;
  
  // Hämta vad användaren valde förra gången från localStorage
  let savedFilter = localStorage.getItem('userFilter');
  if (!savedFilter) {
    savedFilter = 'all'; // första gången = visa alla
  }
  
  let savedSort = localStorage.getItem('userSort');
  if (!savedSort) {
    savedSort = 'newest'; // första gången = nyast först
  }
  
  // spara valen i variabler som kan ändras
  let currentFilter = savedFilter;
  let currentSort = savedSort;
  
  // Huvudfunktionen som visar jobben
  function renderJobs() {
    const jobsArray = jobs;
    
    // FILTRERA - visa bara jobb som matchar året
    let filteredJobs = jobsArray.filter(function(job) {
      // om "Alla" valt, visa allt
      if (currentFilter === 'all') {
        return true;
      }
      
      // gör "2024" (text) till 2024 (nummer)
      const filterYear = parseInt(currentFilter);
      
      // kolla om det blev ett nummer
      if (!isNaN(filterYear)) {
        // visa jobb som pågick under detta år
        // exempel: Fryshuset (2024-2025) pågick 2024? Ja!
        return job.fromYear <= filterYear && job.toYear >= filterYear;
      }
      
      return true;
    });
    
    // SORTERA - ordna jobben
    // slice() kopierar först så original inte ändras
    filteredJobs = filteredJobs.slice().sort(function(a, b) {
      // Nyast först (b - a = större tal först)
      if (currentSort === 'newest') {
        return b.toYear - a.toYear;
      }
      
      // äldst först (a - b = mindre tal först)
      if (currentSort === 'oldest') {
        return a.fromYear - b.fromYear;
      }
      
      // A-Ö (svenska alfabetet)
      if (currentSort === 'alphabetical') {
        return a.company.localeCompare(b.company, 'sv');
      }
      
      return 0;
    });
    
    // töm sidan först så jobben inte staplas
    jobsContainer.innerHTML = '';
    
    // om inga jobb matchar, visa meddelande
    if (filteredJobs.length === 0) {
      const noJobs = document.createElement('p');
      noJobs.className = 'no-jobs';
      noJobs.textContent = 'Inga jobb hittades med valt filter.';
      jobsContainer.appendChild(noJobs);
      return;
    }
    
    // skapa HTML för varje jobb
    filteredJobs.forEach(function(job) {
      // skapa accordion (details-tagg)
      const details = document.createElement('details');
      details.className = 'job-accordion';
      
      // skapa rubriken (summary-tagg)
      const summary = document.createElement('summary');
      
      // lägg till roll om jobbet har en
      let roleText;
      if (job.role) {
        roleText = ' - ' + job.role; // t.ex. " - Trygghetsvärd"
      } else {
        roleText = ''; // inget för Matrix
      }
      
      // sätt ihop företagsnamn + roll med HTML
      const companyStrong = '<strong>' + job.company + roleText + '</strong>';
      const dateSpan = '<span class="job-date">(' + job.from + ' – ' + job.to + ')</span>';
      summary.innerHTML = companyStrong + ' ' + dateSpan;
      
      // skapa lista för arbetsuppgifter
      const ul = document.createElement('ul');
      ul.className = 'job-details-list';
      
      // för varje uppgift, skapa li-element
      job.tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.textContent = task;
        ul.appendChild(li); // lägg li i ul
      });
      
      // sätt ihop allt
      details.appendChild(summary); // rubrik i accordion
      details.appendChild(ul);      // lista i accordion
      jobsContainer.appendChild(details); // accordion på sidan
    });
  }
  
  // FILTER-KNAPPAR
  filterButtons.forEach(function(btn) {
    // Gör rätt knapp aktiv från början
    if (btn.getAttribute('data-filter') === currentFilter) {
      btn.classList.add('active');
    }
    
    // lyssna på klick
    btn.addEventListener('click', function() {
      // ta bort aktiv från alla knappar
      filterButtons.forEach(function(b) {
        b.classList.remove('active');
      });
      
      // gör klickad knapp aktiv
      btn.classList.add('active');
      
      // spara vilket filter som klickades
      currentFilter = btn.getAttribute('data-filter');
      
      // kom ihåg valet
      localStorage.setItem('userFilter', currentFilter);
      
      // visa jobben igen med nytt filter
      renderJobs();
    });
  });
  
  // SORTERING
  // visa vad användaren valde förra gången
  sortSelect.value = currentSort;

  // när användaren ändrar val i dropdown
  sortSelect.addEventListener('change', function(e) {
    // ta det nya valet
    currentSort = e.target.value;
  
    // kom ihåg valet
    localStorage.setItem('userSort', currentSort);
  
    // visa jobben med ny sortering
    renderJobs();
  });
  
  // visa jobben första gången
  renderJobs();
}

// ===== BETYG-FORMULÄR (letter.html) =====
function initRating() {
  // hitta formulär och success-meddelande
  const ratingForm = document.querySelector('#rating-form');
  const ratingSuccess = document.querySelector('#rating-success');
  
  // om inte på letter.html, sluta här
  if (!ratingForm) return;
  
  // när användaren klickar "Skicka betyg"
  ratingForm.addEventListener('submit', function(e) {
    // stoppa sidladdning (annars försvinner allt)
    e.preventDefault();
    
    // hämta valt betyg från dropdown
    const stars = document.querySelector('#rating-stars').value;
    const errorElement = document.querySelector('#error-rating');
    
    // kolla om användaren glömde välja
    // !stars betyder "om INTE stars "
    if (!stars) {
      errorElement.textContent = 'Du måste välja ett betyg.';
      return; // sluta här, kör inte resten
    }
    
    // Allt ok! Visa success
    errorElement.textContent = ''; // rensa röd feltext
    ratingForm.classList.add('hidden'); // dölj formuläret (display: none)
    
    // sätt ihop meddelande med HTML
    const successMessage = '<p>✅ Tack för ditt betyg: ' + stars + '/5 stjärnor!</p>';
    ratingSuccess.innerHTML = successMessage;
    
    ratingSuccess.classList.remove('hidden'); // visa meddelandet
  });
}

// ===== STARTA ALLT =====
// vänta tills HTML är laddat, sen kör
document.addEventListener('DOMContentLoaded', function() {
  initIndex();   // starta filter/sortering/visa jobb
  initRating();  // starta betygsformulär
});