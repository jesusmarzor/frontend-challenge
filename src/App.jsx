import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { VariablesProvider } from './contexts/variablesContext';
import './css/style.scss';

// Import pages
import Products from './pages/Products';
import PageNotFound from './pages/utility/PageNotFound';
import "./config/i18n";

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <VariablesProvider>
      <Routes>
        <Route exact path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </VariablesProvider>
  );
}

export default App;
