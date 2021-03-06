import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Header from './Header';
import Image from './Image';
import Action from './Action';
import Footer from './Footer';
import Comments from './Comments';

const Post = ({content}) => {

  const commentInput = useRef(null)
  const handleFocus = () => commentInput.current.focus()


  return (
    <div className='rounded col-span-4 border border-gray-primary bg-white mb-12'>
        <Header username={content.username} />
        <Image src={content.imageSrc} caption={content.caption} />
        <Action docId={content.docId} totalLikes={content.likes.length} likedPhoto={content.userLikedPhoto} handleFocus={handleFocus} />
        <Footer caption={content.caption} username={content.username} />
        <Comments docId={content.docId} comments={content.comments} posted={content.dateCreated} commentInput={commentInput} />
    </div>
  )
}

export default Post
Post.propTypes = {
    content:PropTypes.shape({
        username:PropTypes.string.isRequired,
        imageSrc:PropTypes.string.isRequired,
        caption:PropTypes.string.isRequired,
        docId:PropTypes.string.isRequired,
        userLikedPhoto:PropTypes.bool.isRequired,
        likes:PropTypes.array.isRequired,
        comments:PropTypes.array.isRequired,
        dateCreated:PropTypes.number.isRequired
    })
}