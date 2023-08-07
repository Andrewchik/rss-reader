import React from 'react';

import Header from './components/Header/Header';
import ModalAuth from './components/ModalAuth/ModalAuth';
import { ArticleList } from './components/ArticleList/ArticleList';

import './App.css';



function App() {

  return (
   <>
      <Header />
      <ArticleList />
      <ModalAuth />
   </>
  );
}

export default App;
