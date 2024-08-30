import { useState, useEffect } from "react";
import { message, Spin, Descriptions } from "antd";
import propTypes from "prop-types";
import { LoadingOutlined } from "@ant-design/icons";

// Function to map invoice data for Descriptions component
const mapInvoiceToDescriptions = (invoice) => {
  if (!invoice) return [];

  return [
    { key: "1", label: "Invoice ID", span: 3, children: invoice.invoice_id },
    { key: "2", label: "Description", span: 3, children: invoice.description },
    { key: "3", label: "Date Created", span: 3, children: new Date(invoice.date_created).toLocaleDateString() },
    { key: "4", label: "Date Modified", span: 3, children: new Date(invoice.date_modified).toLocaleDateString() },
    { key: "5", label: "GR Number", span: 3, children: invoice.gr_number },
    { key: "6", label: "TIN Number", span: 3, children: invoice.profile?.tin_number },
    { key: "7", label: "Profile Name", span: 3, children: invoice.profile?.profile_name },
    { key: "8", label: "Account Name", span: 3, children: invoice.profile?.account_name },
    { key: "9", label: "Account Number", span: 3, children: invoice.profile?.account_number },
    { key: "10", label: "Account Bank", span: 3, children: invoice.profile?.account_bank },
    { key: "11", label: "Address", span: 3, children: invoice.profile?.address },
    { key: "12", label: "Currency", span: 3, children: invoice.profile?.currency },
    { key: "13", label: "VAT", span: 3, children: `${invoice.profile?.vat}%` },
  ];
};

const EditInvoice = ({ invoice }) => {
  const vendor = localStorage.getItem("selected_vendor_name");
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      if (!invoice?.invoice_id) return; // Return if no invoice_id

      setLoading(true);
      setError(null); // Clear previous errors

      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `https://bliss-bliss.vercel.app/api/v1/invoices/${invoice.invoice_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setInvoiceDetails(responseData);
        } else {
          throw new Error("Failed to fetch invoice details");
        }
      } catch (error) {
        console.error("Error fetching invoice details:", error);
        setError(
          "There was an error fetching the invoice details. Please try again."
        );
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceDetails();
  }, [invoice?.invoice_id]); // Depend on invoice_id

  if (loading)
    return (
      <Spin indicator={<LoadingOutlined spin style={{ fontSize: "70px" }} />} />
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="body-font font-extrabold text-4xl">{vendor}</h1>
      {invoiceDetails ? (
        <Descriptions bordered>
          {mapInvoiceToDescriptions(invoiceDetails).map(({ key, label, span, children }) => (
            <Descriptions.Item key={key} label={label} span={span}>
              {children}
            </Descriptions.Item>
          ))}
        </Descriptions>
      ) : (
        <div>No invoice details available</div>
      )}
    </div>
  );
};

EditInvoice.propTypes = {
  invoice: propTypes.object,
};

export default EditInvoice;
