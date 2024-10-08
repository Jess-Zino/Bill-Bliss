import React from "react";
import { AuditOutlined, PercentageOutlined } from "@ant-design/icons";
import { List, Space } from "antd";
import propTypes from "prop-types";
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
IconText.propTypes={
  icon:propTypes.object,
  text:propTypes.any
}

const ProfileList = ({ profiles, onProfileSelect }) => {
  return (
    <List
      style={{
        width: "100%",
      }}
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 3,
      }}
      dataSource={profiles || [{}]}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText
              icon={AuditOutlined}
              text={String(item.gr_number)}
              key="list-vertical-like-o"
            />,
            <IconText
              icon={PercentageOutlined}
              text={String(item.vat)}
              key="list-vertical-message"
            />,
          ]}
          onClick={() => onProfileSelect(item)}
        >
          <List.Item.Meta
            title={<a className="body-font font-bold">{item.profile_name}</a>}
            description={item.address}
          />
        </List.Item>
      )}
    />
  );
};

export default ProfileList;
ProfileList.propTypes ={
  profiles: propTypes.array, 
  onProfileSelect : propTypes.func
}