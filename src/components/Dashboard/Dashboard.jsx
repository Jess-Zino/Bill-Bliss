import { useState } from "react";
import { Layout } from "antd";
import SideNav from "./SideNav";
import DashboardHeader from "./DashboardHeader";
import PropTypes from "prop-types";
import Logout from "./Logout";
const { Content, Footer, Sider } = Layout;
const Dashboard = ({ dashContent }) => {
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout hasSider className="bg-[#f5f7fb]">
      <Sider
        className="overflow-hidden h-[100vh] top-0 left-0 bottom-0 "
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        style={{
          position: "sticky",
        }}
      >
        <div className="bg-black demo-logo-vertical  flex flex-col justify-between h-[100vh] pt-4 ">
          <div className="flex flex-col gap-5">
            <h1 className="text-white text-4xl text-center pt-3 main-font font-black">
              Bill Bliss
            </h1>
            <SideNav className="body-font" />
          </div>

          <Logout />
        </div>
      </Sider>
      <Layout className="ml-[10px] bg-[#f5f7fb]">
        <DashboardHeader collapse={handleCollapse} iscollapsed={collapsed} />
        <Content
          className="mt-[20px] mb-[10px]"
          style={{
            marginLeft: !collapsed ? "0px" : "0px",
          }}
        >
          {dashContent}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Bill Bliss ©{new Date().getFullYear()} Created by ❤️Jessica & Joseph❤️
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
Dashboard.propTypes = {
  dashContent: PropTypes.element.isRequired,
};
