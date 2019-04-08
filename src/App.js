import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./components/Navigation";
import Home from "./containers/Home";
import ProductList from "./containers/ProductList";
import ProductCreation from "./containers/ProductCreate";
import Edit from "./containers/ProductEdit";
import axios from "axios";
import io from "socket.io-client";
import { updateCount, updateProducts } from "./redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io("http://localhost:1337");
  }

  componentDidMount = () => {
    this.socket.on("greeting", data => {
      //4
      console.log("CLIENT > socket.on greeting");
      console.log(data.msg); //5
      this.socket.emit("thankyou", { msg: "Thank you for connecting me! -Client" });
    });

    this.socket.on("usercountchanged", data => {
      //4
      console.log("usercountchanged");
      console.log(data);
      this.props.updateCount(data.count);
    });
    this.socket.on("itemchanged", data => {
      //4
      console.log("itemchanged");
      console.log(data);
      this.props.updateProducts(data.items);
    });

    this.getProducts();
  };

  getProducts = () => {
    axios.get("http://localhost:1337/products").then(response => {
      console.log(response);
      this.props.updateProducts(response.data);
    });
  };
  deleteProduct = id => {
    axios.delete(`http://localhost:1337/products/${id}`).then(response => {
      console.log(response);
    });
  };
  updateProduct = (source, name, cost, id) => {
    let obj = {
      source,
      name,
      cost
    };

    axios.put(`http://localhost:1337/products/${id}`, obj).then(response => {
      console.log(response);
    });
  };
  createProduct = (source, name, cost) => {
    let obj = {
      source,
      name,
      cost
    };

    axios.post("http://localhost:1337/products", obj).then(response => {
      console.log(response);
    });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route
              path="/home"
              render={props => {
                return <Home {...props} />;
              }}
            />
            <Route
              exact
              path="/products"
              render={props => {
                return <ProductList deleteProduct={this.deleteProduct} />;
              }}
            />
            <Route
              exact
              path="/products/new"
              render={props => {
                return <ProductCreation {...props} createProduct={this.createProduct} />;
              }}
            />
            <Route
              exact
              path="/products/edit/:id"
              render={props => {
                return <Edit {...props} deleteProduct={this.deleteProduct} updateProduct={this.updateProduct} />;
              }}
            />
            {/* <Route path="/sell" />
          <Route path="/ledger" />
          <Route path="/transaction/:id" /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  updateCount: payload => dispatch(updateCount(payload)),
  updateProducts: payload => dispatch(updateProducts(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
