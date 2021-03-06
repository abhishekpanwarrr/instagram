import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { List } from 'react-content-loader'
import { getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from './SuggestedProfile'


const Suggestions = ({userId,following,loggedInUserDocId}) => {
  const [profiles,setProfiles] = useState(null)

  useEffect(() => {
    async function suggestedProfiles(){
      const response  = await getSuggestedProfiles(userId,following)
      setProfiles(response)
    }
    if(userId) {
      suggestedProfiles()
    }
  },[userId,following])
  return !profiles ? (
    <List />
  ) : profiles.length > 0 ? (
      <div className='rounded flex flex-col'>
        <div className='text-sm flex items-center align-items justify-between mb-2'>
          <p className='font-bold text-gray-base'>Suggestions For You</p>
        </div>
        <div className='mt-4 grid gap-5'>
          {profiles.map(profile => {

            return <SuggestedProfile key={profile.docId} profileDocId={profile.docId} username={profile.username} profileId={profile.userId} userId={userId} loggedInUserDocId={loggedInUserDocId} />  
          })
            }
        </div>
      </div>
  ) : null ;
}

export default Suggestions

Suggestions.propTypes={
  userId:PropTypes.string,
  following:PropTypes.array,
  loggedInUserDocId:PropTypes.string
}