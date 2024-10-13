import { ScholarshipValidator } from "./scholarship.validator.js";
import ScholarshipServices from "./scholarship.services.js"
import { googleCloudUploader } from "../../Shared/utils/uploadFileToCloud.js";

export default class ScholarshipController {

    static async createScholarship(req, res) {
        try {
            console.log("image", req.files["coverImage"])
            
            const data = req.body;

            const { error } = ScholarshipValidator.validateCreateScholarshipInput(data);
    
            if (error) {
                res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details,
                });
        
                return;
            }

            const scholarship = await ScholarshipServices.createScholarship(data);

            res.status(200).json({ message: "Scholarship created successfully", scholarship });

          } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllOpenScholarships(req, res) {
        try {
            
            const { pageNumber, pageSize, sort } = req.query;
            const skip = (pageNumber - 1) * pageSize;
    
            const { error } = ScholarshipValidator.validateGetAllScholarships({ pageNumber, pageSize, sort });
    
            if (error) {
                res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details,
                });
        
                return;
            }
    
            const options = {sort, skip, limit: pageSize || 10}
    
            const scholarships = await ScholarshipServices.getAllScholarships(options);
    
            res.status(200).json({message: "Open Scholarships retrieved succesfully.", scholarships})
        } catch (error) {
            res.status(500).json({error})
    
        }
    }

    static async handleFileUpload(req, res) {
        try {
            const [{ originalname: fileName, path: filePath }] = req.files["file"];
            
            const fileUrl = await googleCloudUploader(
                "grdr",
                filePath,
                fileName
            );
            
            res.status(200).json({url: fileUrl})
            
        } catch (error) {
            res.status(500).json({error})
        }
        
    }
}