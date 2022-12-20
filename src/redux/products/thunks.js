import {
    getProductsPending,
    getProductsSuccess,
    getProductsError,
    getByIdProductsPending,
    getByIdProductsSuccess,
    getByIdProductsError,
    deleteProductsPending,
    deleteProductsSuccess,
    deleteProductsError,
    postProductsPending,
    postProductsSuccess,
    postProductsError,
    editProductsPending,
    editProductsSuccess,
    editProductsError
  } from './actions';
  
  export const getProducts = () => {
    return async (dispatch) => {
      dispatch(getProductsPending());
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
        const json = await response.json();
        if(response.status !== 200 ){
          dispatch(getProductsError(json.toString()))
        }else {
          dispatch(getProductsSuccess(json));
        }
      } catch (error) {
        dispatch(getProductsError(error.toString()));
      }
    };
  };


  export const getProductByIdOrName = (id) => {
    return async (dispatch) => {
      dispatch(getByIdProductsPending());
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`);
        const json = await response.json();
        if(response.status !== 200 ){
          dispatch(getByIdProductsError(json.msg.toString()))
        }else {
          dispatch(getByIdProductsSuccess(json));
        }
      } catch (error) {
        dispatch(getByIdProductsError(error.toString()));
      }
    };
  };
  
  export const deleteProducts = (id) => {
    return async (dispatch) => {
      dispatch(deleteProductsPending());
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
          method: 'DELETE'
        });
        const json = await response.json();
        if(response.status !== 200 ){
          dispatch(deleteProductsError(json.toString()))
        }else {
          alert("Producto eliminado");
          window.location.reload();
        }
      } catch (error) {
        dispatch(deleteProductsError(error.toString()));
      }
    };
  };
  
  export const postProducts = (id,name,description,price,stock) => {
    return async (dispatch) => {
      dispatch(postProductsPending());
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products`,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: id, 
              name: name,
              description: description,
              price: price,
              stock: stock
            })
          });
          const json = await response.json();
          if (response.status === 200) {
          alert("Producto agregado");
          } else {
          }
        } catch (error) {
          dispatch(postProductsError(error.toString()));
        }
    };
  };
  
  export const editProducts = (id,name,description,price,stock) => {
    return async (dispatch) => {
      dispatch(editProductsPending());
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`,{
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              description: description,
              price: price,
              stock: stock
            })
          });
          const json = await response.json();
          if (response.status === 202) {
            dispatch(editProductsSuccess(json));
          } else {
          }
        } catch (error) {
          dispatch(editProductsError(error.toString()));
        }
    };
  };