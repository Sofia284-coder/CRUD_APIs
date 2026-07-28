import { json } from "express";

let tasks = [
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

//curl http://localhost:3000/tasks

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

//curl -X POST http://localhost:3000/tasks \-H "Content-Type: application/json" \-d '{"title":"Learn curl"}'

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

// curl -X PUT http://localhost:3000/tasks/5 \ 
// -H "Content-Type: application/json" \
// -d '{"done":true}'

// curl -X PUT http://localhost:3000/tasks/1 \
// -H "Content-Type: application/json" \
// -d '{"title":"Master curl","done":false}'

export function updateTask(req,res) {

    const ID = req.params.id;
    const task = tasks.find(t => t.id === Number(ID));

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
        task.done = done;
    }
    return res.json(task);
}

//curl -X DELETE http://localhost:3000/tasks/5
export function deleteTask(req, res) {

    const idToRemove = req.params.id;

    const task = tasks.find(t => t.id === Number(idToRemove));

    if (!task) {
        return res.status(404).json({error: `Task ${idToRemove} not found`});
    }

    tasks = tasks.filter(t => t.id !== Number(idToRemove));

    return res.sendStatus(204);
}