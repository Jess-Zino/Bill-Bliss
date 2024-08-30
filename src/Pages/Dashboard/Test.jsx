import React, { useState } from "react";
import { Tabs } from "antd";
import AllInvoiceTab from "../../components/Dash-Components/Reports/Invoices/AllInvoiceTab";
import NewInvoiceTab from "../../components/Dash-Components/Reports/Invoices/NewInvoiceTab";
import InvoiceListings from "../../components/Dash-Components/Reports/Invoices/InvoiceListings";
import EditInvoice from "../../components/Dash-Components/Reports/Invoices/EditInvoice";

const Test = () => {
  const [activeKey, setActiveKey] = useState("1");
  

    let instanceCounter = 0; // Initialize a counter to keep track of instances

    const addNewTab = (invoice) => {
      // Increment the counter for each new instance
      instanceCounter++;
    
      // Generate a unique key using the invoice ID and the counter
      const newKey = `invoice-${invoice.invoice_id}-${instanceCounter}`;
    
      // Create a new tab with the unique key
      const newTab = {
        label: invoice.description,
        key: newKey,
        children: <EditInvoice invoice={invoice} />,
      };
    
      setTabs((prevTabs) => [...prevTabs, newTab]);
      setActiveKey(newKey);
    };
    
  
  
  const [tabs, setTabs] = useState([
    {
      label: "All Invoices",
      key: "1",
      children: (
        <InvoiceListings onInvoiceSelect={addNewTab} selectedInvoice={null} />
      ),
    },
    {
      label: "New Invoice",
      key: "2",
      children: <NewInvoiceTab />,
    },
  ]);
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:gap-[1%] w-[100%] pr-5 gap-10">
      <Tabs
        className="w-[100%]"
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        items={tabs}
        centered
      />
    </div>
  );
};

export default Test;
