import { Button, Descriptions, Empty } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileListings from "./ProfileListings";

const NewInvoiceTab = () => {
  const vendor_id = localStorage.getItem("selected_vendor_id");
  const token = localStorage.getItem("token");
  const [invoice, newInvoice] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileDetails, setprofileDetails] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const newInvoiceClick = () => {
    newInvoice(true);
  };

  const fetchprofileDetails = async () => {
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
        setprofileDetails([])
        // Redirect to the profile creation page if no profiles are found
      

      } else if (!response.ok) {
        throw new Error("Failed to fetch profile details");
      } else {
        const data = await response.json();
        setprofileDetails(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching profile details:", error);
      // Optional: Redirect to a specific error page or show an error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchprofileDetails();
  }, []);

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
    <div>
      <div className="bg-white p-5 flex rounded-lg w-[100%] shadow-md hover:shadow-xl min-h-[20vh] justify-center lg:min-h-[83.5vh]">
        {!invoice ? (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            className="body-font"
            imageStyle={{ height: 200 }}
            description={<h1>New Invoice</h1>}
          >
            <Button onClick={newInvoiceClick} type="primary">
              Create New Invoice
            </Button>
          </Empty>
        ) : (
          <>
            {selectedProfile ? (
              <Descriptions
                className="w-[70vw] -mx-20 lg:w-[40vw] body-font"
                title={
                  <div className="flex flex-row justify-between">
                    <h1 className="main-font font-black text-3xl">Profile</h1>
                    <div className="flex flex-row gap-2"></div>
                  </div>
                }
                bordered
                column={3}
                layout="vertical"
                items={descriptionItems}
              />
            ) : (
              <ProfileListings
                profiles={profileDetails}
                onProfileSelect={handleProfileSelect}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewInvoiceTab;
