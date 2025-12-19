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
    resultsDiv.innerHTML = `
        <hr>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Surname:</strong> ${formData.surname}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone number:</strong> ${formData.phone}</p>
        <p><strong>Address:</strong> ${formData.address}</p>
        <p style="font-weight: bold; color: ${color};">
            ${formData.name} ${formData.surname}: ${average}
        </p>
    `;

    alert("Form submitted successfully!"); // Basic success popup
});

const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

// Validation Rules (Regex)
const regexLetters = /^[A-Za-z]+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    const isNameValid = validateField(document.getElementById('name'), regexLetters.test(document.getElementById('name').value));
    const isSurnameValid = validateField(document.getElementById('surname'), regexLetters.test(document.getElementById('surname').value));
    const isEmailValid = validateField(document.getElementById('email'), regexEmail.test(document.getElementById('email').value));
    const isAddressValid = validateField(document.getElementById('address'), document.getElementById('address').value.trim().length > 5);
    
    const phoneInput = document.getElementById('phone');
    const isPhoneValid = validateField(phoneInput, phoneInput.value.length >= 15);

    // The Submit button must remain disabled until ALL fields are valid
    submitBtn.disabled = !(isNameValid && isSurnameValid && isEmailValid && isAddressValid && isPhoneValid);
}

// Phone masking for Lithuanian format: +370 6xx xxxxx
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Allow only digits
    if (!value.startsWith('370')) value = '370' + value;
    
    let formatted = '+370';
    if (value.length > 3) formatted += ' ' + value.substring(3, 4);
    if (value.length > 4) formatted += value.substring(4, 6);
    if (value.length > 6) formatted += ' ' + value.substring(6, 11);
    
    e.target.value = formatted.substring(0, 15);
    checkFormValidity();
});

// Add listeners for real-time feedback
['name', 'surname', 'email', 'address'].forEach(id => {
    document.getElementById(id).addEventListener('input', checkFormValidity);
});

