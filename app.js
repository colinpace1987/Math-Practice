/**
 * Math Practice - Unified Application Script
 * Optimized for categorical navigation and randomized pedagogy.
 */

const mainContainer = document.querySelector('main');
const navLinks = document.querySelectorAll('nav a');

// --- 1. The Scholarly Repository ---
const questionPool = [
    // --- Arithmetic (20 Questions) ---
    { equation: "1 + 1 = _", answer: 2, options: [1, 2, 3, 4], category: "arithmetic" },
    { equation: "12 / _ = 3", answer: 4, options: [2, 4, 6, 8], category: "arithmetic" },
    { equation: "7 + 8 = _", answer: 15, options: [13, 14, 15, 16], category: "arithmetic" },
    { equation: "9 * 3 = _", answer: 27, options: [24, 26, 27, 30], category: "arithmetic" },
    { equation: "15 - _ = 7", answer: 8, options: [6, 7, 8, 9], category: "arithmetic" },
    { equation: "20 / 5 = _", answer: 4, options: [2, 4, 5, 10], category: "arithmetic" },
    { equation: "_ + 6 = 14", answer: 8, options: [7, 8, 9, 10], category: "arithmetic" },
    { equation: "11 * 2 = _", answer: 22, options: [20, 21, 22, 24], category: "arithmetic" },
    { equation: "30 - 12 = _", answer: 18, options: [16, 17, 18, 19], category: "arithmetic" },
    { equation: "4 * _ = 16", answer: 4, options: [3, 4, 5, 6], category: "arithmetic" },
    { equation: "50 / 10 = _", answer: 5, options: [2, 5, 10, 15], category: "arithmetic" },
    { equation: "13 + _ = 20", answer: 7, options: [6, 7, 8, 9], category: "arithmetic" },
    { equation: "9 - 9 = _", answer: 0, options: [0, 1, 9, 18], category: "arithmetic" },
    { equation: "_ * 5 = 25", answer: 5, options: [4, 5, 6, 10], category: "arithmetic" },
    { equation: "18 / 2 = _", answer: 9, options: [7, 8, 9, 10], category: "arithmetic" },
    { equation: "14 + 14 = _", answer: 28, options: [26, 27, 28, 30], category: "arithmetic" },
    { equation: "25 - _ = 15", answer: 10, options: [5, 10, 15, 20], category: "arithmetic" },
    { equation: "6 * 7 = _", answer: 42, options: [36, 40, 42, 48], category: "arithmetic" },
    { equation: "100 / _ = 4", answer: 25, options: [20, 25, 30, 50], category: "arithmetic" },
    { equation: "_ + 9 = 18", answer: 9, options: [7, 8, 9, 10], category: "arithmetic" },

    // --- Algebra (20 Questions) ---
    { equation: "2x = 10, x = _", answer: 5, options: [2, 5, 8, 10], category: "algebra" },
    { equation: "x - 7 = 3, x = _", answer: 10, options: [4, 7, 10, 13], category: "algebra" },
    { equation: "3x + 1 = 7, x = _", answer: 2, options: [1, 2, 3, 4], category: "algebra" },
    { equation: "x / 2 = 6, x = _", answer: 12, options: [3, 6, 10, 12], category: "algebra" },
    { equation: "5 + x = 12, x = _", answer: 7, options: [5, 6, 7, 8], category: "algebra" },
    { equation: "4x = 20, x = _", answer: 5, options: [4, 5, 6, 10], category: "algebra" },
    { equation: "x - 5 = 5, x = _", answer: 10, options: [0, 5, 10, 15], category: "algebra" },
    { equation: "2x + 4 = 12, x = _", answer: 4, options: [2, 4, 6, 8], category: "algebra" },
    { equation: "x / 3 = 3, x = _", answer: 9, options: [1, 3, 6, 9], category: "algebra" },
    { equation: "10 - x = 4, x = _", answer: 6, options: [4, 5, 6, 14], category: "algebra" },
    { equation: "3x = 15, x = _", answer: 5, options: [3, 4, 5, 6], category: "algebra" },
    { equation: "x + 9 = 20, x = _", answer: 11, options: [9, 10, 11, 12], category: "algebra" },
    { equation: "x / 5 = 4, x = _", answer: 20, options: [1, 9, 10, 20], category: "algebra" },
    { equation: "2x - 2 = 10, x = _", answer: 6, options: [4, 6, 8, 12], category: "algebra" },
    { equation: "7x = 49, x = _", answer: 7, options: [6, 7, 8, 9], category: "algebra" },
    { equation: "x + x = 10, x = _", answer: 5, options: [2, 5, 10, 20], category: "algebra" },
    { equation: "15 / x = 3, x = _", answer: 5, options: [3, 5, 12, 18], category: "algebra" },
    { equation: "x - 12 = 8, x = _", answer: 20, options: [4, 12, 20, 28], category: "algebra" },
    { equation: "4x + 2 = 18, x = _", answer: 4, options: [2, 4, 6, 8], category: "algebra" },
    { equation: "x / 10 = 5, x = _", answer: 50, options: [2, 5, 15, 50], category: "algebra" },

    // --- Geometry (20 Questions) ---
    { equation: "Sides in a triangle: _", answer: 3, options: [1, 2, 3, 4], category: "geometry" },
    { equation: "Degrees in a right angle: _", answer: 90, options: [45, 90, 180, 360], category: "geometry" },
    { equation: "Sides in a square: _", answer: 4, options: [3, 4, 5, 6], category: "geometry" },
    { equation: "Degrees in a circle: _", answer: 360, options: [90, 180, 270, 360], category: "geometry" },
    { equation: "Sides in a pentagon: _", answer: 5, options: [4, 5, 6, 8], category: "geometry" },
    { equation: "Sides in a hexagon: _", answer: 6, options: [5, 6, 7, 8], category: "geometry" },
    { equation: "Degrees in a straight line: _", answer: 180, options: [90, 120, 180, 360], category: "geometry" },
    { equation: "Sides in an octagon: _", answer: 8, options: [6, 8, 10, 12], category: "geometry" },
    { equation: "Sum of triangle angles: _", answer: 180, options: [90, 180, 270, 360], category: "geometry" },
    { equation: "A square has _ equal sides", answer: 4, options: [2, 3, 4, 0], category: "geometry" },
    { equation: "An isosceles triangle has _ equal sides", answer: 2, options: [0, 1, 2, 3], category: "geometry" },
    { equation: "Degrees in a square: _", answer: 360, options: [180, 360, 540, 720], category: "geometry" },
    { equation: "Sides in a rectangle: _", answer: 4, options: [2, 4, 6, 8], category: "geometry" },
    { equation: "A cube has _ faces", answer: 6, options: [4, 6, 8, 12], category: "geometry" },
    { equation: "Radius is _ of diameter", answer: "0.5", options: ["0.25", "0.5", "2", "3"], category: "geometry" },
    { equation: "A decagon has _ sides", answer: 10, options: [8, 10, 12, 20], category: "geometry" },
    { equation: "A heptagon has _ sides", answer: 7, options: [6, 7, 8, 9], category: "geometry" },
    { equation: "Parallel lines meet _ times", answer: 0, options: [0, 1, 2, "Infinity"], category: "geometry" },
    { equation: "An equilateral triangle has _ equal angles", answer: 3, options: [1, 2, 3, 0], category: "geometry" },
    { equation: "A cylinder has _ circular bases", answer: 2, options: [1, 2, 3, 4], category: "geometry" }
];

