import loginImg from "../../images/login.avif";
import { Form, Input, Button, notification } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
const NewPassword = () => {
  const location = useLocation();

  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };

  const queryParams = getQueryParams(location.search);
  const reset_token = queryParams.get("token");
  const [password, setPassword] = useState("");
  console.log(reset_token);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleReset = async () => {
    try {
      if (!password) {
        notification.error({
          message: "Enter your email",
          description: "Your email is required",
        });
        return;
      }

      const response = await fetch(
        `https://bliss-bliss.vercel.app/api/v1/password-reset/confirm?token=${reset_token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            new_password: password.trim(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        notification.error({
          message: "Error",
          description: `Try again later. ${errorData.details}`,
        });
        console.log(errorData);
        return;
      }

      notification.success({
        message: "Password Successfully Reset",
        description: "Proceed to login",
      });

      navigate("/");
    } catch (err) {
      notification.error({
        message: "Network error",
        description: err,
      });
      setError("Try again Later");
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-around lg:flex-row">
      <img src={loginImg} alt="" className="w-[90vw] md:w-[70vw] lg:w-[40vw]" />
      <div className="flex flex-col gap-7 items-center">
        <div className="flex flex-col gap-7">
          <div className="flex items-center flex-col gap-2">
            <h1 className="main-font text-3xl font-black md:text-4xl lg:text-5xl">
              Request a Reset
            </h1>
            <p className="body-font text-lg">Confirm Your New Password </p>
          </div>
          {error && <div className="error-message">{error}</div>}
          <Form
            name="login"
            initialValues={{ remember: true }}
            layout="horizontal"
            className="flex flex-col items-center"
            onFinish={handleReset}
          >
            <Form.Item name="password">
              <div className="flex flex-col items-start">
                <Input.Password
                  className="w-[80vw] border-0 rounded-none border-black border-b body-font hover:border-black md:w-[60vw] lg:w-[35vw]"
                  prefix={<LockOutlined className="text-[#5a7ff6] body-font" />}
                  size="large"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? (
                      <EyeTwoTone />
                    ) : (
                      <EyeInvisibleOutlined className="text-[#3b82f6]" />
                    )
                  }
                />
              </div>
            </Form.Item>

            <Form.Item>
              <div className="flex flex-col gap-2 items-center body-font">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="Btn body-font bg-[#5a7ff6] hover:bg-neutral-800 w-[80vw] md:w-[60vw] lg:w-[35vw]"
                >
                  Reset
                </Button>
                <Link
                  to="/"
                  className="text-[#5a7ff6] text-lg hover:text-black focus:text-black"
                >
                  Know Your Password?
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
