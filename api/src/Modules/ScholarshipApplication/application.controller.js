import { ApplicationValidator } from "./application.validator.js";
import ApplicationServices from "./application.services.js"
import {googleCloudUploader} from "../../Shared/utils/uploadFileToCloud.js";

export default class ApplicationController {

    static async createApplication(req, res) {
        try {
            const data = req.body;
            const {accountType, accountTypeId} = req.user;

            if (accountType !== "Student") {
                throw new ForbiddenException("Cannot perform this operation!");
            }

            const { error } = ApplicationValidator.validateCreateApplicationInput(data);
    
            if (error) {
                res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details,
                });
        
                return;
            }

            const createdApplication = await ApplicationServices.ceateApplication({studentId: accountTypeId, ...data});

            res.status(200).json({ message: "Application submitted successfully", application: createdApplication });
          } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllApplications(req, res) {
        try {
            
            const { pageNumber, pageSize, sort } = req.query;
            const skip = (pageNumber - 1) * pageSize;
    
            const { error } = ApplicationValidator.validateGetAllApplications({ pageNumber, pageSize, sort });
    
            if (error) {
                res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details,
                });
        
                return;
            }
    
            const options = {sort, skip, limit: pageSize || 10}
    
            const applications = await ApplicationServices.getAllApplications(options);
    
            res.status(200).json({message: "Applications retrieved succesfully.", applications})
        } catch (error) {
            res.status(500).json({error})
    
        }
    }

    static async handleFileUpload(req, res) {
        
        const { originalname: fileName, path: filePath } = req.files["file"];

        const fileUrl = await googleCloudUploader(
            "grdr",
            filePath,
            fileName
        );

        res.status(200).json({url: fileUrl})
    }
}