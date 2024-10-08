import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleReset = async () => {
    try {
      const response = await fetch(
        "https://bliss-bliss.vercel.app/api/v1/password-reset/request",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if(response.status === 401){
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("user_id");
  
        navigate("/");
      }
      if (!response.ok) {
        throw new Error("Reset failed");
      }
      
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("user_id");

      navigate("/");
    } catch (error) {
      console.error("Error during Reset:", error);
    }
  };
  return (
    <div
      className="flex flex-row items-center justify-center p-3 gap-3 text-white font-semibold text-[12pt] hover:bg-[#5a7ffa]"
      onClick={handleReset}
    >
      <LogoutOutlined className="text-white " />
      Forgot Password
    </div>
  );
};

export default Reset;
