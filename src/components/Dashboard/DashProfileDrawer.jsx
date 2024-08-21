import { useState } from "react";
import { Button, Drawer, Avatar, Spin } from "antd";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
const DashProfileDrawer = () => {
  const username = localStorage.getItem("username");
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);
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

  const showDrawer = () => {
    setOpen(true);
    fetchUserDetails();
  };

  return (
    <>
      <Avatar
        className="hover:cursor-pointer"
        onClick={showDrawer}
        shape="square"
        size={{ xs: 30, sm: 30, md: 30, lg: 30, xl: 30, xxl: 40 }}
        style={{ backgroundColor: "#5a7ff6", color: "white" }}
      >
        {username.slice(0, 2).toUpperCase()}
      </Avatar>

      <Drawer
        className="body-font"
        closable
        destroyOnClose
        title={<p className="main-font font-black text-2xl">Profile</p>}
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        {loading ? (
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        ) : (
          <>
            {userDetails ? (
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
          </>
        )}
        <div className="flex flex-row items-center gap-5 mt-4">
          <Button type="text" className="bg-[#5a7ffa] text-white"> 
           <EditOutlined/> Edit Profile
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default DashProfileDrawer;
