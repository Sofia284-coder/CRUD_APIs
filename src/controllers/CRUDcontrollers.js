import { json } from "express";

const tasks = [
  { id: 1, title: "wake up", done: true },
  { id: 2, title: "brush teeth", done: false },
  { id: 3, title: "have existential crises", done: true }
];

export function getDescription(req, res) {
    
    res.json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
     
}

export function getHealth(req, res) {
    
    
    res.json({ "status": "ok" });
     
     
}

export function getAll(req, res) {
    
    
    res.json(tasks);
       
}

export function getByID(req, res) {
    
    const reqID = req.params.id; 

    
    const task = tasks.find(t => t.id === Number(reqID));

    if (!task){
        return res.status(404).json({ error: `Task ${reqID} not found` });
    }

    return res.json(task);
 
}
