import { useState, useEffect } from "react";
import Bento from "../../components/Dashboard/Bento";
import ProfileList from "../../components/Dash-Components/Profiles/ProfileList";
import { Empty } from "antd";
import NewProfileModal from "../../components/Dash-Components/Profiles/NewProfileModal";
const Profiles = () => {
  const vendor_id = localStorage.getItem("selected_vendor_id");
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [profileNotFound, setProfileNotFound] = useState(false);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://bliss-bliss.vercel.app/api/v1/profiles/${vendor_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 404) {
        setProfileNotFound(true);
        setUserDetails(null);
      } else if (!response.ok) {
        throw new Error("Failed to fetch user details");
      } else {
        const data = await response.json();
        setUserDetails(data);
        setProfileNotFound(false);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setProfileNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="flex flex-row justify-around w-[100vw]">
      <Bento
        content={
          <div className="flex flex-col items-center justify-around gap-9">
            <h1 className="main-font font-black text-3xl">Profiles</h1>
            <div>

         
            {loading ? (
              <p>Loading user details...</p>
            ) : profileNotFound ? (
              <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{ height: 200 }}
              description={
                <h1>
                 No profiles yet
                </h1>
              }
            >
             <NewProfileModal/>
            </Empty>
            ) : userDetails ? (
              <ProfileList profiles={userDetails} />
            ) : (
              <p>Error loading user details.</p>
            )}
               </div>
          </div>
        }
        size="58"
        height="80"
      />
        <Bento
          content={
            profileNotFound ? (
              <p>No profiles to display.</p>
            ) : (
              <>
              <ProfileList profiles={userDetails} />
              </>
            )
          }
          size="30"
          height="80"
        />
    </div>
  );
};

export default Profiles;
