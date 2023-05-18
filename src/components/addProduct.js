import React, { useState, useEffect } from "react";
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
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";

const AddProduct = ({ data }) => {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const submitForm = (value) => {
    console.log(value);
    setOpen(false);
    message.success("success");
    form.resetFields();
  };
  const handleCancel = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   form.resetFields();
  // }, []);
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
            rules={[{ required: data ? false : true }]}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Foto Barang</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Nama Barang"
            name="namaBarang"
            rules={[{ required: data ? false : true }]}
          >
            <Input placeholder="Nama Barang" />
          </Form.Item>
          <Form.Item
            label="Harga Beli"
            name="buyProduct"
            rules={[{ required: data ? false : true }]}
          >
            <InputNumber placeholder="Harga Beli" />
          </Form.Item>
          <Form.Item
            label="Harga Jual"
            name="sellProduct"
            rules={[{ required: data ? false : true }]}
          >
            <InputNumber
              placeholder="Harga Jual"
              rules={[{ required: data ? false : true }]}
            />
          </Form.Item>
          <Form.Item
            label="Stok"
            name="stock"
            rules={[{ required: data ? false : true }]}
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
