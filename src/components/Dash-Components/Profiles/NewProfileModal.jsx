import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  notification,
} from "antd";
import {
  AuditOutlined,
  BankOutlined,
  ContactsOutlined,
  MailOutlined,
  PercentageOutlined,
  PlusOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import currencies from "../../Currencies/currencies.json";
import propTypes from "prop-types";
const NewProfileModal = ({ text, onProfileCreated }) => {
  const token = localStorage.getItem("token");
  const vendor_id = localStorage.getItem("selected_vendor_id");
  const [profileName, setProfileName] = useState("");
  const [address, setAddress] = useState("");
  const [tinNumber, setTin] = useState("");
  const [grNumber, setGR] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("");
  const [currency, setCurrency] = useState("");
  const [vat, setVAT] = useState(0);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setOpen(true);
    setLoading(false);
  };

  const newProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://bliss-bliss.vercel.app/api/v1/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            profile_name: profileName,
            vendor_id: vendor_id,
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

      if (response.status === 409) {
        notification.error({
          message: "Profile already exists",
          description:
            "A Profile with this name already exists. Please choose a different name.",
        });
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to create profile");
      }

      const data = await response.json();
      notification.success({
        message: "Profile created successfully",
        description: `Profile created successfully: ${data.profile_name}`,
      });

      setOpen(false);
    } catch (err) {
      notification.error({
        message: "Error Creating Profile",
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
    newProfile();
    onProfileCreated();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showLoading}
        size="large"
        className="w-fit"
      >
        <PlusOutlined /> {!text ? "Create New Profile" : "Create Now"}
      </Button>
      <Modal
        title={<p className="main-font text-xl font-black">New Profile</p>}
        footer={
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="Btn body-font bg-[#5a7ff6] hover:bg-neutral-800 w-[80vw] md:w-[60vw] lg:w-[35vw]"
            onClick={handleSubmit}
            loading={loading}
          >
            Create
          </Button>
        }
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Form
          name="newProfileForm"
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

export default NewProfileModal;
NewProfileModal.propTypes = {
  text: propTypes.bool,
  onProfileCreated: propTypes.func,
};
