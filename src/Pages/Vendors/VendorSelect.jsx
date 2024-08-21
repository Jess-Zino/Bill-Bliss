import { useState, useEffect } from "react";
import emptyV from "../../images/empty vendor.avif";
import Avendor from "../../images/vendor.jpg";
import NewVendorModal from "../../components/Modals/NewVendorModal";

const VendorSelect = () => {
  const username = localStorage.getItem("username");
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  console.log(user_id, username);

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
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
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [user_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return vendors.length > 0 ? (
    <>
      <h1>Welcome {username}</h1>
      <img src={Avendor} alt="Vendor" />
    </>
  ) : (
    <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] ">
      <h1 className="main-font font-black text-3xl md:text-5xl lg:text-4xl">
        Welcome <span className="text-[#5a7ff6] underline"> {username}</span>
      </h1>
      <div className="flex flex-col items-center gap-7">
        <img src={emptyV} alt="No Vendors" className="w-[90vw] lg:w-[20vw]" />
        <h1 className="body-font text-xl">No Vendors found </h1>

        <NewVendorModal/>
      </div>
    </div>
  );
};

export default VendorSelect;
