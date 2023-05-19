import React from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchInput = ({ loading, onChange, search }) => {
  return (
    <>
      <Search
        placeholder="cari barang..."
        enterButton="Search"
        size="large"
        loading={loading}
        onChange={onChange}
        onSearch={search}
      />
    </>
  );
};

export default SearchInput;
