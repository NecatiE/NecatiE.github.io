document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent reload

    const formData = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        r1: parseInt(document.getElementById('rate1').value),
        r2: parseInt(document.getElementById('rate2').value),
        r3: parseInt(document.getElementById('rate3').value)
    };


    console.log(formData); // Print object

    // Calculate Average
    const average = ((formData.r1 + formData.r2 + formData.r3) / 3).toFixed(1);
    
    // Determine Color
    // Color-coding logic (Checked from highest to lowest)
        let color = "";

        if (average >= 7) { 
    // This catches everything from 7.0 up to 10.0
            color = "green";
        }else if (average >= 4) { 
    // This only catches values between 4.0 and 6.9 
    // because anything 7+ was already caught above
            color = "orange";
        }else { 
    // This catches everything from 0.0 up to 3.9
        color = "red";
        }

    // Display Results
    const resultsDiv = document.getElementById('form-results');
    resultsDiv.style.display = 'block';
    resultsDiv.style.zIndex = "999"; // Ensure it stays on top of layers
    resultsDiv.style.position = "relative"; // Fixes potential "under-layer" issues

    resultsDiv.innerHTML = `
        <div style="padding: 20px; background: #fff; border: 1px solid #ddddddff; border-radius: 8px;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Surname:</strong> ${formData.surname}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Address:</strong> ${formData.address}</p>
            <p><strong>Ratings:</strong> Technical: ${formData.r1}, Comm: ${formData.r2}, Creative: ${formData.r3}</p>
            <hr>
            <h4 style="color: ${color}; font-weight: bold;">${formData.name} ${formData.surname}: ${avg}</h4>
        </div>
    `;

    alert("Form submitted successfully!"); // Basic success popup
});

const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

// Validation Rules (Regex)
const regexLetters = /^[A-Za-z]+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const addressRegex = /^[A-Za-z0-9\s.,/]+$/;

function validateField(input, condition) {
    if (condition) {
        input.style.border = "2px solid green"; // Visible feedback
        return true;
    } else {
        input.style.border = "2px solid red"; // Visible feedback
        return false;
    }
}

function checkFormValidity() {
    // Existing validations for Name, Surname, Email, Address...
    const isNameValid = validateField(document.getElementById('name'), /^[A-Za-z]+$/.test(document.getElementById('name').value));
    const isSurnameValid = validateField(document.getElementById('surname'), /^[A-Za-z]+$/.test(document.getElementById('surname').value));
    const isEmailValid = validateField(document.getElementById('email'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('email').value));
    const isAddressValid = validateField(document.getElementById('address'),addressInput.value.trim().length > 5 && addressRegex.test(addressInput.value));

    
    // STRICT PHONE VALIDATION
    const phoneInput = document.getElementById('phone');
    // The format "+370 6xx xxxxx" is exactly 14 characters long
    const isPhoneValid = validateField(phoneInput, phoneInput.value.length === 14 && phoneInput.value.startsWith('+370 6'));

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = !(isNameValid && isSurnameValid && isEmailValid && isAddressValid && isPhoneValid);
}

// Fixed Phone Masking Listener
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Extract digits only
    
    // Ensure it starts with 370
    if (!value.startsWith('370')) value = '370' + value;

    let formatted = '+370';
    if (value.length > 3) {
        // Automatically add the space and the "6" for Lithuanian mobile 
        formatted += ' ' + value.substring(3, 4); 
    }
    if (value.length > 4) {
        formatted += value.substring(4, 6);
    }
    if (value.length > 6) {
        formatted += ' ' + value.substring(6, 11);
    }
    
    e.target.value = formatted.substring(0, 14); // Limit to correct length
    checkFormValidity();
});


const icons = ['🚀', '🎨', '💻', '⚽', '🍕', '🌈', '🎸', '🕹️', '🐱', '🐘', '🍕', '☀️'];
let gameCards = [];
let flippedCards = [];
let moves = 0;
let matches = 0;
let canFlip = true;

const board = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const matchesDisplay = document.getElementById('matches');
const winMessage = document.getElementById('win-message');
const difficultySelect = document.getElementById('difficulty');

function initGame() {
    // Reset state
    board.innerHTML = '';
    flippedCards = [];
    moves = 0;
    matches = 0;
    canFlip = true;
    movesDisplay.textContent = moves;
    matchesDisplay.textContent = matches;
    winMessage.classList.add('hidden');

    // Determine grid size
    const difficulty = difficultySelect.value;
    const cardCount = difficulty === 'easy' ? 12 : 24;
    board.className = `game-board grid-${difficulty}`;

    // Select subset of icons and double them
    const selectedIcons = icons.slice(0, cardCount / 2);
    gameCards = [...selectedIcons, ...selectedIcons]
        .sort(() => Math.random() - 0.5); // Shuffle

    // Generate HTML
    gameCards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;
        card.innerHTML = `
            <div class="card-front">?</div>
            <div class="card-back">${icon}</div>
        `;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (!canFlip || this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    canFlip = false;
    const [card1, card2] = flippedCards;

    if (card1.dataset.icon === card2.dataset.icon) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matches++;
        matchesDisplay.textContent = matches;
        flippedCards = [];
        canFlip = true;
        
        if (matches === gameCards.length / 2) {
            winMessage.classList.remove('hidden');
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

// Event Listeners
document.getElementById('start-btn').addEventListener('click', initGame);
document.getElementById('restart-btn').addEventListener('click', initGame);
difficultySelect.addEventListener('change', initGame);
