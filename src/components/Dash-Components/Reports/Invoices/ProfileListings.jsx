import React from "react";
import { Card, Space, Row, Col } from "antd";
import { PlusOutlined, AuditOutlined, PercentageOutlined } from "@ant-design/icons";
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

const ProfileListings = ({ profiles, onProfileSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
        {profiles && profiles.length > 0 ?  <h1 className="body-font text-3xl font-bold">Select a Profile:</h1> :<h1 className="body-font text-3xl font-bold">Create a New Profile</h1>}

      <Row gutter={[16, 16]}>
        {profiles && profiles.length > 0 ? (
          profiles.map((item) => (
            <Col xs={22} sm={12} md={120} key={item.profile_id}>
              <Card
                hoverable
                onClick={() => onProfileSelect(item)}
                title={<a className="body-font font-bold">{item.profile_name}</a>}
                style={{
                  width: "100%",
                }}
              >
                <p>{item.address}</p>
                <p>{item.account_name}</p>
                <p>{item.account_number}</p>
                <p>{item.account_bank}</p>

                <Space size="large">
                  <IconText
                    icon={AuditOutlined}
                    text={String(item.gr_number)}
                    key="gr-number"
                  />
                  <IconText
                    icon={PercentageOutlined}
                    text={String(item.vat)}
                    key="vat"
                  />
                </Space>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={22} sm={12} md={120}>
            <Link to="/profiles"><Card
              hoverable
              onClick={() => onProfileSelect(null)} 
              style={{
                width: "fit-content",
                textAlign: "center",
              }}
            >
              <PlusOutlined style={{ fontSize: "48px", color: "#08c" }} />
            </Card>
            </Link>
          </Col>
        )}
      </Row>
    </div>
  );
};

ProfileListings.propTypes = {
  profiles: propTypes.array,
  onProfileSelect: propTypes.func,
};

export default ProfileListings;
