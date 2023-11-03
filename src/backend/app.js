const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
app.use(express.static(path.join(__dirname, "../../public/images")));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

/// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Replace with your frontend's URL
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/all-nft", (req, res) => {
  const filePath = path.join(__dirname, "../../data/available-nfts.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) res.status(500).json({ Message: "Unable to read file content" });
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

app.get("/user-nfts",(req,res)=>{
  const filePath = path.join(__dirname, "../../data/user-nfts.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) res.status(500).json({ Message: "Unable to read file content" });
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
  
})

app.put("/all-nft", (req, res) => {
  const { places } = req.body;
  const filePath = path.join(__dirname, "../../data/user-nfts.json");

  fs.writeFile(filePath, JSON.stringify(places), (err) => {
    if (err) {
      return res.status(500).json({ message: "Unable to write to file" });
    }
    res.json({ message: "Data written successfully." });
  });
});


app.route("/images/:id").get((req, res) => {
  const { id } = req.params;
  const imgPath = path.join(__dirname, `../../public/images/${id}.png`);
  if (fs.existsSync(imgPath)) {
    res.sendFile(imgPath);
  } else {
    res.status(404).send("Image not found");
  }
});

app.get("*", (req, res) => {
  res.status(404).send({ message: "Route Does not exist" });
});

app.listen(3000, () => {
  console.log("Backend serving on port 3000");
});
