import {useState,useContext,useEffect} from 'react'
import FirebaseContext from '../context/firebase'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
export default function useAuthListner(){
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('authUser')))
    const {firebase} = useContext(FirebaseContext)
    
    useEffect(() => {
        const auth = getAuth()
        const listner = onAuthStateChanged(auth,(authUser) => {
            if(authUser){
                localStorage.setItem('authUser', JSON.stringify(authUser))
                setUser(authUser)
            }else{
                localStorage.removeItem('authUser')
                setUser(null)
            }
        })

        return () => listner()
    },[firebase,user])

    return {user}
}