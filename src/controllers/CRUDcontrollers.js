import { json } from "express";


//importing database
import db from "../database/database.js";

export function getDescription(req, res) {
    
    res.json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
     
}

export function getHealth(req, res) {
    
    
    res.json({ "status": "ok" });
     
     
}

//curl http://localhost:3000/tasks

export function getAll(req, res) {

    const tasks = db.prepare("SELECT * FROM tasks").all();

    tasks.forEach(task => {task.done = Boolean(task.done);});

    res.json(tasks);
       
}

export function getByID(req, res) {
    
    const reqID = req.params.id; 

    
    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(reqID);

    if (!task){
        return res.status(404).json({ error: `Task ${reqID} not found` });
    }

    task.done = Boolean(task.done)

    return res.json(task);
 
}

//curl -X POST http://localhost:3000/tasks \-H "Content-Type: application/json" \-d '{"title":"Learn curl"}'

export function createTask(req, res) {

    const {title} = req.body;

    if (!title){
        return res.status(400).json("The title is empty or missing");
    }

    const insert = db.prepare("INSERT INTO tasks (title, done) VALUES (?, 0)");

    const result = insert.run(title);

    const createdTask = {
        id: result.lastInsertRowid,
        title,
        done: false
    };

    return res.status(201).json(createdTask);

}

// curl -X PUT http://localhost:3000/tasks/5 \ 
// -H "Content-Type: application/json" \
// -d '{"done":true}'

// curl -X PUT http://localhost:3000/tasks/1 \
// -H "Content-Type: application/json" \
// -d '{"title":"Master curl","done":false}'

export function updateTask(req,res) {

    const ID = req.params.id;
    
    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(ID);

    if (!task) {
        return res.status(404).json({ error: `Task ${ID} not found` });
    }

    const {title, done} = req.body;


    if (title === undefined && done === undefined) {
        return res.status(400).json({error: "One of title or done must be provided"});
    }

    if (title !== undefined) {
        if (title.trim() === "") {
            return res.status(400).json({error: "Title cannot be empty"});
        }

        task.title = title;
    }

    if (done !== undefined) {
        if (typeof done !== "boolean") {
            return res.status(400).json({error: "done must be a boolean"});
        }
        task.done = done ? 1 : 0
    }

    const update = db.prepare(
        "UPDATE tasks SET title = ?, done = ? WHERE id = ?"
    );

    update.run(task.title, task.done, ID);

    return res.json({"id":Number(ID), "title":task.title, "done": Boolean(task.done) });
}

//curl -X DELETE http://localhost:3000/tasks/5
export function deleteTask(req, res) {

    const idToRemove = req.params.id;

    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(idToRemove);

    if (!task) {
        return res.status(404).json({error: `Task ${idToRemove} not found`});
    }

    db.prepare("DELETE FROM tasks WHERE id = ?").run(idToRemove);

    return res.sendStatus(204);
}