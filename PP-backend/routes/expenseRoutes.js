import express from "express";
import multer from "multer";
import { DocumentProcessorServiceClient } from "@google-cloud/documentai";
import fs from "fs/promises";
import Expense from "../models/Expense.js";

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// The Document AI client will automatically use the path from the GOOGLE_APPLICATION_CREDENTIALS
// environment variable to find the JSON key file.
const client = new DocumentProcessorServiceClient();

// Document AI configuration (replace with your values from the Google Cloud Console)
const projectId = "your-gcp-project-id"; 
const location = "us-central1"; // Or the location of your processor
const processorId = "your-processor-id"; // The ID of your Expense Parser

router.post("/scan-receipt", upload.single("receipt"), async (req, res) => {
    // ... rest of the code remains the same
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    const filePath = req.file.path;

    try {
        const fileBuffer = await fs.readFile(filePath);
        const encodedImage = Buffer.from(fileBuffer).toString('base64');

        const request = {
            name: `projects/${projectId}/locations/${location}/processors/${processorId}`,
            rawDocument: {
                content: encodedImage,
                mimeType: req.file.mimetype,
            },
        };

        const [result] = await client.processDocument(request);

        const extractedData = {};
        const entities = result.document.entities;

        for (const entity of entities) {
            if (entity.type === 'total_amount') {
                extractedData.amount = parseFloat(entity.normalizedValue?.text);
            } else if (entity.type === 'vendor_name') {
                extractedData.vendor = entity.mentionText;
            } else if (entity.type === 'purchase_date') {
                extractedData.date = new Date(entity.normalizedValue?.text);
            }
        }
        await fs.unlink(filePath);
        
        // ... create and save expense
        const newExpense = new Expense({
            description: `Scanned receipt from ${extractedData.vendor}`,
            amount: extractedData.amount || 0,
            vendor: extractedData.vendor || 'Unknown',
            date: extractedData.date || new Date(),
        });
        await newExpense.save();
        
        res.status(201).json({ 
            message: "Receipt scanned and saved successfully.",
            expense: newExpense
        });

    } catch (error) {
        console.error("Document AI processing failed:", error);
        await fs.unlink(filePath);
        res.status(500).json({ message: "Error processing the receipt." });
    }
});

export default router;