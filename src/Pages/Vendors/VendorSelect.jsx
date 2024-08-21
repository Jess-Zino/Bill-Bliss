import { useState, useEffect } from "react";
import emptyV from "../../images/empty vendor.avif";
import Avendor from "../../images/vendor.jpg";
import NewVendorModal from "../../components/Modals/NewVendorModal";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ShopOutlined } from "@ant-design/icons";

const VendorSelect = () => {
  const username = localStorage.getItem("username");
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  console.log(user_id, username);

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://bliss-bliss.vercel.app/api/v1/users/${user_id}/vendors`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 404) {
        setVendors([]);
      } else if (!response.ok) {
        throw new Error("Failed to fetch vendors");
      } else {
        const data = await response.json();
        setVendors(data);
        console.log(vendors);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, [user_id]);

  const handleVendorCreated = () => {
    fetchVendors(); // Refetch the vendors when a new vendor is created
  };

  const handleVendorSelect = (vendor_id) => {
    localStorage.setItem("selected_vendor_id", vendor_id);
    navigate("/dashboard");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return vendors.length > 0 ? (
    <div className="flex flex-col items-center justify-around w-[100vw] min-h-[100vh] py-7 overflow-x-hidden gap-5 ">
      <h1 className="main-font font-black text-3xl md:text-5xl lg:text-4xl">
        Welcome <span className="text-[#5a7ff6] underline"> {username}</span>
      </h1>
      <img src={Avendor} alt="Vendor" className="w-[75vw] lg:w-[20vw]" />
      <div className="flex flex-col items-start gap-4 ">
        {vendors.map((item) => (
          <Button
            key={item.vendor_id}
            onClick={() => handleVendorSelect(item.vendor_id)}
            className="flex flex-row justify-start lg:w-[30vw] h-fit p-4 text-2xl  md:text-lg focus:outline-none gap-1 w-[80vw] md:w-[60vw]"
          >
            <div>
              <ShopOutlined className="text-[#5a7ff6] text-4xl" />
            </div>
            <>{item.vendor_name}</>
          </Button>
        ))}
      </div>
      <NewVendorModal onVendorCreated={handleVendorCreated} />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] ">
      <h1 className="main-font font-black text-3xl md:text-5xl lg:text-4xl">
        Welcome <span className="text-[#5a7ff6] underline"> {username}</span>
      </h1>
      <div className="flex flex-col items-center gap-7">
        <img src={emptyV} alt="No Vendors" className="w-[90vw] lg:w-[20vw]" />
        <h1 className="body-font text-xl">No Vendors found </h1>

        <NewVendorModal onVendorCreated={handleVendorCreated} />
      </div>
    </div>
  );
};

export default VendorSelect;
