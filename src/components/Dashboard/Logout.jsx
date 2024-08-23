import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://bliss-bliss.vercel.app/api/v1/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("user_id");

      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div
      className="flex flex-row items-center justify-center p-3 gap-3 text-white font-semibold text-[12pt] hover:bg-[#5a7ffa]"
      onClick={handleLogout}
    >
      <LogoutOutlined className="text-white " />
      Logout
    </div>
  );
};

export default Logout;
