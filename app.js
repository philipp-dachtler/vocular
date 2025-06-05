// Einfacher Vokabelspeicher
let vocabulary = [
    { german: "Haus", english: "house" },
    { german: "Auto", english: "car" }
];

let stats = {
    correct: 0,
    wrong: 0
};

// DOM-Elemente
const flashcard = document.getElementById('flashcard');
const cardFront = document.querySelector('.card-front');
const cardBack = document.querySelector('.card-back');
const wrongBtn = document.getElementById('wrong-btn');
const correctBtn = document.getElementById('correct-btn');
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Aktuelle Vokabel
let currentVocabIndex = 0;
let isFlipped = false;

// Tab-Wechsel
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Tabs anzeigen/verstecken
        tabContents.forEach(tab => tab.style.display = 'none');
        document.getElementById(tabId).style.display = 'block';
        
        // Aktiven Button markieren
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Vokabelliste aktualisieren
        if (tabId === 'setup-tab') {
            updateVocabList();
        }
        
        // Statistiken aktualisieren
        if (tabId === 'stats-tab') {
            document.getElementById('correct-count').textContent = stats.correct;
            document.getElementById('wrong-count').textContent = stats.wrong;
        }
    });
});

// Karteikarten-Logik
flashcard.addEventListener('click', () => {
    if (vocabulary.length === 0) {
        cardFront.textContent = "Füge zuerst Vokabeln hinzu!";
        return;
    }
    
    if (!isFlipped) {
        cardFront.style.display = 'none';
        cardBack.style.display = 'flex';
        cardBack.textContent = vocabulary[currentVocabIndex].english;
        isFlipped = true;
    } else {
        cardFront.style.display = 'flex';
        cardBack.style.display = 'none';
        cardFront.textContent = vocabulary[currentVocabIndex].german;
        isFlipped = false;
    }
});

// Buttons für richtig/falsch
wrongBtn.addEventListener('click', () => {
    stats.wrong++;
    nextCard();
});

correctBtn.addEventListener('click', () => {
    stats.correct++;
    nextCard();
});

// Nächste Karte
function nextCard() {
    currentVocabIndex = (currentVocabIndex + 1) % vocabulary.length;
    cardFront.textContent = vocabulary[currentVocabIndex].german;
    cardFront.style.display = 'flex';
    cardBack.style.display = 'none';
    isFlipped = false;
}

// Vokabeln hinzufügen
document.getElementById('add-btn').addEventListener('click', () => {
    const germanInput = document.getElementById('german-input');
    const englishInput = document.getElementById('english-input');
    
    if (germanInput.value && englishInput.value) {
        vocabulary.push({
            german: germanInput.value,
            english: englishInput.value
        });
        
        germanInput.value = '';
        englishInput.value = '';
        updateVocabList();
    }
});

// Vokabelliste aktualisieren
function updateVocabList() {
    const list = document.getElementById('vocab-list');
    list.innerHTML = '';
    
    vocabulary.forEach((vocab, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${vocab.german} - ${vocab.english}</span>
            <button class="delete-btn" data-index="${index}">×</button>
        `;
        list.appendChild(li);
    });
    
    // Löschen-Buttons hinzufügen
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            vocabulary.splice(index, 1);
            updateVocabList();
        });
    });
}

// Initialisierung
cardFront.textContent = vocabulary.length > 0 ? vocabulary[0].german : "Füge Vokabeln hinzu";
