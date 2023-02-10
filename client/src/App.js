import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_URL);
      setPosts(result.data);
    };

    fetchData();
  }, []);

  const handleCreate = async (data) => {
    const result = await axios.post(API_URL, data);
    setPosts([...posts, result.data]);
  };

  const handleUpdate = async (id, data) => {
    const result = await axios.patch(`${API_URL}/${id}`, data);
    setPosts(
      posts.map((post) => (post.id === id ? { ...post, ...result.data } : post))
    );
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div>
      <h1>CRUD operations with Axios and JSON API</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>
                <button onClick={() => handleUpdate(post.id, { title: "Updated" })}>
                  Update
                </button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleCreate({ title: "New Post" })}>Create</button>
    </div>
  );
};

export default App;
