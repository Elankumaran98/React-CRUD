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
  const addUser=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:3003/users",{id,name}).then(()=>{
      setId('');
      setName('');
    }).catch(err=>{
      console.log(err)
    })
    console.log(id,name)
  }


  return (
    <div className="container">
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter Id"
      ></input>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      ></input>
      <button onClick={addUser}>Add User</button>
      
      
      {users.map((user) => (
        <div key={user.id}>
          {user.id} {user.name}
        </div>
      ))}
    </div>
  );
};

export default Home;
