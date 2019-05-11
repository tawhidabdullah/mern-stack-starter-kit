import React, { Component } from "react";
import TextFeildGroup from "../commonFeilds/TextFeildGroup";
import "../styles_components/submit.css"; 
import { connect } from "react-redux";
import { loginUser } from "../../actions/authAction";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticate) {
      this.props.history.push("/dashboard");
      // do this when the this file means login components just mounted ,
      // then check with the help of redux that is authenticated is true
      // of not if true then =>> give redirect to dashboard
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value // [e] ==>> add variable in object
    });
  };

  componentWillReceiveProps(nextProps) {
    // it's runs when our components recive new props
    if (nextProps.auth.isAuthenticate) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        // set nextProps.errors to local state
        errors: nextProps.errors
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      errors: {}
    };

    console.log(userData); // print on console the userData

    this.props.loginUser(userData); // fired the loginUser action with passing current user
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
           
              <form onSubmit={this.onSubmit}>
                <TextFeildGroup
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  errors={errors.email}
                />

                <TextFeildGroup
                  name="password"
                  placeholder="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  errors={errors.password}
                />
                <div className="form">
                  <input
                    type="submit"
                    value="Create Product"
                    id="input-submit"
                  />{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
