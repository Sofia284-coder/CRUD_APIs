import Database from "better-sqlite3";

const db = new Database("tasks.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY,
        title TEXT,
        done BOOLEAN
    );
`);

const count = db.prepare("SELECT COUNT(*) AS count FROM tasks").get();

if (count.count === 0) {
    const insert = db.prepare(
        "INSERT INTO tasks (title, done) VALUES (?, ?)"
    );

    insert.run("Buy groceries", 0);
    insert.run("Finish assignment", 0);
    insert.run("Read a book", 1);
}

export default db;