import React, { useState, useEffect } from "react";
import { Table, Row, Col, Layout, Menu, Image, Space, Button } from "antd";

import SearchInput from "../../components/searchInput";

const { Header, Footer, Content } = Layout;

const Home = () => {
  const [loading, setLoading] = useState(false);

  const dataSource = [
    {
      namaBarang: "Tes Barang",
      fotoBarang:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      hargaBeli: 8000,
      hargaJual: 10000,
      stok: 10,
    },
  ];

  const columns = [
    {
      title: "Nama Barang",
      dataIndex: "namaBarang",
      key: "namaBarang",
      align: "center",
    },
    {
      title: "Foto Barang",
      dataIndex: "fotoBarang",
      key: "fotoBarang",
      align: "center",
      render: (value) => <Image width={100} src={value} />,
    },
    {
      title: "Harga Beli",
      dataIndex: "hargaBeli",
      key: "hargaBeli",
      align: "center",
    },
    {
      title: "Harga Jual",
      dataIndex: "hargaJual",
      key: "hargaJual",
      align: "center",
    },
    {
      title: "Stok",
      dataIndex: "stok",
      key: "stok",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (value, record) => (
        <Space direction="horizontal">
          <Button type="primary" size="small">
            Edit
          </Button>
          <Button size="small">Hapus</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    document.title = "Nutech Test | Home";
  }, []);

  return (
    <>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item>Login</Menu.Item>
            <Menu.Item>Tambah Barang</Menu.Item>
          </Menu>
        </Header>
        <Content className="main__content">
          <Row className="main__content--searchBar">
            <Col span={24}>
              <SearchInput loading={loading} />
            </Col>
          </Row>
          <Row className="main__content--table">
            <Col span={24}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  loading={loading}
                  bordered
                />
              </div>
            </Col>
          </Row>
        </Content>
        <Footer className="footer">
          <p className="footer__text">
            All content & design ©, Nutech Technical Test 2023.
          </p>
          <p className="footer__text">Privacy Policy</p>
        </Footer>
      </Layout>
    </>
  );
};

export default Home;
