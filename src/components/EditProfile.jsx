import { useState } from "react";
import UserCard from "./UserCard"
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {
    console.log(user.firstName)
    const [firstName,setFirstName] = useState(user.firstName||"");
  const [lastName,setLastName] = useState(user.lastName||"");
  const [age,setAge] = useState(user.age||"");
  const [gender,setGender] = useState(user.gender||"")
  const [about,setAbout] = useState(user.about||"")
  const [skills,setSkills] = useState(user.skills||"")
  const [photoUrl,setPhotoUrl] = useState(user.photoUrl||"")
  const [error,setError]=useState("")
  const dispatch =useDispatch();
  const [showtoast,setShowtoast] =useState(false)

  const saveProfile =async()=>{
    try{
        const res = await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,age,gender,about,skills,photoUrl},{withCredentials:true})
        dispatch(addUser(res?.data?.data))
        setShowtoast(true)
       setTimeout(()=>{
            setShowtoast(false);
        },3000)



    }catch(err){
        setError(err.response.data);

    }

  }

  

  return (
   <> <div className="flex justify-center my-10">
    <div className="flex justify-center mx-10">
    <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">Edit Profile</h2>
    <div  >
    <label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">First Name</span>
  </div>
  <input type="text" 
  value={firstName}
   className="input input-bordered w-full max-w-xs py-4"
   onChange={(e)=>setFirstName(e.target.value)}
    />
 
</label>

<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Last Name</span>
  </div>
  <input type="text" 
  value={lastName}
   className="input input-bordered w-full max-w-xs py-4"
   onChange={(e)=>setLastName(e.target.value)}
    />
 
</label>

<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Age</span>
  </div>
  <input type="text" 
  value={age}
   className="input input-bordered w-full max-w-xs py-4"
   onChange={(e)=>setAge(e.target.value)}
    />
 
</label>

<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">About</span>
  </div>
  <input type="text" 
  value={about}
   className="input input-bordered w-full max-w-xs py-4"
   onChange={(e)=>setAbout(e.target.value)}
    />
 
</label>

<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Gender</span>
  </div>
  <input type="text" 
  value={gender}
   className="input input-bordered w-full max-w-xs py-4"
   onChange={(e)=>setGender(e.target.value)}
    />
 
</label>

<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Skills</span>
  </div>
  <input type="text" 
  value={skills}
   className="input input-bordered w-full max-w-xs py-4"
   onChange={(e)=>setSkills(e.target.value)}
    />
 
</label>

<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">PhotoUrl</span>
  </div>
  <input type="text" 
  value={photoUrl}
   className="input input-bordered w-full max-w-xs py-4"
   onChange={(e)=>setPhotoUrl(e.target.value)}
    />
 
</label>




    </div>
    <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center my-2">
      <button className="btn btn-primary" onClick={saveProfile} >Save profile</button>
    </div>
  </div>
</div>
</div>
<UserCard user={{firstName,lastName,age,gender,about,skills,photoUrl}}/>

</div>
{showtoast&&<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>}
</>
  )
}

export default EditProfile