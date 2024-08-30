import { useState, useEffect } from "react";
import ProfileList from "../../components/Dash-Components/Profiles/ProfileList";
import { Button, Descriptions, Empty,  Spin } from "antd";
import NewProfileModal from "../../components/Dash-Components/Profiles/NewProfileModal";
import DeleteProfileModal from "../../components/Dash-Components/Profiles/DeleteProfileModal";
import UpdateProfileModal from "../../components/Dash-Components/Profiles/UpdateProfileModal";
import { EyeInvisibleOutlined, EyeOutlined, LoadingOutlined } from "@ant-design/icons";

const Test = () => {
  const vendor_id = localStorage.getItem("selected_vendor_id");
  const token = localStorage.getItem("token");
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileNotFound, setProfileNotFound] = useState(false);

  const showSkeleton = () => {
    setHidden(!hidden);
  };
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
        children: (
          <div className="flex flex-row justify-between">
            {hidden ? "*********" : profile.tin_number}{" "}
            <Button onClick={showSkeleton} disabled={loading}>
            {hidden? <EyeOutlined />: <EyeInvisibleOutlined className="text-[#3b82f6]" />}  
            </Button>
          </div>
        ),
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
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:gap-[1%] w-[100%] pr-5 gap-10">
      <div className="bg-white p-5 flex rounded-lg w-[95%] md:w-[90%] lg:w-[60%] shadow-md hover:shadow-xl min-h-[20vh] justify-center lg:min-h-[83.5vh]">
        <div className="flex flex-col items-center justify-around gap-0">
          <div>
            {loading ? (
              <div className="flex flex-col items-center body-font">
                <Spin
                  indicator={
                    <LoadingOutlined spin style={{ fontSize: "70px" }} />
                  }
                />
                <p>Loading profile details...</p>
              </div>
            ) : profileNotFound ? (
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                className="body-font"
                imageStyle={{ height: 200 }}
                description={<h1>No profiles yet</h1>}
              >
                <NewProfileModal onProfileCreated={handleProfileCreated} />
              </Empty>
            ) : userDetails ? (
              <>
                {selectedProfile ? (
                  <Descriptions
                    className="w-[70vw] -mx-20 lg:w-[40vw] body-font"
                    title={
                      <div className="flex flex-row justify-between">
                        <h1 className="main-font font-black text-3xl">
                          Profile
                        </h1>
                        <div className="flex flex-row gap-2">
                          <UpdateProfileModal
                            onProfileUpdated={handleProfileUpdated}
                            initialProfileData={selectedProfile}
                          />
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
                  <p className="body-font">Select a profile to view details.</p>
                )}
              </>
            ) : (
              <p className="body-font">Error loading Profiles</p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white p-[25px] flex  rounded-lg w-[95%] md:w-[90%] lg:w-[35%] shadow-md hover:shadow-xl max-h-[90vh] flex-col">
        <NewProfileModal onProfileCreated={handleProfileCreated} />
        <ProfileList
          profiles={userDetails}
          onProfileSelect={handleProfileSelect}
        />
      </div>
    </div>
  );
};

export default Test;
