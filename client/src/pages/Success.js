import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import Jumbotron from '../components/Jumbotron';
// import { useStoreContext } from '../utils/GlobalState';
import { idbPromise } from '../utils/helpers';
import { ADD_ORDER } from '../utils/mutations';

// 保存order进indexedDB

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);
  // const [, dispatch] = useStoreContext();
  useEffect(() => {
    // 把phrams获取
    // const seesion_id = window.location.search.split('=')[1];

    async function saveOrder() {
      // get the products info from indexedDB
      const cart = await idbPromise('cart', 'get');
      const products = cart.map(item => item._id);
      console.log(products);

      try {
        // save the products order to DB
        await addOrder({
          variables: {
            products,
          },
        });
        // console.log(res);

        //无需清除全局中的cart，因为全局状态中cart根据indexedDB来更新
        // await dispatch({
        //   type: 'CLEAR_CART',
        // });

        // 清除indexedDB中cart数据
        cart.forEach(item => idbPromise('cart', 'delete', item));

        console.log('clean idb cart');
      } catch (error) {
        console.log(error);
      }
    }
    saveOrder();

    //wait for 3 second and jump to home page
    setTimeout(() => {
      window.location.assign('/');
    }, 30000);
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the homepage</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
