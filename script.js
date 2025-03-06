function sendSOS() {
    alert("Emergency SOS Alert Sent! Please ensure you are safe.");
}

document.getElementById('donate-btn')?.addEventListener('click', function() {
    alert("Thank you for considering a donation!");
});

const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {  // ✅ Check if the button exists
    window.addEventListener('scroll', () => {
        backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Show the report form when the button is clicked
document.getElementById('report-btn')?.addEventListener('click', function() {
    document.getElementById('report-form').style.display = 'block';
});

// Handle form submission
document.getElementById('reportForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        city: document.getElementById('city').value,
        location: document.getElementById('location').value,
        issue: document.getElementById('issue').value,
    };

    try {
        const response = await fetch('http://localhost:5000/submit-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Your report has been submitted. We will contact you soon.');
            document.getElementById('reportForm').reset();
            document.getElementById('report-form').style.display = 'none'; // Hide the form
        } else {
            alert('Error submitting report. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});