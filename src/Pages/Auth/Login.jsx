import loginImg from "../../images/login.avif";
import { Form, Input, Button, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      // Validate input fields
      if (!email || !password) {
        notification.error({
            message:"Login failed.",
            description : "Both email and password are required."
        });
        return;
      }

      const response = await fetch(
        "https://bliss-bliss.vercel.app/api/v1/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(), 
            password: password.trim(), 
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        notification.error({
            message:"Login failed.",
            description : "Please check your credentials and try again."
        });
        return;
      }

      const data = await response.json();
      notification.success({
        message:"Login Successful",
        description:"Welcome Back"
      });
      localStorage.setItem('username', data.username)
      localStorage.setItem('user_id', data.user_id)
      localStorage.setItem('token', data.access_token)
      navigate("/vendorgroup");
      // Handle successful login (e.g., redirect or store token)
    } catch (err) {
      console.error( err);
      notification.error({
        message:"Network error",
        description: err
      })
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-around lg:flex-row">
      <img src={loginImg} alt="" className="w-[90vw] md:w-[70vw] lg:w-[40vw]" />
      <div className="flex flex-col gap-7 items-center">
        <div className="flex flex-col gap-7">
          <div className="flex items-center flex-col gap-2">
            <h1 className="main-font text-3xl font-black md:text-4xl lg:text-5xl">
              Welcome to Bill Bliss
            </h1>
            <p className="body-font text-lg">Let&apos;s get you started</p>
          </div>
          {error && <div className="error-message">{error}</div>}
          <Form
            name="login"
            initialValues={{ remember: true }}
            layout="horizontal"
            className="flex flex-col items-center"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <div className="flex flex-col items-start">
                <Input
                  className="w-[80vw]  body-font hover:border-black md:w-[60vw] lg:w-[35vw] border-0 rounded-none border-black border-b "
                  type="email"
                  size="large"
                  placeholder="Email"
                  prefix={<MailOutlined className="text-[#5a7ff6]" />}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </Form.Item>

            <Form.Item
              name="password"
             
            >
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
                  Login
                </Button>
                <Link
                  to="/forgot-password"
                  className="text-[#5a7ff6] text-lg hover:text-black focus:text-black"
                >
                  Forgot Password?
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
        <p className="body-font text-black text-base">
          Don&apos;t have an Account?{"  "}
          <Link
            to="/register"
            className="text-[#5a7ff6] body-font font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
