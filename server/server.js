import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("server is ready");
});

app.listen(4000, () => {
    console.log("server started at port 4000");
});
