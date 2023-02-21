import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const response = await axios.get("http://localhost:3003/users");
    console.log(response.data);
    setUsers(response.data);
  };
  return (
    <div className="container">
      {users.map((user) => (
        <div>
          {user.id} {user.name}
        </div>
      ))}
    </div>
  );
};

export default Home;
