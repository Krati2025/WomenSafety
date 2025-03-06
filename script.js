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
    // Mentorship Registration Schema
const mentorshipSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Full Name
    email: { type: String, required: true }, // Email Address
    interests: { type: String, required: true }, // Interests
    goals: { type: String, required: true }, // Goals for Mentorship
});

// Create the Mentorship model
const Mentorship = mongoose.model('Mentorship', mentorshipSchema);
// API Endpoint to Handle Mentorship Registration
app.post('/submit-mentorship-registration', async (req, res) => {
    try {
        console.log("Received Mentorship Data:", req.body); // Log incoming data

        const { name, email, interests, goals } = req.body;

        // Ensure all fields exist
        if (!name || !email || !interests || !goals) {
            return res.status(400).send("All fields are required.");
        }

        const newMentorship = new Mentorship({ name, email, interests, goals });

        await newMentorship.save();
        console.log("Mentorship Data saved to MongoDB:", newMentorship); // Log successful save

        res.status(201).send("Mentorship registration submitted successfully!");
    } catch (error) {
        console.error("Error submitting mentorship registration:", error);
        res.status(500).send("Error submitting mentorship registration.");
    }
});
document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault();  

    const formData = new FormData(this);

    try {
        const response = await fetch('/submit-mentorship-registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                interests: formData.get('interests'),
                goals: formData.get('goals'),
            }),
        });

        const result = await response.text(); 
        alert(result);  
        this.reset();  
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});


});