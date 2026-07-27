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

export function createTask(req, res) {

    const newID = tasks.at(-1).id + 1;
    const {title} = req.body;
    console.log(title)

    if (!title){
        return res.status(400).json("The title is empty or missing");
    }

    const createdTask = { id: newID, title: title , done: false}
    
    tasks.push(createdTask);

    return res.status(201).json(createdTask);

}
