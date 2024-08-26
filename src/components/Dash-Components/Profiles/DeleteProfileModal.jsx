import { useState } from "react";
import { Button, Modal, notification } from "antd";
import propTypes from "prop-types";
const DeleteProfileModal = ({ profileId, onProfileDeleted,profileName }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setOpen(true);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://bliss-bliss.vercel.app/api/v1/profile/${profileId}?profile_name=${profileName}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        notification.success({
          message: "Profile deleted successfully",
        });
        onProfileDeleted(); 
        setOpen(false);
      } else {
        throw new Error("Failed to delete profile");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="default"
        onClick={showLoading}
        size="large"
        className="w-fit"
        danger
      >
        Delete
      </Button>
      <Modal
        title={<p className="main-font text-xl font-black">Delete This Profile</p>}
        footer={
          <div className="flex flex-row gap-4">
            <Button
              type="default"
              className="Btn body-font hover:bg-neutral-800 w-[80vw] md:w-[60vw] lg:w-[35vw]"
              loading={loading}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="Btn body-font bg-[#5a7ff6] hover:bg-neutral-800 w-[80vw] md:w-[60vw] lg:w-[35vw]"
              loading={loading}
              onClick={handleDelete}
              danger
            >
              Delete
            </Button>
          </div>
        }
        open={open}
        onCancel={() => setOpen(false)}
      >
        Are you sure you want to delete this profile?
      </Modal>
    </>
  );
};

export default DeleteProfileModal;
DeleteProfileModal.propTypes = {
  profileId : propTypes.number.isRequired,
   onProfileDeleted: propTypes.func,
   profileName : propTypes.string.isRequired
}