import React, { PropTypes } from "react";

const Sign = props => {

  const cb = () => props.clickHandler;
  
  return (
    <div id="log">
      <form class="user-form" onSubmit={(e) => submit(e)}>
        <label>Signup</label><br />
        <input id="Signup" type="text" name="username" placeholder="username" />
        <button id="user" type="submit">Submit</button>

        <label>Log in</label><br />
        <input id="Login" type="password" name="password" placeholder="password" />
        <button id="login" type="submit">Submit</button>
      </form>
      <br />
    </div>
  );
};

export default Sign;