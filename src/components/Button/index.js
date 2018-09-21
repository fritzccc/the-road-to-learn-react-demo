import React from 'react';
import PropTypes from 'prop-types';

const Button =({onClick,className,children}) => {
  return (
    <button type="button" onClick={onClick} className={className} >{children}</button>
  )
}
Button.defaultProps={
  className:''
}
Button.prototype ={
  onClick:PropTypes.func.isRequired,
  className:PropTypes.string,
  children:PropTypes.node.isRequired
}
export default Button;