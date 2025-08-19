// App.jsx
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000"; // replace with your backend URL

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 flex justify-between rounded-b-2xl shadow-md">
    <h1 className="text-xl font-bold">My Weblog</h1>
    <div className="space-x-4">
      <a href="/" className="hover:underline">Home</a>
      <a href="/add" className="hover:underline">Add Post</a>
    </div>
  </nav>
);

const Home = ({ posts }) => (
  <div className="p-6 grid gap-6">
    {posts.map((post) => (
      <div key={post.id} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
        <h2 className="text-2xl font-bold text-blue-700">{post.title}</h2>
        <p className="text-gray-600 mt-2">{post.content.substring(0, 120)}...</p>
        <a href={`/post/${post.id}`} className="text-blue-500 mt-3 inline-block hover:underline">
          Read More
        </a>
      </div>
    ))}
  </div>
);

const AddPost = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPost({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto space-y-4 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold text-center">Add New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
        rows="5"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Publish
      </button>
    </form>
  );
};

export default function App() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from backend
  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // Add new post
  const addPost = async (post) => {
    try {
      const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      const newPost = await res.json();
      setPosts([...posts, newPost]);
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Home posts={posts} />
      <AddPost addPost={addPost} />
    </div>
  );
}
