import { useLocation } from "react-router-dom";
import { Layout, Button, Badge } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import DashProfileDrawer from "./DashProfileDrawer";
const { Header } = Layout;
const DashboardHeader = ({ collapse, iscollapsed }) => {
  const vendor = localStorage.getItem("selected_vendor_name");
  const location = useLocation();
  const currentPath = location.pathname;
  const dashName = (str) => {
    const newstr = str.slice(1, str.length);
    return newstr[0].toUpperCase() + newstr.slice(1);
  };
  return (
    <Header className="p-0 bg-white flex flex-row justify-between pr-6 items-center">
      <div className="flex flex-row items-center">
        <Button
          type="text"
          icon={
            iscollapsed ? (
              <MenuUnfoldOutlined className="text-[#5a7ff6]" />
            ) : (
              <MenuFoldOutlined />
            )
          }
          onClick={collapse}
          className="text-[16px] w-[64] p-[20px] rounded-none"
          style={{
            width: 64,
            height: 64,
          }}
        />

        <h1 className="text-[24px] font-bold ">
          {dashName(currentPath) + " - "}
          {vendor}
        </h1>
      </div>

      <div className=" flex flex-row justify-around items-center gap-5">
              <SettingOutlined className="text-[#5a7ff6] text-[20px]" />
     

              <Badge
            dot
            style={{
              backgroundColor: "#52c41a",
            }}
          >
            <DashProfileDrawer/>
            </Badge>
      </div>
    </Header>
  );
};

export default DashboardHeader;
DashboardHeader.propTypes = {
  collapse: PropTypes.func.isRequired,
  iscollapsed: PropTypes.bool.isRequired,
};
