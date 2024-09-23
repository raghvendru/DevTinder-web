import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) return <h1>No connections found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold  text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, about, age, gender, _id } = connection;

        return (
          <div key={_id} className="flex  m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
