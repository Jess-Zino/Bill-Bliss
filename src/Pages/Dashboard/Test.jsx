import { Tabs } from "antd";
import AllInvoiceTab from "../../components/Dash-Components/Reports/Invoices/AllInvoiceTab";
import NewInvoiceTab from "../../components/Dash-Components/Reports/Invoices/NewInvoiceTab";
const Test = () => {
  const vendor_id = localStorage.getItem("selected_vendor_id");
  const token = localStorage.getItem("token");
  const items = [
    {
      label: "All Invoices",
      key: "1",
      children: <AllInvoiceTab />,
    },
    {
      label: "New Invoice",
      key: "2",
      children: <NewInvoiceTab />,
    },
   
    {
      label: "",
      key: "3",
      children: "Tab 3",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:gap-[1%] w-[100%] pr-5 gap-10">
      <Tabs className=" w-[100%]" defaultActiveKey="1" centered items={items} />
    </div>
  );
};

export default Test;
