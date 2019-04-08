import React, { Component } from "react";
import ProductForm from "../components/ProductForm";

class ProductCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cost: "",
      source: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  render() {
    return (
      <div className="card card-body">
        <h1 className="card-title">Create Product</h1>
        <div className="container">
          <ProductForm onChange={this.handleChange} buttonText="Create" onClick={this.props.createProduct} source={this.state.source} name={this.state.name} cost={this.state.cost} />
        </div>
      </div>
    );
  }
}

export default ProductCreate;
