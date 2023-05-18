import React from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchInput = ({ loading }) => {
  return (
    <>
      <Search
        placeholder="cari barang..."
        enterButton="Search"
        size="large"
        loading={loading}
      />
    </>
  );
};

export default SearchInput;
