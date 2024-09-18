const path = require('path');
const express = require('express');
const multer = require('multer');
const app = express();
const PORT = 8000;

// Multer setup for file uploads, storing files in the 'profiles/' folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './profiles')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({ storage: storage })
// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

// Middleware for parsing form data
app.use(express.urlencoded({ extended: false }));

// Route to render the homepage with the upload form
app.get('/', (req, res) => {
    return res.render('homepage');
});

// Route to handle file upload
app.post('/profile', upload.single('profileImage'), (req, res) => {
    console.log(req.body);  // Logs the form fields (if any)
    console.log(req.file);  // Logs the file info uploaded via Multer

    return res.redirect('/');
});

// Start the server
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
