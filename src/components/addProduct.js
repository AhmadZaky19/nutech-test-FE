import React, { useState, useEffect, useRef } from "react";
import {
  Tooltip,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Upload,
  Space,
  Row,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const AddProduct = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageProduct, setImageProduct] = useState({});

  const [form] = Form.useForm();
  const target = useRef(imageProduct);

  const handleFile = (e) => {
    setImageProduct(e.target.files[0]);
  };

  const showModal = () => {
    setOpen(true);
  };
  const submitForm = (value) => {
    const payload = { ...value, image: imageProduct };

    axios
      .post("https://nutech-test-be-production.up.railway.app/", value)
      .then((res) => {
        message.success("Berhasil upload produk");
        setOpen(false);
      })
      .catch((err) => {
        message.error(err);
      });
    // form.resetFields();
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Tambah Barang">
        <Button
          type="primary"
          shape="circle"
          size={"large"}
          icon={<PlusCircleOutlined />}
          onClick={showModal}
        />
      </Tooltip>
      <Modal
        title="Tambah Barang"
        footer={false}
        open={open}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={submitForm}
          autoComplete="off"
        >
          <Form.Item
            name="image"
            label="Foto Barang"
            // valuePropName="fileList"
            // getValueFromEvent={(e) => {
            //   return e?.fileList;
            // }}
            // rules={[
            //   {
            //     required: data ? false : true,
            //     message: "Foto barang belum diupload",
            //   },
            // ]}
          >
            <input
              type="file"
              // name="image"
              ref={target}
              onChange={handleFile}
            />
          </Form.Item>
          <Form.Item
            label="Nama Barang"
            name="name"
            rules={[
              {
                required: data ? false : true,
                message: "Nama barang perlu diisi",
              },
            ]}
          >
            <Input placeholder="Nama Barang" />
          </Form.Item>
          <Form.Item
            label="Harga Beli"
            name="buyProduct"
            rules={[
              {
                required: data ? false : true,
                message: "Harga beli perlu diisi",
              },
            ]}
          >
            <InputNumber placeholder="Harga Beli" />
          </Form.Item>
          <Form.Item
            label="Harga Jual"
            name="sellProduct"
            rules={[
              {
                required: data ? false : true,
                message: "Harga jual perlu diisi",
              },
            ]}
          >
            <InputNumber placeholder="Harga Jual" />
          </Form.Item>
          <Form.Item
            label="Stok"
            name="stock"
            rules={[
              { required: data ? false : true, message: "Stok perlu diisi" },
            ]}
          >
            <InputNumber placeholder="Stok" />
          </Form.Item>
          <Row justify="end">
            <Space>
              <Button onClick={handleCancel}>Batal</Button>
              <Button htmlType="submit" loading={loading} type="primary">
                Simpan
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddProduct;
