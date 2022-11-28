import React from 'react';
import styled from 'styled-components';
import Search from '@/assets/svgs/icon-search.svg';
import mixins from '@/styles/mixins';

interface SubInputProps {
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SubInput = ({className, value, onChange}: SubInputProps) => {
  return (
    <Wrapper className={className}>
      <Input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search by Account / Block / Realm / Tokens"
      />
      <Button>
        <Search className="search-icon" />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${mixins.flexbox('row', 'center', 'center')};
  background-color: ${({theme}) => theme.colors.base};
  border-radius: 8px;
  height: 40px;
  width: 100%;
  .search-icon {
    stroke: ${({theme}) => theme.colors.primary};
  }
`;

const Button = styled.button`
  ${mixins.flexbox('row', 'center', 'center')};
  width: 48px;
  height: 100%;
  background-color: inherit;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const Input = styled.input`
  flex-grow: 1;
  height: 100%;
  padding-left: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({theme}) => theme.colors.reverse};
  &:placeholder {
    color: ${({theme}) => theme.colors.tertiary};
  }
`;
