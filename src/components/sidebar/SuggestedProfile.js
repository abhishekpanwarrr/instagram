import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/firebase'

const SuggestedProfile = ({profileDocId,username,profileId,userId,loggedInUserDocId}) => {
    const [followed,setFollowed] = useState(false)

    const handleFollowUser = async() => {
        setFollowed(true);
        console.log('buttonclicked');
        await updateLoggedInUserFollowing(loggedInUserDocId,profileId,false)
        await updateFollowedUserFollowers(profileDocId,userId,false)
    }
  return (
    !followed ? (
        <div className='flex flex-row items-center align-items justify-between'>
            <div className='flex item-center justify-between'>
                <img className='rounded-full w-8 flex mr-3' src='/images/avatars/karl.jpg' alt='ProfileImage' />
                <Link to={`/p/${username}`} ><p className='font-bold text-sm'>{username}</p></Link>
            </div>
            <button onClick={handleFollowUser} className='text-sm font-bold text-blue-medium' type='button'>Follow</button>
        </div>
    ) :null
  )
}

export default SuggestedProfile

SuggestedProfile.propTypes={
    profileDocId:PropTypes.string,
    username:PropTypes.string,
    profileId:PropTypes.string,
    userId:PropTypes.string
}