import loginImg from "../../images/register page.jpg";
import { Form, Input, Button, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!email || !password || !firstname || !lastname || !username) {
        notification.error({
          message:"Empty Fields",
          description:"All fields are required."
        });
        return;
      }

      const response = await fetch(
        "https://bliss-bliss.vercel.app/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            email: email.trim(),
            password: password.trim(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        setError(
          "Registration failed. Please check your details and try again."
        );
        return;
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      navigate("/confirm");
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-around lg:flex-row">
      <img src={loginImg} alt="" className="w-[90vw] md:w-[70vw] lg:w-[40vw]" />
      <div className="flex flex-col gap-7 items-center">
        <div className="flex flex-col gap-3 justify-center">
          <div className="flex items-center flex-col gap-2">
            <h1 className="main-font text-3xl font-black md:text-4xl lg:text-5xl">
              Join us Today!
            </h1>
            <p className="body-font text-lg">Create Your Account</p>
          </div>
          {error && <div className="error-message">{error}</div>}
          <Form
            name="Register"
            initialValues={{ remember: true }}
            layout="horizontal"
            className="flex flex-col items-center"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="firstname"
              rules={[
                { required: true, message: "Please input your First Name!" },
              ]}
            >
              <Input
                className="w-[80vw] body-font border-0 rounded-none border-black border-b hover:border-black md:w-[60vw] lg:w-[35vw] placeholder:text-[#2c2c2c]"
                type="text"
                size="large"
                required
                placeholder="First Name"
                prefix={<UserOutlined className="text-[#5a7ff6]" />}
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="lastname"
              rules={[
                { required: true, message: "Please input your Last Name!" },
              ]}
            >
              <Input
                className="w-[80vw] border-0 rounded-none border-black border-b body-font hover:border-black md:w-[60vw] lg:w-[35vw]"
                type="text"
                size="large"
                placeholder="Last Name"
                prefix={<UserOutlined className="text-[#5a7ff6]" />}
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                className="w-[80vw] body-font hover:border-black md:w-[60vw] lg:w-[35vw] border-0 rounded-none border-black border-b"
                type="text"
                size="large"
                placeholder="Username"
                prefix={<UserOutlined className="text-[#5a7ff6]" />}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                className="w-[80vw] body-font hover:border-black md:w-[60vw] lg:w-[35vw] border-0 rounded-none border-black border-b"
                type="email"
                size="large"
                placeholder="Email"
                prefix={<MailOutlined className="text-[#5a7ff6]" />}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
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
            </Form.Item>

            <Form.Item>
              <div className="flex flex-col gap-2 items-center body-font">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="Btn body-font bg-[#5a7ff6] hover:bg-neutral-800 w-[80vw] md:w-[60vw] lg:w-[35vw]"
                >
                  Register
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
        <p className="body-font text-black text-lg">
          Already have an Account?{" "}
          <Link to="/" className="text-[#5a7ff6] body-font font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
