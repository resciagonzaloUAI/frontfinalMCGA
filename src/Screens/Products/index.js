import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './products.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, deleteProducts } from '../../redux/products/thunks';
import Modal from 'react-modal';


const Products = (props) => {
  
  const isLoggedIn = localStorage.getItem('accessToken');
  
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [productToBeDeleted, setProductToBeDeleted] = useState(null);

  const {
    isLoading,
    list: productsList
  } = useSelector((state) => state.products);


  useEffect(() => {
      dispatch(getProducts());
  }, [dispatch]);
  
  

  const deleteProduct = async () => {
      dispatch(deleteProducts(productToBeDeleted));
      setIsOpen(false);
  };
  
 

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal(productId) {
    console.log(productId);
    setProductToBeDeleted(productId);
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setProductToBeDeleted(null);
    setIsOpen(false);
  }


  if (!isLoggedIn) {
    return (
    <section>
     <div>
       <h2>Necesita estar logueado para acceder a esta página.</h2>
     </div>
   </section>)
   }


  return (
    <section className={styles.container}>
      <div className={styles.list}>
        <div className={styles.tableTitle}>
          <h2>Listado de productos</h2>
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
                        openModal(product.id);
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
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className={styles.customStyles}
        contentLabel="Eliminar"
      >
        <h2 className={styles.tituloModal}>¿Está seguro de que desea eliminar este producto?</h2>
        <button className={styles.buttonModalOk} onClick={deleteProduct}>Confirmar</button> 
        <button className={styles.buttonModalCancel} onClick={closeModal}>Cancelar</button> 
      </Modal>
    </section>
  )
};

export default Products;