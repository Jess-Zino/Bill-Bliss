import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  HomeOutlined,
  FileTextOutlined,
  SettingOutlined,
  MailOutlined,
  ShopOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
const SideNav = () => {
  const navigate = useNavigate();

  const icons = [
    {
      key: "1",
      icon: <HomeOutlined className="text-white" />,
      label: "Dashboard",
    },

    {
      key: "2",
      icon: <AuditOutlined className="text-white" />,
      label: "Invoices",
    },
    {
      key: "3",
      icon: <FileTextOutlined className="text-white" />,
      label: "Quotes",
    },
    {
      key: "4",
      icon: <UserOutlined className="text-white" />,
      label: "Profiles",
    },
    {
      key: "5",
      icon: <MailOutlined className="text-white" />,
      label: "Mail",
    },
    {
      key: "6",
      icon: <ShopOutlined className="text-white" />,
      label: "Organizations",
    },
    {
      key: "7",
      icon: <SettingOutlined className="text-white" />,
      label: "Settings",
    },
  ];
  const items = icons.map((item) => ({
    key: `/${item.label.toLowerCase()}`,
    icon: <span className="text-white text-xl">{item.icon}</span>,
    label: <span className="text-white body-font">{item.label}</span>,
  }));
  return (
    <div>
      <Menu
        className=" bg-black text-white"
        mode="vertical"
        defaultSelectedKeys={["2"]}
        items={items}
        onClick={(item) => {
          navigate(item.key);
        }}
        theme="dark"
      />
    </div>
  );
};

export default SideNav;
