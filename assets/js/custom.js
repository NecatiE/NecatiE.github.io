document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent reload [cite: 19]

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

    console.log(formData); // Print object [cite: 20]

    // Calculate Average [cite: 27]
    const avg = ((formData.r1 + formData.r2 + formData.r3) / 3).toFixed(1);
    
    // Determine Color [cite: 30]
    let color = 'red';
    if (avg >= 7) color = 'green';
    else if (avg >= 4) color = 'orange';

    // Display Results [cite: 21, 28]
    const resultsDiv = document.getElementById('form-results');
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = `
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Surname:</strong> ${formData.surname}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Address:</strong> ${formData.address}</p>
        <h4 style="color: ${color}">${formData.name} ${formData.surname}: ${avg}</h4>
    `;

    alert("Form submitted successfully!"); // Basic success popup [cite: 35]
});