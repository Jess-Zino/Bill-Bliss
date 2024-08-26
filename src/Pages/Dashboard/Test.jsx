import { useState, useEffect } from "react";
import ProfileList from "../../components/Dash-Components/Profiles/ProfileList";
import { Descriptions, Empty } from "antd";
import NewProfileModal from "../../components/Dash-Components/Profiles/NewProfileModal";
import DeleteProfileModal from "../../components/Dash-Components/Profiles/DeleteProfileModal";
import UpdateProfileModal from "../../components/Dash-Components/Profiles/UpdateProfileModal";

const Test = () => {
  const vendor_id = localStorage.getItem("selected_vendor_id");
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
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

  const handleProfileCreated = () => {
    fetchUserDetails();
  };

  const handleProfileDeleted = () => {
    fetchUserDetails();
    setSelectedProfile(null); // Deselect the profile after deletion
  };
  const handleProfileUpdated = () => {
    fetchUserDetails();
    setSelectedProfile(null); 
  };

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
  };

  const mapProfileToDescriptions = (profile) => {
    if (!profile) return [];

    return [
      {
        key: "1",
        label: "Profile Name",
        span: 3,
        children: profile.profile_name,
      },
      {
        key: "2",
        label: "TIN Number",
        span: 1.5,
        children: profile.tin_number,
      },
      {
        key: "3",
        label: "GR Number",
        span: 1.5,
        children: profile.gr_number,
      },
      {
        key: "4",
        label: "Address",
        span: 3,
        children: profile.address,
      },
      {
        key: "5",
        label: "Currency",
        span: 1.5,
        children: profile.currency,
      },
      {
        key: "6",
        label: "VAT",
        span: 1.5,
        children: profile.vat,
      },
      {
        key: "7",
        label: "Account Name",
        span: 3,
        children: profile.account_name,
      },
      {
        key: "8",
        label: "Account Number",
        span: 1.5,
        children: profile.account_number,
      },
      {
        key: "9",
        label: "Bank",
        span: 1.5,
        children: profile.account_bank,
      },
    ];
  };

  const descriptionItems = selectedProfile
    ? mapProfileToDescriptions(selectedProfile)
    : [];


  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-[1%] w-[100%] pr-5">
      <div className="bg-white p-5 flex rounded-lg w-[95%] md:w-[90%] lg:w-[60%] shadow-md hover:shadow-xl min-h-[80vh] justify-center">
        <div className="flex flex-col items-center justify-around gap-0">
          <div>
            {loading ? (
              <p>Loading profile details...</p>
            ) : profileNotFound ? (
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 200 }}
                description={<h1>No profiles yet</h1>}
              >
                <NewProfileModal onProfileCreated={handleProfileCreated} />
              </Empty>
            ) : userDetails ? (
              <>
                {selectedProfile ? (
                   <Descriptions
                   className="w-[40vw] -mx-20"
                   title={
                     <div className="flex flex-row justify-between">
                       <h1 className="main-font font-black text-3xl">
                         Profile
                       </h1>
                       <div className="flex flex-row gap-2">
                        <UpdateProfileModal  onProfileUpdated={handleProfileUpdated} initialProfileData ={selectedProfile}/>
                       <DeleteProfileModal
                         profileId={selectedProfile.profile_id}
                         profileName={selectedProfile.profile_name}
                         onProfileDeleted={handleProfileDeleted}
                       />
                       </div>
                     </div>
                   }
                   bordered
                   column={3}
                   layout="vertical"
                   items={descriptionItems}
                 />
                ) : (
                  <p>Select a profile to view details.</p>
                )}
              </>
            ) : (
              <p>Error loading user details.</p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white p-[25px] flex  rounded-lg w-[95%] md:w-[90%] lg:w-[35%] shadow-md hover:shadow-xl max-h-[90vh] flex-col">
       
        <NewProfileModal onProfileCreated={handleProfileCreated} />
        <ProfileList profiles={userDetails} onProfileSelect={handleProfileSelect} />
      </div>
    </div>
  );
};

export default Test;
