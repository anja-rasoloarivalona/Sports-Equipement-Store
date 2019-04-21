import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';



const ProductContext = React.createContext();


 class ProductProvider extends Component {

    state= {
         products: [],
         productsDetail: detailProduct,
         cart: [],
         cartSubtotal: 0,
         cartTax: 0,
         cartTotal: 0
    };

    componentDidMount() {
        this.productsListHandler();
        console.log('did mount')
    
    }

    productsListHandler = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem]
        });
        this.setState(() => {
            return {products:tempProducts}
        });
      
    };

    getItem = id => {
      const product = this.state.products.find(item => item.id === id);
      return product;
    }

    handleDetail = (id) => {
      const product = this.getItem(id);
      this.setState(() => {
        return {productsDetail: product}
      });
    }

    addToCart = id => {
      let tempProducts = [...this.state.products];
      const index = tempProducts.indexOf(this.getItem(id));
      const product = tempProducts[index];
      product.inCart = true;
      product.count = 1;
      const price = product.price;
      product.total = price;

      this.setState( () => {
        return {products: tempProducts, cart:[...this.state.cart, product]}
      },
      
      () => {this.addTotals();
      }
      );

    }

    addTotals = () => {
      let subTotal = 0;
      this.state.cart.map(item => (subTotal += item.total));
      const tempTax = subTotal * .15;
      const tax = parseFloat(tempTax.toFixed(2));
      const total = subTotal + tax;
      this.setState(() => {
        return {
          cartSubtotal: subTotal,
          cartTax: tax,
          cartTotal: total
        }
      })

      
      console.log(this.state.cart);
    }

  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail: this.handleDetail,
        addToCart: this.addToCart

        
      }}>

      {this.props.children}

      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider,ProductConsumer};
