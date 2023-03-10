import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import styles from './layout.module.css';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Products from '../../Screens/Products';
import Productos from '../../Screens/Products/get';
import ProductsForm from '../../Screens/Products/Form';
import Login from '../../Screens/Login';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route path="/login" component={Login} />
        <Route exact path="/products/get" component={Productos} />
        <Route path="/products/form" component={ProductsForm} />
        <Route path="/products/:id" component={ProductsForm} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
export default Layout;