import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { addRequests, removeRequests } from "../utils/requestSlice"
import { useEffect } from "react"
import axios from "axios"

const Requests = () => {
    const requests = useSelector((store)=>store.requests)
    const dispatch = useDispatch()

   const reviewRequests = async (status,_id)=>{
    try{
        const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true})
        dispatch(removeRequests(_id))

    }
    catch(err){

    }
    

   }

   const fetchRequests = async()=>{
    try{

        const res = await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
        dispatch(addRequests(res.data.data))
    }catch(err){

    }
   }

   useEffect(()=>{

    fetchRequests();
   },[])


   if (!requests) return null;

   if (requests.length === 0) return <h1 className="flex justify-center my-10">No requests found</h1>;
 
   return (
     <div className="text-center my-10">
       <h1 className="font-bold  text-3xl">Requests</h1>
       {requests.map((request) => {
         const { firstName, lastName, photoUrl, about, age, gender, _id } = request.fromUserId;
 
         return (
           <div key={_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
             <div>
               <img
                 alt={`${firstName} ${lastName}'s profile`}
                 className="w-20 h-20 rounded-full"
                 src={photoUrl}
               />
             </div>
             <div className="ml-4">
               <h2 className="text-xl font-semibold">{`${firstName} ${lastName}`}</h2>
               <p className="text-gray-600">{about}</p>
               {age && gender && (
                 <p className="text-gray-500">{`${age} years old, ${gender}`}</p>
               )}
             </div>
             <div>
             <button className="btn btn-primary mx-2" onClick={()=>reviewRequests("rejected",request._id)}>Reject</button>
             <button className="btn btn-secondary mx-2" onClick={()=>reviewRequests("accepted",request._id)}>Accept</button>
             </div>

           </div>
         );
       })}
     </div>
   );
}

export default Requests