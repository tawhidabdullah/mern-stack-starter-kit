import React, { Fragment, Component } from "react";
import TextFeildGroup from "../commonFeilds/TextFeildGroup";
import TextAreaFeildGroup from "../commonFeilds/TextAreaFeildGroup";
import SelectListGroup from "../commonFeilds/SelectListGroup";
import { connect } from "react-redux";
import { addProductAction } from "../../actions/productAction";
import "../../components/styles_components/submit.css";
import "../../components/styles_components/fileUpload.css";
import { getCategoriesAction } from "../../actions/categoryAction";

class FileUploads extends Component {
  state = {
    title: "",
    desc: "",
    category: "",
    price: "",
    productImage: "",
    errors: {},
    success: false,
    productText: ""
  };

  onChange = e => {
    let productImage;
    if (e.target.name === "productImage") {
      productImage = e.target.files[0];
    }

    this.setState({
      productImage: productImage
    });
  };
  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.product) {
      this.setState({
        success: nextProps.product
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("desc", this.state.desc);
    formData.append("price", this.state.price);
    formData.append("category", this.state.category);
    formData.append("productImage", this.state.productImage);

    this.props.addProductAction(formData);
    this.clearFeilds();
  };

  clearFeilds() {
    if (this.state.success) {
      this.setState({
        title: "",
        desc: "",
        category: "",
        price: "",
        productImage: "",
        success: false,
        errors: {}
      });

      setTimeout(
        function() {
          this.setState({ productText: "" });
        }.bind(this),
        4000
      );
    }
  }

  componentDidMount() {
    this.props.getCategoriesAction();

    if (this.props.title) {
      this.setState({
        title: this.props.title,
        desc: this.props.desc,
        category: this.props.category,
        price: this.props.price,
        productImage: this.props.productImage
      });
    }
  }

  render() {
    const errors = this.state.errors;
    let productAlert;
    if (this.state.productText) {
      productAlert = (
        <div class="alert alert-success" role="alert">
          {this.state.productText}
        </div>
      );
    }

    const cats = this.props.category.categories;

    console.log("fffffffffffff", categories);

    let categories;

    if (cats) {
      categories = cats.map(category => {
        return category.title;
      });
    }

    console.log("ffff", categories);
    let options = [{ label: "Select Categories", value: 0 }];

    if (categories) {
      categories.forEach(category => {
        
        options.push({
          label: category,
          value: category
        });
      });
    }

    console.log("options", options);

    return (
      <React.Fragment>
        {productAlert}
        <form onSubmit={this.onSubmit} encType="multipart/form-data">
          <TextFeildGroup
            name="title"
            placeholder="title"
            type="text"
            value={this.state.title}
            onChange={this.onInputChange}
            errors={errors.title}
          />
          <TextAreaFeildGroup
            name="desc"
            placeholder="Description..."
            value={this.state.desc}
            onChange={this.onInputChange}
            errors={errors.desc}
          />
          <TextFeildGroup
            type="number"
            placeholder="price..."
            name="price"
            value={this.state.price}
            onChange={this.onInputChange}
            errors={errors.price}
          />
          <SelectListGroup
            placeholder="category"
            name="category"
            value={this.state.category}
            onChange={this.onInputChange}
            options={options}
            errors={errors.category}
          />
          <div className="custom-file">
            <input
              name="productImage"
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={this.onChange}
            />
            <label className="custom-file-label" htmlFor="customFile">
              Choose image file
            </label>
          </div>
          <div className="form">
            <input type="submit" value="Create Product" id="input-submit" />{" "}
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProp = state => {
  return {
    errors: state.errors,
    product: state.product,
    category: state.category
  };
};

export default connect(
  mapStateToProp,
  { addProductAction, getCategoriesAction }
)(FileUploads);
