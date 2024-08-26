import { useState, useEffect } from "react";
import Bento from "../../components/Dashboard/Bento";

const Settings = () => {
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://bliss-bliss.vercel.app/api/v1/users/${user_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      console.log(data);
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="flex flex-row justify-around">
      <Bento
        content={
          <div>
            <h1>User Settings</h1>
            {loading ? (
              <p>Loading user details...</p>
            ) : userDetails ? (
              <div className="flex flex-col text-lg gap-3">
              <p>
                <strong>Username:</strong> {userDetails.username}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p>
                <strong>First Name:</strong> {userDetails.firstname}
              </p>
              <p>
                <strong>Last Name:</strong> {userDetails.lastname}
              </p>
              <p>
                <strong>Vendor Affliated: </strong>
                <ul className="custom-bullets ml-10">
                  {userDetails.vendors.map((item) => (
                    <li key={item.vendor_id}>{item.vendor_name}</li>
                  ))}
                </ul>
              </p>
              {/* Add more details as needed */}
            </div>
            ) : (
              <p>Error loading user details.</p>
            )}
          </div>
        }
        size="45"
        height="80"
      />
      <Bento
        content={
          <div>
            <h1>Vendor Settings</h1>
            {/* Vendor settings content goes here */}
          </div>
        }
        size="45"
        height="80"
      />
    </div>
  );
};

export default Settings;
