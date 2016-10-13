import React from 'react';

const Button = props => {
  return (
    <button onClick={e => props.btnAction(e)}>{props.btnTxt}</button>
  );
}

Button.PropTypes = {
  btnText: React.PropTypes.string.isRequired,
  btnAction: React.PropTypes.func.isRequired
};

export default Button
