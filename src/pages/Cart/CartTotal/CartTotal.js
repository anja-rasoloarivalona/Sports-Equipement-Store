import React from 'react';
import {Link} from 'react-router-dom';
import classes from './CartTotal.css';
import Paypal from '../PaypalButton/PaypalButton';

const cartTotal = ({value, history}) => {

    const {cartSubtotal, cartTax, cartTotal, clearCart} = value;
        return (
        <div className={classes.Total}>
            <h1 className={classes.Title}>Your Cart</h1>

            <section className={classes.Details}>

                    <div className={classes.SubDetails}>
                        <span>subtotal : </span>
                        <span className={classes.Info}> ${cartSubtotal} </span>
                    </div>

                    <div className={classes.SubDetails}>
                       <span>tax : </span>  
                       <span className={classes.Info}>${cartTax}</span>
                    </div>

                    <div className={classes.SubDetails}>
                        <span>total :</span> 
                        <span className={classes.Info}>${cartTotal}</span>
                    </div>

            </section>


            <section className={classes.CTA}>
                    <Link to='/store'>
                        <button className={classes.Button} onClick={()=>clearCart()}>
                            Clear Cart
                        </button>
                    </Link>

                    <Paypal
                        total={cartTotal} 
                        clearCart={clearCart} 
                        history={history} />
            </section>

                
        </div>

        
  )
}

export default cartTotal;
