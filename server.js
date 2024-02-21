const express = require("express");
const app = express();
const PORT = 3001;
const Post = require("./postModel");
const Author = require("./authorModel");
const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://mandeep:mandeep97@cluster0.arljdl3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

// API Routes

// GET request to retrieve all posts
app.get("/api/get", async (req, res) => {
  try {
    const posts = await Post.find().populate("authorId");

    res.json({ posts });
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.use(express.json());

// POST request to retrieve all posts
app.post("/api/post", async (req, res) => {
  try {
    // Extracting data from the request body
    const { authorName, authorEmail, postTitle, postContent } = req.body;

    // Creating a dummy author
    const newAuthor = new Author({
      name: authorName || "John Doe",
      email: authorEmail || "john.doe@example.com",
      bio: "A passionate blogger",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedAuthor = await newAuthor.save();

    // Creating a dummy blog post
    const newPost = new Post({
      title: postTitle || "Sample Blog Post",
      content: postContent || "This is the content of the sample blog post.",
      authorId: savedAuthor._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedPost = await newPost.save();

    res.json({
      message: "Dummy data saved successfully!",
      post: savedPost,
      author: savedAuthor,
    });
  } catch (error) {
    console.error("Error saving dummy data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

if (mongoose.connection.readyState !== 1) {
  console.error("Error connecting to MongoDB Atlas");
} else {
  console.log("MongoDB connection status: Connected");
}
