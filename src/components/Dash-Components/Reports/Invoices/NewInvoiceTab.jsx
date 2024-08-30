import {
  Button,
  Descriptions,
  Empty,
  Form,
  Input,
  DatePicker,
  message,
  Spin,
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileListings from "./ProfileListings";
import { LoadingOutlined } from "@ant-design/icons";

const NewInvoiceTab = () => {
  const username = localStorage.getItem("username");
  const vendor_id = localStorage.getItem("selected_vendor_id");
  const token = localStorage.getItem("token");
  const [invoice, setInvoice] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [invoice_name, setInvoiceName] = useState("");
  const [poNum, setPONumber] = useState("");
  const [duedate, setDueDate] = useState(null);

  const [loading, setLoading] = useState(true);
  const [profileDetails, setProfileDetails] = useState([]);

  const navigate = useNavigate();

  const fetchProfileDetails = async () => {
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
        setProfileDetails([]);
      } else if (!response.ok) {
        throw new Error("Failed to fetch profile details");
      } else {
        const data = await response.json();
        setProfileDetails(data);
      }
    } catch (error) {
      console.error("Error fetching profile details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
  };

  const handleInvoiceSubmit = async () => {
    const invoiceData = {
      username: username,
      vendor_id: parseInt(vendor_id),
      description: invoice_name,
      due_date: duedate,
      po_num: poNum,
      profile_name: selectedProfile?.profile_name.trim(),
      message: "Invoice created successfully.",
    };

    try {
      const response = await fetch(
        "https://bliss-bliss.vercel.app/api/v1/invoice",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoiceData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        message.success(responseData.message);
        navigate("/invoices");
      } else {
        throw new Error("Failed to create invoice");
      }
    } catch (error) {
      console.error("Error submitting invoice:", error);
      message.error(
        "There was an error creating the invoice. Please try again."
      );
    }
  };

  const mapProfileToDescriptions = (profile) => {
    if (!profile) return [];

    return [
      { key: "1", label: "Profile Name", span: 3, children: profile.profile_name },
      { key: "2", label: "TIN Number", span: 1.5, children: profile.tin_number },
      { key: "3", label: "GR Number", span: 1.5, children: profile.gr_number },
      { key: "4", label: "Address", span: 3, children: profile.address },
      { key: "5", label: "Currency", span: 1.5, children: profile.currency },
      { key: "6", label: "VAT", span: 1.5, children: profile.vat },
      { key: "7", label: "Account Name", span: 3, children: profile.account_name },
      { key: "8", label: "Account Number", span: 1.5, children: profile.account_number },
      { key: "9", label: "Bank", span: 1.5, children: profile.account_bank },
    ];
  };

  const descriptionItems = selectedProfile ? mapProfileToDescriptions(selectedProfile) : [];

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
            <Button onClick={() => setInvoice(true)} type="primary">
              Create New Invoice
            </Button>
          </Empty>
        ) : (
          <>
            {selectedProfile ? (
              <Form
                className="w-[70vw] lg:w-[40vw] body-font"
                layout="vertical"
                onFinish={handleInvoiceSubmit}
              >
                <Form.Item
                  label="Invoice Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the invoice name",
                    },
                  ]}
                >
                  <Input
                    placeholder="Invoice Name"
                    value={invoice_name}
                    onChange={(e) => {
                      setInvoiceName(e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="PO Number"
                  rules={[
                    { required: true, message: "Please enter the PO number" },
                  ]}
                >
                  <Input
                    placeholder="PO Number"
                    value={poNum}
                    onChange={(e) => {
                      setPONumber(e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Due Date"
                  rules={[
                    { required: true, message: "Please select a due date" },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    value={duedate}
                    onChange={(date) => {
                      setDueDate(date);
                    }}
                  />
                </Form.Item>
                <Descriptions
                  title={
                    <div className="flex flex-row justify-between">
                      <h1 className="main-font font-black text-3xl">Profile</h1>
                      <Button
                        onClick={() => {
                          setSelectedProfile(null);
                        }}
                      >
                        Change Profile
                      </Button>
                    </div>
                  }
                  bordered
                  column={3}
                  layout="vertical"
                  items={descriptionItems}
                />
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Create Invoice
                  </Button>
                </Form.Item>
              </Form>
            ) : loading ? (
              <div className="flex items-center justify-center">
                <Spin
                  indicator={
                    <LoadingOutlined spin style={{ fontSize: "70px" }} />
                  }
                />
              </div>
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
