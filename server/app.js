const express = require('express');
const cors = require('cors');
require("./dataConfig.js/dbConnection");
const router = require("./routers/index");
const app = express();

app.use(express.json());

app.use(cors({
    origin: "*",
    credentials: true
}));

app.get("/", (req, res) => { return res.send("Hi, APIs are working here......."); })
app.use("/api/v1", router);

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
