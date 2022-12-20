import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './products.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, deleteProducts } from '../../redux/products/thunks';




const Products = (props) => {
  
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const {
    isLoading,
    list: productsList
  } = useSelector((state) => state.products);


  useEffect(() => {
      dispatch(getProducts());
  }, [dispatch]);
  
  

  const deleteProduct = async (id) => {
      dispatch(deleteProducts(id));
  };

  return (
    <section className={styles.container}>
      <div className={styles.list}>
        <div className={styles.tableTitle}>
          <h2>Productos</h2>
          <button
            className={styles.add}
            onClick={() => {
              props.history.push('/products/form');
            }}
          >
            
            <p>Agregar Producto</p>
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th className={styles.textLeft}>Nombre</th>
              <th className={styles.textLeft}>Descripcion</th>
              <th className={styles.textLeft}>Precio</th>
              <th className={styles.textLeft}>Stock</th>
              <th className={styles.button}>Acciones</th>
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
                  <td className={styles.buttons}>
                    <Link to={`/products/${product.id}`}>
                      <button className={styles.update}>
                        <p>Actualizar</p>
                      </button>
                    </Link>
                    <button
                      className={styles.delete}
                      onClick={() => {
                        deleteProduct(product.id);
                      }}
                    >
                      <p> Eliminar </p>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
};

export default Products;