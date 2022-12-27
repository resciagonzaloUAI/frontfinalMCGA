import styles from './login.module.css';
import Input from '../../Components/Compartido/Input';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { login } from '../../redux/users/thunks';


const Login = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (event) => {
    dispatch(login({...event}));
    history.push('/home');
    setTimeout(() => {
    window.location.reload();      
    }, 500);
  }

  return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.card}>
            <div>
              <label>Usuario</label>
              <Input
                register={register}
                requiredMany={{ required: true, maxLength: 25, minLength: 5, pattern: /(^$)|[a-zA-Z0-9]/ }}
                nameRegister={'user'}
                placeholder={'Nombre de usuario'}
              />
              {errors.user?.type === 'required' && <p className={styles.fail}>Es requerido ingresar el usuario</p>}
              {errors.user?.type === 'maxLength' && <p className={styles.fail}>Máximo 25 caracteres</p>}
              {errors.user?.type === 'minLength' && <p className={styles.fail}>Mínimo 2 caracteres</p>}
              {errors.user?.type === 'pattern' && <p className={styles.fail}>No puede haber espacios</p>}
            </div>
            <div>
              <label>Contraseña</label>
              <Input
                register={register}
                nameRegister={'password'}
                type={'password'}
                requiredMany={{ required: true, maxLength: 10, pattern: /(^$)|[a-zA-Z0-9]/ }}
                placeholder={'Password'}
              />
              {errors.password?.type === 'required' && <p className={styles.fail}>Ingrese su contraseña</p>}
              {errors.password?.type === 'maxLength' && <p className={styles.fail} >Máximo 10 caracteres</p>}
              {errors.password?.type === 'pattern' && <p className={styles.fail} >No puede haber espacio</p>}
            </div>
            <div className={styles.cardButton}>
              <div>
                <button className={styles.cancel} onClick={() => props.history.push('/home')}>
                  Cancelar
                </button>
              </div>
              <div>
                <button className={styles.confirm} type="submit">
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

export default Login;