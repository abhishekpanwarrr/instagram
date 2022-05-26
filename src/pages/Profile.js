import React,{useState,useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUserByUsername } from '../services/firebase'
import * as ROUTES from '../constants/routes'
import Header from '../components/Header'
import UserProfile from '../components/profile'


const Profile = () => {
  const {username} = useParams()
  const navigate = useNavigate()
  const [user,setUser] = useState(null)

  useEffect(() => {
    async function checkUserExists(){
      const user = await getUserByUsername(username);
      // console.log(doesUserExists.length);
      if(user.length > 0){
        setUser(user[0])
      }else{
          navigate(ROUTES.NOT_FOUND)
      }
    }
  if(username){
    checkUserExists()
  }
  },[username,navigate])

  return user?.username ? (
    <div className='bg-gray-background'>
        <Header />
        <div className='mx-auto max-w-screen-lg'>
          <UserProfile username={username} />
        </div>
    </div>
  ) :null
}

export default Profile