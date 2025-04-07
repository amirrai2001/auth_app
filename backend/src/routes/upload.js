const express = require('express');
const router = express.Router();
const upload = require('../controllers/uploadController');

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const filePath = `/uploads/${req.file.filename}`; // relative to /public
  res.status(200).json({ imageUrl: filePath });
});

module.exports = router;
