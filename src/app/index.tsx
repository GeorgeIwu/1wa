import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components'
import Header from './components/Header'
import Friends from './pages/friends'
import Friend from './pages/friend'
import {useLanguageStore, useLanguageDispatch} from './utils/useLanguage';

const Container = styled.div`
  position: absolute;
  top:60px; right:0; bottom:0; left:0;
`

function App() {
  const {langCode, languages} = useLanguageStore();
  const {changeLangCode} = useLanguageDispatch();

  return (
    <div>
      <Header currentLanguage={String(langCode)} languages={languages} onSelectLanguage={changeLangCode}/>
      <Container>
        <Switch>
          <Route path='/' exact component={Friends} />
          <Route path='/friend/:id' exact component={Friend} />
        </Switch>
      </Container>
    </div>

  );
}

export default App;



