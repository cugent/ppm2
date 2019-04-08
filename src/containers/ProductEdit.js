import React, { Component } from "react";
import ProductForm from "../components/ProductForm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class ProductEdit extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.products);
    this.state = {
      name: "",
      cost: "",
      source: ""
    };
  }
  componentDidMount() {
    let array = this.props.products.find(obj => parseInt(obj.id) === parseInt(this.props.match.params.id));
    console.log("ARRAY", array);
    this.setState({
      name: array.name,
      cost: array.cost,
      source: array.source
    });
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  goBack = () => {
    this.props.history.goBack();
  };
  updateProducts = (source, name, cost) => {
    this.props.history.goBack();
    this.props.updateProduct(source, name, cost, this.props.match.params.id);
  };
  deleteProduct = () => {
    this.props.history.goBack();
    this.props.deleteProduct(this.props.match.params.id);
  };
  render() {
    return (
      <div className="card card-body">
        <div>
          <h1 className="card-title" style={{ display: "inline-block", width: "inherit" }}>
            Edit Product
          </h1>
          <button style={{ display: "inline-block", float: "right", marginBottom: "20px", marginLeft: "20px", width: "200px" }} onClick={this.goBack} className="btn btn-primary">
            Back
          </button>
        </div>
        <div className="container">
          <ProductForm
            buttonText="Update"
            onClick={this.updateProducts}
            onChange={this.handleChange}
            deleteProduct={this.deleteProduct}
            source={this.state.source}
            name={this.state.name}
            cost={this.state.cost}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductEdit)
);
