import {collection,query, where, onSnapshot, getDocs, limit, doc ,updateDoc, arrayRemove, arrayUnion} from 'firebase/firestore'
import { database } from '../lib/firebase'
const collectionRef  = collection(database,'usres')



export async function doesUserNameExist(username){
    const queryR = query(collectionRef,where('username', '==', username))
    onSnapshot(queryR, (data) =>  {
        // console.log(data.docs.length)
        return data.docs.length > 0
    }
    )
}

export async function getUserByUsername(username){
    const queryR = query(collectionRef,where('username', '==', username))
    const querySnapshot = await getDocs(queryR);
    const data = querySnapshot.docs.map(item => ({...item.data(),docId:item.id}))
    // let user;
    // querySnapshot.forEach((doc) => {
    //     user = {...doc.data(),docId:doc.id}
    // });
        return data
}

export async function getUserByUserId(userId){
    const queryR = await  query(collectionRef,where('userId', '==', userId))
    const querySnapshot = await getDocs(queryR);
    let user;
    querySnapshot.forEach((doc) => {
        user = {...doc.data(),docId:doc.id}
    });
    // onSnapshot(queryR,(data) => {
        //      const user = {...data.docs,docId:data.docs.map(item => item.id)}
        //      console.log(user);
        //      return user
        // })
        return user
        
    }
    
    
    export async function getSuggestedProfiles(userId,following){
        const queryR = await  query(collectionRef,limit(10))
        let querySnapshot = await getDocs(queryR);
        // let user;
        // querySnapshot.docs.filter(profile => profile.id !== userId && !following.includes(profile.id)).forEach((doc) => user = {...doc.data(),docId:doc.id})
        // querySnapshot.forEach((doc) => {
            //     user = {...doc.data(),docId:doc.id}
            // })
            const data = querySnapshot.docs.map((user) => ({...user.data(),docId:user.id}))
            const result=    data.filter((profile) => profile.userId !== userId && !following.includes(profile.userId))
            return result
        }
        
        
        export async function updateLoggedInUserFollowing(loggedInUserDocId,profileId,isFollowingProfile){
            // const queryR = await  query(collectionRef,where('docId', '==', loggedInUserDocId))
            const docRef = doc(database,'usres',loggedInUserDocId)
            // let querySnapshot = await getDoc(docRef);
            const data = await updateDoc(docRef,{
                following: isFollowingProfile ? arrayRemove(profileId) : arrayUnion(profileId)
            })
            return data
        }
        export async function updateFollowedUserFollowers(profileDocId,loggedInUserDocId,isFollowingProfile){
            // const queryR = await  query(collectionRef,where('docId', '==', loggedInUserDocId))
            const docRef = doc(database,'usres',profileDocId)
            // let querySnapshot = await getDoc(docRef);
            const data =  await updateDoc(docRef,{
                followers:isFollowingProfile ? arrayRemove(loggedInUserDocId) : arrayUnion(loggedInUserDocId)
            })
            return data
        }

        export async function getPhotos(userId,following){
            const collectionRef  = collection(database,'photos')
            const queryR =   query(collectionRef,where('userId', 'in', following))
            const querySnapshot = await getDocs(queryR);
            let userFollowedPhotos =  querySnapshot.docs.map((doc) => ({...doc.data(),docId:doc.id}))
            const photosWithUserDetails = Promise.all(
                userFollowedPhotos.map( async(photo) => {
                    let userLikedPhoto = false
                    if(photo.likes.includes(userId)){
                        userLikedPhoto = true;
                    }
                    const user = await getUserByUserId(photo.userId)
                    const {username} = user
                    return {username, ...photo,userLikedPhoto}
                })
                )
                return photosWithUserDetails
            }
    export async function getUserPhotosByUsername(userId){
                    const collectionRef  = collection(database,'photos')
                    const queryR =   query(collectionRef,where('userId', '==', userId))
                    const querySnapshot = await getDocs(queryR);
                    const photos = querySnapshot.docs.map(item => ({...item.data(),docId:item.id}))
                    return photos
                }  
    export async function isUserFollowingProfile(loggedInUserUsername,profileUserId) {
        const collectionRef  = collection(database,'usres')
        const queryR =   query(collectionRef,where('username', '==', loggedInUserUsername), where('following', 'array-contains', profileUserId))
        const querySnapshot = await getDocs(queryR);
        const photos = querySnapshot.docs.map(item => ({...item.data(),docId:item.id}))
        return photos

    } 
    export async function toggleFollow(
        isFollowingProfile,
        activeUserDocId,
        profileDocId,
        profileUserId,
        followingUserId
      ) {
        // 1st param: karl's doc id
        // 2nd param: raphael's user id
        // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
        await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
      
        // 1st param: karl's user id
        // 2nd param: raphael's doc id
        // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
        await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
      }