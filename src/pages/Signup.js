import React,{useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import { doesUserNameExist } from '../services/firebase'
import {database} from '../lib/firebase'
import { collection,addDoc } from 'firebase/firestore'

const Signup = () => {
  const [emailAddress,setEmailAddress] = useState('')
  const [password,setPassword] = useState('')
  const [userName,setUserName] = useState('')
  const [fullName,setFullName] = useState('')
  const [error,setError] = useState('')
  const isInValid = password === '' || emailAddress === ''
  let navigate = useNavigate()
  const auth  = getAuth()
  // const {firebase} = useContext(FirebaseContext)

  const handleSignup = (event) => {
      event.preventDefault();
      const usernameExist = doesUserNameExist(userName)
      const collectionRef = collection(database,'usres')
    if(usernameExist !== 0){
        createUserWithEmailAndPassword(auth,emailAddress,password).then((response) => {
            response.user.displayName = userName;
            addDoc(collectionRef,{
                userId:response.user.uid,
                username:userName.toLowerCase(),
                fullName,
                emailAddress:emailAddress.toLowerCase(),
                following:[],
                dateCreated:Date.now()
            })
            navigate(ROUTES.DASHBOARD)

        }).catch((err) => {
         setFullName('')
         setEmailAddress('')
         setPassword('')
         setError(err.message)
       })
    }else{
        setError('That username already exists')
    }
  }

  useEffect(() => {
    document.title = 'Signup - Instagram'
  },[])
  return (
    <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
        <div className='flex w-3/5'>
            <img src='/images/iphone-with-profile.jpg' alt='iphone with instagram' />
        </div>
        <div className='flex flex-col w-2/5'>
          <div className='flex flex-col items-center p-4 bg-white border border-gray-primary mb-4 rounded'>
            <h1 className='flex justify-center w-full'>
                <img src='/images/logo.png' alt='instagram' className='mt-2 w-6/12 mb-4' />
            </h1>
            {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}
            <form onSubmit={handleSignup} >
                <input aria-label='Enter your full name' type='text' placeholder='Enter your full name' className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2' value={fullName} onChange={({target}) => setFullName(target.value)} />

                <input aria-label='Enter your user name' type='text' placeholder='User name' className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2' value={userName} onChange={({target}) => setUserName(target.value)} />

              <input aria-label='Enter your email address' type='text' placeholder='Enter your email address' className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2' value={emailAddress} onChange={({target}) => setEmailAddress(target.value)} />
              
              <input aria-label='Enter your password' type='password' autoComplete='off' placeholder='Enter your password' className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2' value={password} onChange={({target}) => setPassword(target.value)} />
              
              <button disabled={isInValid} type='submit' className={`bg-blue-medium w-full rounded h-8 font-bold text-white ${isInValid && `opacity-50`}`} >Sign Up</button>
            </form>
        </div>
        <div className='flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded'>
            <p className='text-sm'>Have an account?{` `}
              <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>Sign in</Link>
            </p>
        </div>
        </div>
    </div>
  )
}

export default Signup