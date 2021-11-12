const express = require("express");
const dotenv = require("dotenv");
const port = 8080;
const cors = require("cors");
const app = express();
app.use(cors());
dotenv.config();

app.get("/getAPIKEY", (req, res) => {
  res.json({ data: process.env.AI_API_KEY }); //  응답 보내기
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
