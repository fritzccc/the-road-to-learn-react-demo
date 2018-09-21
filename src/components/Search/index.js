import React from 'react';
import Button from '../Button';
class Search extends React.Component{
  componentDidMount(){
    if(this.input)
      this.input.focus();
  }
  render(){
    const {searchTerm,onChange,onSearchSubmit,children} = this.props;
    return (
      <form>
        {children}
        <input ref={node=>this.input=node} type="text" onChange={onChange} value={searchTerm}/>
        <Button onClick={onSearchSubmit}>go search</Button>
      </form>
    )
  }
}
export default Search;