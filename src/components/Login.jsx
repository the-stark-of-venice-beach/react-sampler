import React from "react";
import Sign from "./Sign.jsx";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="login-page">
        {/*<img
              id="login-background-image"
              src="https://i.ytimg.com/vi/AH8SCMMOZn8/maxresdefault.jpg"
            /> */}
        <Sign clickHandler={this.props.clickHandler} />
      </div>
    );
  }
}

export default Login;
