const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint for Report Analysis
app.post('/api/analyze-report', upload.single('report'), (req, res) => {
    const { language } = req.body;
    
    // Mock response data
    res.json({
        success: true,
        analysis: {
            summary: `Report analyzed successfully in ${language || 'English'}. All vital metrics appear within normal ranges.`,
            note: "Disclaimer: This AI summary is for informational purposes only. Please consult a medical professional."
        }
    });
});

// Fallback route: serve index.html for any other request
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