// --- 2. State Management Variables ---
let currentCategory = "arithmetic";
let randomizedQuestions = [];
let currentQuestionIndex = 0;

/**
 * The Fisher-Yates Shuffle
 * Ensures a truly random distribution of inquiries.
 */
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * Filters the pool by category and shuffles the selection.
 */
function initializeSession() {
    // Filter by category (case-insensitive for robustness)
    const filtered = questionPool.filter(q => q.category === currentCategory.toLowerCase());
    
    if (filtered.length === 0) {
        mainContainer.innerHTML = `<h2 style="text-align:center;">The ${currentCategory} curriculum is forthcoming!</h2>`;
        return;
    }

    randomizedQuestions = shuffleArray(filtered);
    currentQuestionIndex = 0;
    renderQuestion();
}

/**
 * Constructing the User Interface dynamically.
 */
/**
 * Dynamically constructs the DOM elements for the current challenge,
 * now featuring vertical stacking for algebraic inquiries.
 */
function renderQuestion() {
    const q = randomizedQuestions[currentQuestionIndex]; // Corrected reference
    mainContainer.innerHTML = ''; 

    // 1. Construct the Equation Display
    const eqDiv = document.createElement('div');
    eqDiv.className = 'equation-container';
    
    // We replace the comma with a <br> to force the 'x = _' to the next line
    const formattedEquation = q.equation.replace(', ', '<br>');
    
    // We bifurcate the string at the underscore to insert our interactive 'blank'
    const parts = formattedEquation.split('_');
    const prefix = parts[0] || '';
    const suffix = parts[1] || '';
    
    eqDiv.innerHTML = `${prefix}<span class="blank">?</span>${suffix}`;
    mainContainer.appendChild(eqDiv);

    // 2. Construct the Answer Card Interface
    const cardsDiv = document.createElement('div');
    cardsDiv.className = 'cards-container';

    // Randomize the placement of the answer options
    const shuffledOptions = shuffleArray(q.options);

    shuffledOptions.forEach(val => {
        const card = document.createElement('div');
        card.className = 'answer-card';
        card.textContent = val;
        card.addEventListener('click', () => handleAttempt(val, q.answer, card));
        cardsDiv.appendChild(card);
    });

    mainContainer.appendChild(cardsDiv);
}

/**
 * Validation logic with visual feedback.
 */
function handleAttempt(selected, correct, cardEl) {
    const blank = document.querySelector('.blank');
    
    if (selected === correct) {
        blank.textContent = selected;
        blank.style.color = '#2ecc71'; // Success Green
        
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < randomizedQuestions.length) {
                renderQuestion();
            } else {
                alert(`Commendable! You have completed the ${currentCategory} module.`);
                initializeSession(); // Re-shuffle and restart the category
            }
        }, 1000);
    } else {
        cardEl.classList.add('error-shake');
        blank.style.color = '#e74c3c'; // Error Red
        
        setTimeout(() => {
            blank.style.color = 'inherit';
            cardEl.classList.remove('error-shake');
        }, 600);
    }
}

/**
 * Attaching listeners to the navigation tabs.
 */
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update state based on the clicked link
            currentCategory = link.textContent.trim().toLowerCase();
            
            // Visual update for the navigation UI
            document.querySelectorAll('nav li').forEach(li => li.classList.remove('active'));
            link.parentElement.classList.add('active');

            initializeSession();
        });
    });
}

// --- 3. Ignition ---
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    // Set the initial active state for Arithmetic
    document.querySelector('nav li').classList.add('active');
    initializeSession();
});