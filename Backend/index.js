import express from 'express';
import multer from 'multer';
import cors from 'cors';
import docxConverter from 'docx-pdf';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Ensure the uploads directory exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

const port = 4001;

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/convertFile', upload.single('file'), function (req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const outputPath = path.join(
            __dirname,
            "files",
            `${path.basename(req.file.originalname, path.extname(req.file.originalname))}.pdf`
        );

        docxConverter(req.file.path, outputPath, (err, result) => {
            if (err) {
                console.error('Conversion error:', err);
                return res.status(500).json({ message: err.message });
            }
            res.download(outputPath, () => {
                console.log('File successfully converted');
                // Optionally, delete the files after download
                fs.unlinkSync(req.file.path); // Delete the uploaded file
                fs.unlinkSync(outputPath); // Delete the converted PDF
            });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
