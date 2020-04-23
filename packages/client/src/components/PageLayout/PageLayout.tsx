import * as React from 'react'
import Layout from 'antd/es/layout/layout';
import Input from 'antd/es/input';
import Typography from 'antd/es/typography';
import Space from "antd/es/space";

const { Title, Paragraph, Text } = Typography;
const { Header, Footer, Content } = Layout;
const { Search } = Input;

const PageLayout: React.FC = () => (
  <Layout>
    <Header style={{ height: "auto" }}>
      <div style={{ padding: "0.5rem 0" }}>
        <Title style={{ marginBottom: "0", color: "#FFF" }}>Pokemon Search App</Title>
        <Text disabled style={{ color: "#FFF" }}>Because building a new app for something easily searchable by Google is cool 😎</Text>
      </div>
      <Space>
        <Search
          key="name"
          placeholder="pokemon name search"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
        <Search
          key="type"
          placeholder="pokemon type search"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
      </Space>
    </Header>
    <Content style={{ padding: "2rem" }}>

    </Content>
    <Footer style={{ textAlign: 'center' }}>Pokemon Search App ©2020 Created by Alberto <a href="https://github.com/alpe89" target="_blank">"Alpe89"</a> Pertusi</Footer>
  </Layout>
);

export default PageLayout;