import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './form.module.css';
import Input from '../../../Components/Compartido/Input';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { getProductByIdOrName, postProducts, editProducts, getProducts } from '../../../redux/products/thunks';


const Form = (props) => {
  const isLoggedIn = localStorage.getItem('accessToken');


  const [formMode, setFormMode] = useState(true);
  const [formText, setFormText] = useState('Agregar Producto');
  const params = useParams();
  const id = params.id ? params.id : '';
  const dispatch = useDispatch();

  const { register, setValue, handleSubmit, formState: { errors } } = useForm();

  const {
    isPending,
    item: product,
    list: productList,
    error,
  } = useSelector((state) => state.products);


  useEffect(() => {
    dispatch(getProducts());
    if (id) {
      dispatch(getProductByIdOrName(id));
    }
  }, []);


  useEffect(() => {
    if (product && id) {
      setFormMode(false);
      setFormText('Update Product');
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("stock", product.stock);
    }
  }, [product]);

  const onSubmit = async (event) => {
    if (formMode) {

      const id = (Math.max.apply(Math, productList.map(function(o) { return o.id || 0; })))+1;
      dispatch(postProducts(id, event.name, event.description, event.price, event.stock));
      setTimeout(() => {
        window.location.reload();      
        }, 2000);
  

    } else {
      dispatch(editProducts(id, event.name, event.description, event.price, event.stock));
      props.history.push('/products');
      setTimeout(() => {
        window.location.reload();      
        }, 2000);
    }
  };

  if (!isLoggedIn) {
   return (
   <section>
    <div>
      <h2>Necesita estar logueado para acceder a esta página.</h2>
    </div>
  </section>)
  }

  if (isPending) {
 
  } else if (error !== false) {
    return (
      <section className={styles.container}>
        <div className={styles.tableTitle}>
          <h2>{error}</h2>
        </div>
      </section>
    )
  } else {
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>{formText}</div>
            <div>
              <label>Productos</label>
              <Input
                register={register}
                requiredMany={{ required: true, maxLength: 20, minLength: 5, pattern: /(^$)|[a-zA-Z0-9]/ }}
                nameRegister={'name'}
                placeholder={'Nombre del Producto'}
              />
              {errors.name?.type === 'required' && <p className={styles.fail}>Es requerido ingresar nombre</p>}
              {errors.name?.type === 'maxLength' && <p className={styles.fail}>Máximo 15 caracteres</p>}
              {errors.name?.type === 'minLength' && <p className={styles.fail}>Mínimo 2 caracteres</p>}
              {errors.name?.type === 'pattern' && <p className={styles.fail}>No puede haber espacios</p>}
            </div>
            <div>
              <label>Descripción</label>
              <Input
                register={register}
                nameRegister={'description'}
                requiredMany={{ required: true, maxLength: 50, pattern: /(^$)|[a-zA-Z0-9]/ }}
                placeholder={'Descripcion'}
              />
              {errors.description?.type === 'required' && <p className={styles.fail}>Se requiere ingresar descripción</p>}
              {errors.description?.type === 'maxLength' && <p className={styles.fail} >Máximo 25 caracteres</p>}
              {errors.description?.type === 'pattern' && <p className={styles.fail} >No puede haber espacio</p>}
            </div>
            <div>
              <label>Precio</label>
              <Input
                register={register}
                nameRegister={'price'}
                requiredMany={{ required: true, min: 1 }}
                type="number"
                placeholder={'Precio'}
              />
              {errors.price?.type === 'required' && <p className={styles.fail}>El precio es requerido</p>}
              {errors.price?.type === 'min' && <p className={styles.fail}>Minimo 1 digito</p>}
            </div>
            <div>
              <label>Stock</label>
              <Input
                register={register}
                nameRegister={'stock'}
                requiredMany={{ required: true, min: 1 }}
                type="number"
                placeholder={'Stock'}
              />
              {errors.stock?.type === 'required' && <p className={styles.fail}>El stock es requerido</p>}
              {errors.stock?.type === 'min' && <p className={styles.fail} >Minimo stock es 1</p>}
            </div>
            <div className={styles.cardButton}>
              <div>
                <button className={styles.cancel} onClick={() => props.history.push('/products')}>
                  Cancelar
                </button>
              </div>
              <div>
                <button className={styles.confirm} type="submit">
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default Form;