import React from 'react';

import Header from './components/Header/Header';
import ModalAuth from './components/ModalAuth/ModalAuth';


import './App.css';



function App() {
  const [open, setOpen] = React.useState(false);

  return (
   <>
      <Header setOpen={setOpen} />


      <ModalAuth open={open} setOpen={setOpen} />
   </>
  );
}

export default App;
