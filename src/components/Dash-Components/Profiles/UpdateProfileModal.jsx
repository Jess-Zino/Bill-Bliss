import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  notification,
  Tooltip,
} from "antd";
import {
  AuditOutlined,
  BankOutlined,
  ContactsOutlined,
  EditOutlined,
  MailOutlined,
  PercentageOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import currencies from "../../Currencies/currencies.json";
import propTypes from "prop-types";

const UpdateProfileModal = ({ onProfileUpdated, initialProfileData }) => {
  const token = localStorage.getItem("token");
  const [profileName, setProfileName] = useState(
    initialProfileData.profile_name || ""
  );
  const [address, setAddress] = useState(initialProfileData.address || "");
  const [tinNumber, setTin] = useState(initialProfileData.tin_number || "");
  const [grNumber, setGR] = useState(initialProfileData.gr_number || "");
  const [accountName, setAccountName] = useState(
    initialProfileData.account_name || ""
  );
  const [accountNumber, setAccountNumber] = useState(
    initialProfileData.account_number || ""
  );
  const [bank, setBank] = useState(initialProfileData.account_bank || "");
  const [currency, setCurrency] = useState(initialProfileData.currency || "");
  const [vat, setVAT] = useState(initialProfileData.vat || 0);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setOpen(true);
    setLoading(false);
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://bliss-bliss.vercel.app/api/v1/profiles/${initialProfileData.profile_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            profile_name: profileName,
            tin_number: tinNumber,
            gr_number: grNumber,
            address: address,
            currency: currency,
            vat: vat,
            account_number: accountNumber,
            account_name: accountName,
            account_bank: bank,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      notification.success({
        message: "Profile updated successfully",
        description: `Profile updated successfully: ${data.profile_name}`,
      });

      setOpen(false);
      onProfileUpdated();
    } catch (err) {
      notification.error({
        message: "Error Updating Profile",
        description: err.message,
      });
    } finally {
      setLoading(false);
      setProfileName("");
      setAccountName("");
      setAccountNumber("");
      setAddress("");
      setBank("");
      setCurrency("");
      setTin("");
      setCurrency("");
      setVAT("");
      setGR("");
    }
  };

  const handleSubmit = () => {
    updateProfile();
  };

  return (
    <>
      <Tooltip title="Edit Profile" color="#777">
        <Button
          type="text"
          onClick={showLoading}
          size="large"
          className="w-fit border-[#777] text-[#777]"
        >
          <EditOutlined />
        </Button>
      </Tooltip>
      <Modal
        title={<p className="main-font text-xl font-black">Update Profile</p>}
        footer={
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="Btn body-font bg-[#5a7ff6] hover:bg-neutral-800 w-[80vw] md:w-[60vw] lg:w-[35vw]"
            onClick={handleSubmit}
            loading={loading}
          >
            Update
          </Button>
        }
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Form
          name="updateProfileForm"
          initialValues={{ remember: true }}
          layout="horizontal"
          className="flex flex-col items-center"
        >
          <Form.Item name="profileName">
            <div className="flex flex-col items-start">
              <Input
                className="w-[80vw] body-font hover:border-black md:w-[60vw] lg:w-[35vw] border-0 rounded-none border-black border-b"
                type="text"
                size="large"
                placeholder="Profile Name"
                prefix={<MailOutlined className="text-[#5a7ff6]" />}
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>
          </Form.Item>
          <Form.Item name="address">
            <div className="flex flex-col items-start">
              <Input
                className="w-[80vw] body-font hover:border-black md:w-[60vw] lg:w-[35vw] border-0 rounded-none border-black border-b"
                type="text"
                size="large"
                placeholder="Address"
                prefix={<ContactsOutlined className="text-[#5a7ff6]" />}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </Form.Item>
          <div className="flex flex-row gap-3">
            <Form.Item name="grNumber">
              <div className="flex flex-col items-start">
                <Input
                  className="w-[80vw] body-font hover:border-black md:w-[60vw] lg:w-[17vw] border-0 rounded-none border-black border-b"
                  type="text"
                  size="large"
                  placeholder="GR Number"
                  prefix={<AuditOutlined className="text-[#5a7ff6]" />}
                  value={grNumber}
                  onChange={(e) => setGR(e.target.value)}
                />
              </div>
            </Form.Item>

            <Form.Item name="tinNumber">
              <div className="flex flex-col items-start">
                <Input
                  className="w-[80vw] body-font hover:border-black md:w-[60vw] lg:w-[17vw] border-0 rounded-none border-black border-b"
                  type="text"
                  size="large"
                  placeholder="Tin Number"
                  prefix={<ProjectOutlined className="text-[#5a7ff6]" />}
                  value={tinNumber}
                  onChange={(e) => setTin(e.target.value)}
                />
              </div>
            </Form.Item>
          </div>

          <Form.Item name="accountNumber">
            <div className="flex flex-col items-start">
              <Input
                className="w-[80vw] body-font hover:border-black md:w-[60vw] lg:w-[35vw] border-0 rounded-none border-black border-b"
                type="text"
                size="large"
                placeholder="Account Number"
                prefix={<BankOutlined className="text-[#5a7ff6]" />}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
          </Form.Item>
          <Form.Item name="accountName">
            <div className="flex flex-col items-start">
              <Input
                className="w-[80vw] body-font hover:border-black md:w-[60vw] lg:w-[35vw] border-0 rounded-none border-black border-b"
                type="text"
                size="large"
                placeholder="Account Name"
                prefix={<BankOutlined className="text-[#5a7ff6]" />}
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
          </Form.Item>
          <Form.Item name="bank">
            <div className="flex flex-col items-start">
              <Input
                className="w-[80vw] body-font hover:border-black md:w-[60vw] lg:w-[35vw] border-0 rounded-none border-black border-b"
                type="text"
                size="large"
                placeholder="Bank"
                prefix={<BankOutlined className="text-[#5a7ff6]" />}
                value={bank}
                onChange={(e) => setBank(e.target.value)}
              />
            </div>
          </Form.Item>
          <div className="flex flex-row gap-3 items-center">
            <Form.Item name="currency">
              <div className="flex flex-row gap-3 items-center">
                <div className="flex flex-col items-start">
                  <label>Currency</label>
                  <Select
                    value={currency}
                    onChange={(value) => {
                      setCurrency(value);
                    }}
                    showSearch
                    style={{
                      width: "17vw",
                    }}
                    placeholder="Currency"
                    optionFilterProp="description"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase()) ||
                      (option?.description ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={currencies}
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item name="email">
              <div className="flex flex-col items-start">
                <Input
                  className="w-[80vw]  body-font hover:border-black md:w-[60vw] lg:w-[17vw] border-0 rounded-none border-black border-b "
                  type="Number"
                  size="large"
                  placeholder="VAT"
                  prefix={<PercentageOutlined className="text-[#5a7ff6]" />}
                  value={vat}
                  onChange={(e) => {
                    setVAT(e.target.value);
                  }}
                />
              </div>
            </Form.Item>
          </div>

          <Form.Item></Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProfileModal;
UpdateProfileModal.propTypes = {
  onProfileUpdated: propTypes.func,
  initialProfileData: propTypes.object,
};
