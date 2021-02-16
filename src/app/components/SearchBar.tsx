import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
  position: fixed;
  justify-content: space-between;
  margin: 0;
  top: 60px;
  background-color: #E5E5E5;
  overflow:hidden;
  padding: 10px 16%;

  @media (max-width: 780px) {
    padding: 10px 8%;
  }
`
const Text = styled.div`
  color: #000;
  font-weight: 600;
`
const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const Search = styled.input`
  border: 2px solid #808080;
  background: transparent;

  height: 30px;
  border-radius: 4px;
  width: 300px;

  @media (max-width: 780px) {
    width: 150px;
  }
`

const Icon = styled.img`
  margin: 0px 20px;
  color: #808080;
  height: 18px;
  width: 18px;
`;

function SearchBar({ translate = (text: string) => text  }: { translate?: (text: string) => any }) {

  return (
    <Container>
      <Text>{translate("Friends List")}</Text>
      <SearchWrapper>
        <label htmlFor="search">
          <Icon alt="No name" src={IMAGE} />
          <Search id="search" />
        </label>
      </SearchWrapper>
    </Container>
  );
}

const IMAGE = "data:image/png;base64,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"
export default SearchBar;
