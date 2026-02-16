// ===== JOBB DATA =====
// Här har jag alla mina jobb i en lista
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
  // Hitta element jag behöver
  const jobsContainer = document.querySelector('#jobs-container');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const sortSelect = document.querySelector('#sort-select');
  
  // Om jag inte är på CV-sidan, hoppa över resten
  if (!jobsContainer) return;
  
  // Hämta vad användaren valde förra gången
  let savedFilter = localStorage.getItem('userFilter');
  if (!savedFilter) {
    savedFilter = 'all'; // Om inget sparat, använd "Alla"
  }
  
  let savedSort = localStorage.getItem('userSort');
  if (!savedSort) {
    savedSort = 'newest'; // Om inget sparat, använd "Nyast först"
  }
  
  // Vilket filter och sortering som är aktivt nu
  let currentFilter = savedFilter;
  let currentSort = savedSort;
  
  // Funktion som visar jobben på sidan
  function renderJobs() {
    const jobsArray = jobs;
    
    // Filtrera jobben baserat på år
    let filteredJobs = jobsArray.filter(function(job) {
      // Om "Alla" är valt, visa alla jobb
      if (currentFilter === 'all') {
        return true;
      }
      
      // Gör om filter till nummer (t.ex. "2024" blir 2024)
      const filterYear = parseInt(currentFilter);
      
      // Kolla om det är ett giltigt nummer
      if (!isNaN(filterYear)) {
        // Visa jobbet om det pågick under detta år
        return job.fromYear <= filterYear && job.toYear >= filterYear;
      }
      
      return true;
    });
    
    // Sortera jobben
    filteredJobs = filteredJobs.slice().sort(function(a, b) {
      // Nyast först
      if (currentSort === 'newest') {
        return b.toYear - a.toYear;
      }
      
      // Äldst först
      if (currentSort === 'oldest') {
        return a.fromYear - b.fromYear;
      }
      
      // A-Ö
      if (currentSort === 'alphabetical') {
        return a.company.localeCompare(b.company, 'sv');
      }
      
      return 0;
    });
    
    // Ta bort alla jobb från sidan
    jobsContainer.innerHTML = '';
    
    // Om inga jobb matchar filtret
    if (filteredJobs.length === 0) {
      const noJobs = document.createElement('p');
      noJobs.className = 'no-jobs';
      noJobs.textContent = 'Inga jobb hittades med valt filter.';
      jobsContainer.appendChild(noJobs);
      return;
    }
    
    // Skapa HTML för varje jobb
    filteredJobs.forEach(function(job) {
      // Skapa accordion-elementet
      const details = document.createElement('details');
      details.className = 'job-accordion';
      
      // Skapa rubriken
      const summary = document.createElement('summary');
      
      // Lägg till roll om jobbet har en
      let roleText;
      if (job.role) {
        roleText = ' - ' + job.role;
      } else {
        roleText = '';
      }
      
      // Bygg HTML för rubriken
      const companyStrong = '<strong>' + job.company + roleText + '</strong>';
      const dateSpan = '<span class="job-date">(' + job.from + ' – ' + job.to + ')</span>';
      summary.innerHTML = companyStrong + ' ' + dateSpan;
      
      // Skapa listan med arbetsuppgifter
      const ul = document.createElement('ul');
      ul.className = 'job-details-list';
      
      // För varje uppgift, skapa ett li-element
      job.tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.textContent = task;
        ul.appendChild(li);
      });
      
      // Sätt ihop allt
      details.appendChild(summary); // Lägg rubriken i accordion
      details.appendChild(ul);      // Lägg listan i accordion
      jobsContainer.appendChild(details); // Lägg accordion på sidan
    });
  }
  
  // Lyssna på klick på filter-knapparna
  filterButtons.forEach(function(btn) {
    // Gör den sparade knappen aktiv från början
    if (btn.getAttribute('data-filter') === currentFilter) {
      btn.classList.add('active');
    }
    
    // När någon klickar på en knapp
    btn.addEventListener('click', function() {
      // Ta bort blå färg från alla knappar
      filterButtons.forEach(function(b) {
        b.classList.remove('active');
      });
      
      // Gör den klickade knappen blå
      btn.classList.add('active');
      
      // Uppdatera filtret
      currentFilter = btn.getAttribute('data-filter');
      
      // Spara valet
      localStorage.setItem('userFilter', currentFilter);
      
      // Visa jobben igen med nytt filter
      renderJobs();
    });
  });
  
  // Lyssna på dropdown för sortering
  sortSelect.value = currentSort; // Sätt till sparat värde
  
  sortSelect.addEventListener('change', function(e) {
    // Uppdatera sorteringen
    currentSort = e.target.value;
    
    // Spara valet
    localStorage.setItem('userSort', currentSort);
    
    // Visa jobben igen med ny sortering
    renderJobs();
  });
  
  // Visa jobben första gången
  renderJobs();
}

// ===== BETYG-FORMULÄR (letter.html) =====
function initRating() {
  // Hitta formuläret och success-meddelandet
  const ratingForm = document.querySelector('#rating-form');
  const ratingSuccess = document.querySelector('#rating-success');
  
  // Om jag inte är på letter.html, hoppa över
  if (!ratingForm) return;
  
  // När användaren skickar formuläret
  ratingForm.addEventListener('submit', function(e) {
    // Stoppa sidladdning
    e.preventDefault();
    
    // Hämta valt betyg
    const stars = document.querySelector('#rating-stars').value;
    const errorElement = document.querySelector('#error-rating');
    
    // Kolla om användaren valde betyg
    if (!stars) {
      errorElement.textContent = 'Du måste välja ett betyg.';
      return;
    }
    
    // Allt ok! Visa success-meddelande
    errorElement.textContent = ''; // Rensa felmeddelande
    ratingForm.classList.add('hidden'); // Dölj formuläret
    
    // Bygg success-meddelande
    const successMessage = '<p>✅ Tack för ditt betyg: ' + stars + '/5 stjärnor!</p>';
    ratingSuccess.innerHTML = successMessage;
    
    ratingSuccess.classList.remove('hidden'); // Visa meddelandet
  });
}

// ===== STARTA ALLT =====
// Kör när sidan är klar
document.addEventListener('DOMContentLoaded', function() {
  initIndex();   // Starta CV-sidan
  initRating();  // Starta betyg-formulär
});