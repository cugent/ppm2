import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>Product List</h1>
        <div className="container">
          {this.props.products.length > 0 &&
            this.props.products.map((product, index) => {
              let price = parseInt(product.cost);
              return (
                <div key={index} className=" animated fadeIn card border-primary mb-3" style={{ marginLeft: "30px", width: "20rem", display: "inline-block" }}>
                  <div className="card-header">{product.name}</div>
                  <div className="card-body">
                    <img style={{ height: "200px", width: "100%", display: "block" }} src={product.source} alt="Card image" />
                    <h4 className="card-title">${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</h4>
                    <Link to={`/products/edit/${product.id}`}>
                      <button type="button" className="btn btn-primary btn-lg btn-block">
                        Edit
                      </button>
                    </Link>
                    <button onClick={() => this.props.deleteProduct(product.id)} style={{ marginTop: "10px" }} type="button" className="btn btn-primary btn-lg btn-block">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
