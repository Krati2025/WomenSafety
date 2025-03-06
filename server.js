const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(bodyParser.json()); // Parse JSON request bodies

// MongoDB Connection
const mongoURI = 'mongodb://127.0.0.1:27017/womensafety'; // Replace with your MongoDB connection string
mongoose.connect(mongoURI)
.then(() => {
    console.log('Connected to MongoDB'); // Log success message
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err); // Log error message
});

// Report Schema
const reportSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the user
    age: { type: Number, required: true }, // Age of the user
    city: { type: String, required: true }, // City of the user
    location: { type: String, required: true }, // Exact location of the user
    issue: { type: String, required: true }, // Description of the issue
});

// Create the Report model
const Report = mongoose.model('Report', reportSchema);

// API Endpoint to Handle Form Submission
app.post('/submit-report', async (req, res) => {
    try {
        console.log("Received Data:", req.body); // ✅ Log incoming data

        const { name, age, city, location, issue } = req.body;

        // ✅ Ensure all fields exist
        if (!name || !age || !city || !location || !issue) {
            return res.status(400).send("All fields are required.");
        }

        const newReport = new Report({ name, age, city, location, issue });

        await newReport.save();
        console.log("Data saved to MongoDB:", newReport); // ✅ Log successful save

        res.status(201).send("Report submitted successfully!");
    } catch (error) {
        console.error("Error submitting report:", error);
        res.status(500).send("Error submitting report.");
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the Women Safety API!');
});

app.use(cors({ origin: '*' }));



// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});