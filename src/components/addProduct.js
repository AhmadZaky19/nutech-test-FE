import React, { useState } from "react";
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
import axios from "axios";
import config from "../utils/config";

const AddProduct = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({});

  const [form] = Form.useForm();

  const handleFileUpload = ({ file }) => {
    // setFiles((pre) => {
    //   return { ...pre, [file.uid]: file };
    // });
    // beforeUpload: (file) => {
    //   const isPNG = file.type === "image/png";
    //   const isJPEG = file.type === "image/jpeg";
    //   if (!isPNG || !isJPEG) {
    //     message.error(`${file.name} is not a png file`);
    //   }
    //   return isPNG || Upload.LIST_IGNORE;
    // },
  };

  const showModal = () => {
    setOpen(true);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const submitForm = (value) => {
    let body = value;
    if (value) {
      const file = value.image[0].originFileObj;
      body = { ...value, image: file };
    }
    console.log(body);
    axios
      .post(config.API_URL_PROD, body)
      .then((res) => {
        message.success("Berhasil upload produk");
        setOpen(false);
        axios.get(`${config.API_URL_PROD}?search=&page=1`);
      })
      .catch((err) => {
        message.error(err);
      });
    form.resetFields();
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
            getValueFromEvent={normFile}
            valuePropName="fileList"
            rules={[
              {
                required: data ? false : true,
                message: "Foto barang belum diupload",
              },
            ]}
          >
            <Upload maxCount={1} customRequest={handleFileUpload}>
              <Button icon={<UploadOutlined />}>Upload png only</Button>
            </Upload>
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
            name="buyPrice"
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
            name="sellPrice"
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
