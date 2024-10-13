import { Storage } from "@google-cloud/storage";
import { config } from "../../Config/app.config.js";

const projectId = config.storage.fileStorage.googleCloud.projectId;
const keyFilename = config.storage.fileStorage.googleCloud.keyFilename;

const storage = new Storage({ projectId, keyFilename });

// Upload a file to Google Cloud Storage
export const googleCloudUploader = async (bucketName, file, fileOutputName) => {
  try {
    // Get a reference to the specified bucket
    const bucket = storage.bucket(bucketName);

    // Upload the specified file to the bucket with the given destination name
    const [fileUpload] = await bucket.upload(file, {
      destination: fileOutputName,
    });

    // Get the authenticated URL for the uploaded file
    const [url] = await fileUpload.getSignedUrl({
      action: "read",
      expires: Date.now() + 2 * 30 * 24 * 60 * 60 * 1000, // URL expires in 2 months
    });

    console.log("url")
    return url;
  } catch (error) {
    console.error("Error(upload):", error);
  }
};

export const addImageToCloudinary = async (imagePath) => {
  const { secure_url } =
    await cloudinary.v2.uploader.upload(imagePath, {
      folder: "chorus",
    });

  return secure_url;
}