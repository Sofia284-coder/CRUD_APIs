import { json } from "express";

export function getDescription(req, res) {
    
    res.json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
     
}

export function getHealth(req, res) {
    
    
    res.json({ "status": "ok" });
     
     
}