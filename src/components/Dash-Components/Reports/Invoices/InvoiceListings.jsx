import React, { useState, useEffect } from "react";
import { Card, Space, Row, Col, Spin, Empty, Button } from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

IconText.propTypes = {
  icon: propTypes.object,
  text: propTypes.any,
};

const InvoiceListings = ({ onInvoiceSelect, selectedInvoice }) => {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const vendor_id = localStorage.getItem("selected_vendor_id");
  const token = localStorage.getItem("token");

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://bliss-bliss.vercel.app/api/v1/vendors/${vendor_id}/invoices`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 404) {
        setInvoices([]);
      } else if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      } else {
        const data = await response.json();
        setInvoices(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      {loading ? (
        <div className="flex items-center justify-center">
          <Spin size="large" />
        </div>
      ) : invoices.length > 0 ? (
        <Row gutter={[16, 16]}>
          {invoices.map((item) => (
            <Col xs={22} sm={12} md={150} key={item.invoice_id}>
            <Card
              hoverable
              onClick={() => onInvoiceSelect(item)} 
              title={<a className="body-font font-bold">{item.description}</a>}
              style={{
                width: "100%",
                border: selectedInvoice && selectedInvoice.Invoice_id === item.Invoice_id
                  ? "2px solid #1890ff"
                  : "none",
              }}
            >
             
              <Space size="large">
                <IconText icon={UserOutlined} text={String(item.username)} key="gr-number" />
                <IconText icon={CalendarOutlined} text={String(item.date_created.split("T")[0])} key="vat" />
              </Space>
            </Card>
          </Col>
          
          ))}
        </Row>
      ) : (
        <Empty description="No Invoices yet">
          <Link to="/new-invoice">
            <Button type="primary" icon={<PlusOutlined />}>
              Create a New Invoice
            </Button>
          </Link>
        </Empty>
      )}
    </div>
  );
};

InvoiceListings.propTypes = {
  onInvoiceSelect: propTypes.func,
  selectedInvoice: propTypes.object,
};

export default InvoiceListings;
