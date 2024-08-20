import { Button } from "antd";
import confirmimg from "../../images/confirm.jpg";
import { Link } from "react-router-dom";
const Confirm = () => {
  return (
    <div className="flex flex-col items-center justify-around w-[80vw] h-[90vh] mx-auto px-2 lg:flex-row lg:px-0 lg:justify-between lg:w-[85vw] lg:h-[100vh]">
      <img
        src={confirmimg}
        alt="Confirm Email"
        className="w-[90vw] md:w-[70vw] lg:w-[40vw]"
      />
      <div className="flex flex-col gap-20">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-3xl text-center main-font font-black">
            {" "}
            Email Confirmation Sent!
          </h1>
          <p className="text-base body-font text-center">
            Please check your inbox for a confirmation email. Click the link
            inside to verify your email address and complete your registration.
          </p>

          <p className="text-sm body-font text-[#333]">
            If you don&apos;t see the email, be sure to check your spam folder.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="main-font font-black text-xl">Confirmed?</p>
          <Link to="/">
            {" "}
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="Btn body-font bg-[#5a7ff6] hover:bg-neutral-800 w-[80vw] md:w-[60vw] lg:w-[35vw]"
            >
              Proceed to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
