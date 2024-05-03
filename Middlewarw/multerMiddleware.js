const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploades')
    },
    filename: (req, file, callback) => {

        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null, filename)
    }
})


const multerConfig = multer({
    storage
})
module.exports = multerConfig




// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// // Configure multer storage and file name
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // Create multer upload instance
// const addstore = multer({ storage: storage });

// // Custom file upload middleware
// const multerConfig = (req, res, next) => {
//   // Use multer upload instance
//   addstore.array('files', 5)(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }

//     // Retrieve uploaded files
//     const files = req.files;
//     const errors = [];

//     // Validate file types and sizes
//     files.forEach((file) => {
//       const allowedTypes = ['image/jpeg', 'image/png'];
//       const maxSize = 5 * 1024 * 1024; // 5MB

//       if (!allowedTypes.includes(file.mimetype)) {
//         errors.push(`Invalid file type: ${file.originalname}`);
//       }

//       if (file.size > maxSize) {
//         errors.push(`File too large: ${file.originalname}`);
//       }
//     });

//     // Handle validation errors
//     if (errors.length > 0) {
//       // Remove uploaded files
//       files.forEach((file) => {
//         fs.unlinkSync(file.path);
//       });

//       return res.status(400).json({ errors });
//     }

//     // Attach files to the request object
//     req.files = files;

//     // Proceed to the next middleware or route handler
//     next();
//   });
// };

// module.exports = multerConfig;