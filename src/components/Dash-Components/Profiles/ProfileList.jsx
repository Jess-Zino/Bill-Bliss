import React from "react";
import { AuditOutlined, PercentageOutlined } from "@ant-design/icons";
import { List, Space } from "antd";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ProfileList = ({ profiles }) => {
  return (
    <List
      itemLayout="horizontal"
      size="small"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={profiles || [{}]}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText
              icon={AuditOutlined}
              text={item.gr}
              key="list-vertical-like-o"
            />,
            <IconText
              icon={PercentageOutlined}
              text={item.vat}
              key="list-vertical-message"
            />,
          ]}
        >
          <List.Item.Meta
            title={<a href={item.title}>{item.title}</a>}
            description={item.address}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
};

export default ProfileList;
