import React,{useReducer,useEffect} from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import { getUserByUsername, getUserPhotosByUsername } from '../../services/firebase'
import Photos from './Photos'

const UserProfile = ({username}) => {

  const reducer = (state,newState) => ({...state, ...newState})
  const initialState ={
    profile:{},
    photoCollection:[],
    followerCount:0
  }
  const [{profile,photoCollection,followerCount}, dispatch] = useReducer(reducer,initialState)
  useEffect(() =>{
    async function getProfileInfoAndPhotos(){
      const [user] = await getUserByUsername(username)
      const photos  = await getUserPhotosByUsername(user.userId)
      dispatch({profile:user,photoCollection:photos,followerCount:user.followers.length})
    }
    getProfileInfoAndPhotos()
  },[username])

  return (
    <div>
      <Header photosCount={photoCollection ?photoCollection.length : 0 } profile={profile} followerCount={followerCount} setFollowerCount={dispatch}  />
      <Photos photos={photoCollection} />
    </div>
  )
}

export default UserProfile
UserProfile.propTypes={
  username:PropTypes.string.isRequired
//   user:PropTypes.shape({
//       dateCreated:PropTypes.number.isRequired,
//       emailAddress:PropTypes.string.isRequired,
//       followers:PropTypes.array.isRequired,
//       following:PropTypes.array.isRequired,
//       fullname:PropTypes.string.isRequired,
//       userId:PropTypes.string.isRequired,
//       // username:PropTypes.string.isRequired
//   })
}