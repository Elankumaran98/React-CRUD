import { useEffect} from 'react'
import axios from "axios"

const Home = () => {
  useEffect(() => {
    loadData();
  }, [])
  const loadData=async() => {
    const response=await axios.get('http://localhost:3003/users')
    console.log(response.data)
  }
  return (
    <div className='container'>
        Home
    </div>
  )
}

export default Home