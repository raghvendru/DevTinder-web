import axios from "axios"
import Footer from "./Footer"
import NavBar from "./NavBar"
import {Outlet, useNavigate } from "react-router-dom"
import {BASE_URL} from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"
 

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.data)
//cokies are there means i should be loged in(fech all my data)
const fetchUser =async ()=>{
  if(userData) return;

 try {
  const res = await axios.get(BASE_URL + "/profile",{
    withCredentials:true
  })
  dispatch(addUser(res.data))

}
  catch(err){
    if(err.status === 401){
      navigate("/login")


    }
    console.error(err)

  }
}

useEffect(()=>{
  
  fetchUser();
  

},[])
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body