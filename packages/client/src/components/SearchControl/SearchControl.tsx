import * as React from 'react';
import Input from 'antd/es/input';
import Affix from 'antd/es/affix';

const { Search } = Input;

interface Props {
  placeholder?: string;
  searchHandler: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchControl: React.FC<Props> = ({ placeholder = 'search', searchHandler }) => {
  return (
    <Affix offsetTop={60}>
      <Search
        placeholder={placeholder}
        onSearch={searchHandler}
        style={{ width: 300 }}
      />
    </Affix>
  );
};

export default SearchControl;