import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [update, setUpdate] = useState({ id: "", name: "" });

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

  //delete user
  const deleteUser = (id) => {
    axios.delete(`http://localhost:3003/users/${id}`);
    setTimeout(() => {
      loadData();
    }, 500);
  };

  //update User
  const updateUser = (id) => {
    axios
      .put(`http://localhost:3003/users/${update.id}`, {
        id: update.id,
        name: update.name,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <button
            className="btn btn-danger m-3"
            onClick={() => {
              deleteUser(user.id);
            }}
          >
            Delete
          </button>
          <div>
            <div className="p-2">
              <input
                className="form-control m-3"
                placeholder="Enter Updated Id"
                onChange={(e) => setUpdate({ ...update, id: e.target.value })}
              />
              <input
                className="form-control m-3"
                placeholder="Enter Updated Name"
                onChange={(e) => setUpdate({ ...update, name: e.target.value })}
              />
              <button className=" btn btn-warning m-3" onClick={updateUser}>
                Update
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
