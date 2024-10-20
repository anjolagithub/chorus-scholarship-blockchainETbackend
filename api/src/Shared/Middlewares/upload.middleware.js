import multer from "multer"

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const uploadMultiple = upload.fields([
  { name: "file", maxCount: 1 },
]);

export const handleUpload = (req, res, next) => {
  uploadMultiple(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(500).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading
      return res
    .status(500)
        .json({ err, error: "An error occurred while uploading the file." });
    }

    // No errors, proceed to the next middleware or route handler
    next();
  });
};
