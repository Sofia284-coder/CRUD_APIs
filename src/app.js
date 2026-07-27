import express from "express";
const app = express();
const port = 3000;

import CRUDRoutes from "./routes/CRUDRoutes.js"

//middleware
app.use(express.json())


//routes
app.use('/', CRUDRoutes)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});