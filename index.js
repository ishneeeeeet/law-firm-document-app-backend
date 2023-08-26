const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const cors = require("cors"); // Add this line to enable CORS

const app = express();

// Enable CORS to allow communication from your React frontend
app.use(cors());

// Enable file uploads
app.use(fileUpload());

app.post("/extract-text", (req, res) => {
    if (!req.files || !req.files.pdfFile) {
        res.status(400).send("No files were uploaded.");
        return;
    }

    const pdfFile = req.files.pdfFile;

    // Extract text from the uploaded PDF file
    pdfParse(pdfFile.data).then(result => {
        res.json({ text: result.text });
    }).catch(error => {
        res.status(500).json({ error: "Failed to extract text from PDF." });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
