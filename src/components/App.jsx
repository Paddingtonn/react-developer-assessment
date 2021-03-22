import '../styles/components/app.scss';

import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Detail from '../pages/detail';
import Home from '../pages/home';

function App() {
  const [details, setDetails] = useState({});

  const handleDetail = (info) => {
    setDetails(info);
  };

  return (
    <BrowserRouter>
      <Route path="/" exact render={(props) => (
        <Home {...props} handleDetail={handleDetail}/>
      )} />
      <Route path='/detail' render={(props) => (
        <Detail {...props} details={details} />
      )} />
    </BrowserRouter>
  );
};

export default App;
