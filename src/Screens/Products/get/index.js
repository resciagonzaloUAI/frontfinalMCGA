import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './get.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {  getProducts } from '../../../redux/products/thunks';




const Productos = (props) => {
  
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const {
    isLoading,
    list: productsList
  } = useSelector((state) => state.products);


  useEffect(() => {
      dispatch(getProducts());
  }, [dispatch]);
  
  
  return (
    <section className={styles.container}>
      <div className={styles.list}>
        <div className={styles.tableTitle}>
          <h2>Productos</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th className={styles.textLeft}>Nombre</th>
              <th className={styles.textLeft}>Descripcion</th>
              <th className={styles.textLeft}>Precio</th>
              <th className={styles.textLeft}>Stock</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map((product) => {
              return (
                <tr key={product.id}>
                  <td className={styles.textLeft}>{product.name}</td>
                  <td className={styles.textLeft}>{product.description}</td>
                  <td className={styles.textLeft}>$ {product.price}</td>
                  <td className={styles.textLeft}>{product.stock}</td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
};

export default Productos;