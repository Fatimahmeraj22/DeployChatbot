import express from "express";
import path from "path"; // new line
import { fileURLToPath } from "url"; // new line

const __filename = fileURLToPath(import.meta.url); // new line
const __dirname = path.dirname(__filename); // new line

const app = express();
const PORT = 5003;

app.use(express.static(path.join(__dirname, "build"))); // new line

app.get("/meraj", (req, res) => {
    try {
        res.status(200).json({ message: "Hello, meraj!" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// new 3 lines
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});