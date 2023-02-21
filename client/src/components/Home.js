import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  //get user from api
  const loadData = async () => {
    const response = await axios.get("http://localhost:3003/users");
    console.log(response.data);
    setUsers(response.data);
  };

  //add user
  const addUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3003/users", { id, name })
      .then(() => {
        setId("");
        setName("");
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      loadData();
    }, 500);
    console.log(id, name);
  };

  //delete use
  const deleteUser = (id) => {
    axios.delete(`http://localhost:3003/users/${id}`)
    setTimeout(() => {
      loadData();
    }, 500);
  };

  return (
    <div className="container">
      <form className="m-2 p-2">
        <div class="mb-3">
          <label className="form-label">Enter Id</label>

          <input
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter Id"
          />
        </div>
        <div class="mb-3">
          <label className="form-label">Enter Name</label>

          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </div>

        <button className="btn btn-success" onClick={addUser}>
          Add User
        </button>
      </form>

      {users.map((user) => (
        <div className="m-3 card text-center" key={user.id}>
          {user.id} {user.name}
          <button className="btn btn-danger m-3" onClick={()=>{
            deleteUser(user.id)
          }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
