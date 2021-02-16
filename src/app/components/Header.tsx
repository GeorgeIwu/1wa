import React, { useMemo } from 'react';
import styled from 'styled-components'
import logo from '../../logo.svg';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 1100;
  justify-content: space-between;
  padding: 5px 20px;
  margin: 0;
  background-color: rgb(252, 252, 249);
  box-shadow: grey 0px 2px 3px -3px;
`
const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100px;
  justify-content: space-between
`
const Image = styled.img`
  height: 50px;
  width: 50px;
  object-fit: contain;
`
const Name = styled.span`
  margin-top: 12px;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
`

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 210px;
  justify-content: space-between
`

const AvatarImg = styled.img`
  height: 45px;
  width: 45px;
  background-color: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  box-sizing: border-box;
  color: #fff;
`

const Lang = styled.select`
  width: 150px;
  height: 35px;
  margin-top: 5px;
  padding: 8px 8px 5px;
  background-position: 100% 60%;
  border: 1px solid #808080;
  border-radius: 5px;
  cursor: pointer;
`

function Header({currentLanguage, languages, onSelectLanguage}:
  {
    currentLanguage: string,
    languages: string[],
    onSelectLanguage: (langCode: string) => any
  }) {


  const handleLanguageChange = useMemo(() => (e: any) => {
    const language = e.target.value
    onSelectLanguage(language);
  }, [])

  return (
    <Container>
        <ImageWrapper>
         <Image src={logo} className="App-logo" alt="logo" />
         <Name>Square</Name>
        </ImageWrapper>
        <AvatarWrapper>
          <Lang onChange={handleLanguageChange}>
            {languages.map((c, i)=> <option key={i} value={c} >{c}</option>)}
          </Lang>
         <AvatarImg alt="No Image" src={IMAGE} />
        </AvatarWrapper>
    </Container>
  );
}

const IMAGE = "https://mertskaplan.com/wp-content/plugins/msk-twprofilecard/img/mertskaplan.jpg"
export default Header;
