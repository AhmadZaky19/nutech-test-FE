import React, { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Layout,
  Menu,
  Image,
  Space,
  Button,
  Modal,
  message,
} from "antd";

import SearchInput from "../../components/searchInput";
import AddProduct from "../../components/addProduct";
import axios from "axios";

import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Header, Footer, Content } = Layout;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
    total: 0,
  });
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const onClickMenu = (e) => {
    console.log("click ", e);
  };

  const fetchProduct = (search, pagination) => {
    setLoading(true);
    axios
      .get(
        `https://nutech-test-be-production.up.railway.app/?search=${search}&page=${pagination}`
      )
      .then((res) => {
        setProduct(res.data.data);
        setPagination({
          current: res.data.pagination?.page,
          pageSize: res.data.pagination?.limit,
          total: res.data.pagination?.totalData,
        });
        setLoading(false);
      });
  };

  const searchProduct = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = () => {
    setSearchLoading(true);
    fetchProduct(search, pagination.current);
    setPagination({
      ...pagination,
      current: 1,
    });
    setSearchLoading(false);
  };

  const confirmDelete = (id) => {
    setOpenModal(true);
    Modal.confirm({
      title: "Konfirmasi hapus data",
      icon: <ExclamationCircleOutlined />,
      content: "Apa anda yakin menghapus data ?",
      okText: "Hapus",
      cancelText: "Batal",
      onOk: async () => {
        await axios
          .delete(`https://nutech-test-be-production.up.railway.app/${id}`)
          .then(() => {
            message.success("Berhasil hapus produk");
            fetchProduct(search, pagination.current);
          })
          .catch(() => {
            message.error("Gagal hapus produk");
          });
      },
      onCancel: () => {
        setOpenModal(false);
      },
    });
  };

  const menuItems = [
    {
      label: "Login",
      key: "login",
    },
  ];

  const columns = [
    {
      title: "No",
      key: "NO",
      align: "center",
      render: (W, V, I) => {
        return (
          <span style={{ textAlign: "center", cursor: "pointer" }}>
            {4 * (pagination.current - 1) + (I + 1)}
          </span>
        );
      },
    },
    {
      title: "Nama Barang",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Foto Barang",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (value) => (
        <Image
          width={50}
          src={`https://nutech-test-be-production.up.railway.app/image/${value}`}
        />
      ),
    },
    {
      title: "Harga Beli",
      dataIndex: "buyPrice",
      key: "buyPrice",
      align: "center",
    },
    {
      title: "Harga Jual",
      dataIndex: "sellPrice",
      key: "sellPrice",
      align: "center",
    },
    {
      title: "Stok",
      dataIndex: "stock",
      key: "stock",
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
          <Button size="small" onClick={() => confirmDelete(value)}>
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    document.title = "Nutech Test | Home";
    fetchProduct(search, pagination.current);
    setPagination({
      current: 1,
      pageSize: 4,
      total: 0,
    });
  }, []);

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            onClick={onClickMenu}
            items={menuItems}
          />
        </Header>
        <Content className="main__content">
          <Row className="main__content--searchBar">
            <Col span={18}>
              <SearchInput
                loading={searchLoading}
                onChange={searchProduct}
                search={onSearch}
              />
            </Col>
            <Col offset={5} span={1}>
              <AddProduct />
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
                  dataSource={product}
                  loading={loading}
                  rowKey={(record) => record.key}
                  pagination={pagination}
                  onChange={(e) => {
                    // setPagination({
                    //   ...pagination,
                    //   current: e.current,
                    // });
                    fetchProduct(search, e.current);
                  }}
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
