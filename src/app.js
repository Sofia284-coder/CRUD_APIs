import express from "express";
const app = express();
const port = 3000;

//importing database
import db from "./database/database.js";

import CRUDRoutes from "./routes/CRUDRoutes.js"
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: "json" };

//middleware
app.use(express.json())

app.use("/docs", swaggerUi.serve);
app.get("/docs", swaggerUi.setup(swaggerDocument));

//routes
app.use('/', CRUDRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});