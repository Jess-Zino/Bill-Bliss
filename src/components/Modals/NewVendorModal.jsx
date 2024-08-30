import { useState } from "react";
import { Button, Input, Modal, Form, notification, message } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const NewVendorModal = ({ onVendorCreated }) => {
  const token = localStorage.getItem("token");
  const [vendor, setVendor] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setOpen(true);
    setLoading(false);
  };

  const newVendor = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://bliss-bliss.vercel.app/api/v1/vendors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            vendor_name: vendor,
          }),
        }
      );

      if (response.status === 409) {
        notification.error({
          message: "Vendor already exists",
          description:
            "A vendor with this name already exists. Please choose a different name.",
        });
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to create vendor");
      }

      const data = await response.json();
      notification.success({
        message: "Vendor created successfully",
        description: `Vendor created successfully: ${data.vendor_name}`,
      });

      setOpen(false);
      onVendorCreated(); // Trigger the callback to refresh vendors
    } catch (err) {
      message.error({
        content: "Error Creating Vendor",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showLoading}
        className="Btn body-font bg-[#5a7ff6] hover:bg-neutral-800 w-[80vw] md:w-[60vw] lg:w-[30vw] py-4"
      >
        Create a New Vendor
      </Button>
      <Modal
        title={<p>New Vendor</p>}
        footer={
          <Button type="primary" onClick={newVendor} loading={loading}>
            Confirm
          </Button>
        }
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Form>
          <Form.Item
            name="vendor_name"
            rules={[
              { required: true, message: "Please input the Vendor Name!" },
            ]}
          >
            <div className="flex flex-col items-start">
              <Input
                className="w-[80vw] body-font hover:border-black md:w-[60vw] lg:w-[35vw] border-0 rounded-none border-black border-b"
                size="large"
                placeholder="Vendor Name"
                prefix={<ShopOutlined className="text-[#5a7ff6]" />}
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NewVendorModal;
NewVendorModal.propTypes = {
  onVendorCreated: PropTypes.func.isRequired,
};
