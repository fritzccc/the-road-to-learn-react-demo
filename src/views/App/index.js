import React, { Component } from 'react';
import './App.css';
import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_HPP,
  PARAM_PAGE,
  PARAM_SEARCH,
} from '../../constants'
import Button from '../../components/Button'
import Search from '../../components/Search'
import Table from '../../components/Table'
import Loading from '../../components/Loading'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
library.add(faSpinner)

const withLoading=(Component)=>({isLoading,...rest})=>
  isLoading ?
  <Loading /> :
  <Component {...rest} />

const ButtonWithLoading=withLoading(Button);

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      results:null,
      searchTerm:DEFAULT_QUERY,
      searchKey:'',
      error:null,
      isLoading:false,
      sortKey:'DEFAULT',
      isSortReverse:false,
    }
  }

  componentDidMount(){
    const {searchTerm}=this.state;
    this.fetchSearchTopStories(searchTerm)
    this.setState({searchKey:searchTerm})
  }

  setSearchTopStories=result=>{
    const {results,searchKey} = this.state;
    const {hits,page}=result;
    const oldHits=results && results[searchKey] ? results[searchKey].hits:[];
    const updatedHits =[...oldHits,...hits];
    
    this.setState({
      results:{...results,[searchKey]:{hits:updatedHits,page}},
      isLoading:false
    });
  }
  fetchSearchTopStories=(searchTerm,page=0)=>{
    const {results} = this.state;
    if(!results || !results[searchTerm] || page!==0) {
      this.setState({
        isLoading:true
      });
      fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
        .then(res=>res.json())
        .then(res=>this.setSearchTopStories(res))
        .catch(error=>this.setState({error}))
    }
  }

  onSort=(sortKey,isSortReverse)=>{
    isSortReverse=(sortKey==this.state.sortKey && !this.state.isSortReverse);
    this.setState({sortKey,isSortReverse});
  }

  onDismiss=id=>{
    const {results,searchKey}=this.state;
    const updatedHits = results[searchKey].hits.filter(data=>data.objectID!==id);
    this.setState({
      results:{...results,[searchKey]:{hits:updatedHits}}
    })
  }

  handleChange=e=>this.setState({searchTerm:e.target.value})
  onSearchSubmit=(e)=>{
    const {searchTerm}=this.state;
    this.setState({searchKey:searchTerm})
    this.fetchSearchTopStories(searchTerm);
    e.preventDefault();
    return false;
  }

  render() {
    const {results,searchTerm,searchKey,error,isLoading,sortKey,isSortReverse}=this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    return (
      <div className="page">
        <div className="interactions">
          <Search searchTerm={searchTerm} onChange={this.handleChange} onSearchSubmit={this.onSearchSubmit}>
            <span>Search</span>
          </Search>
        </div>
        {(!error && results && results[searchKey]) ? 
            <Table list={results[searchKey].hits} isSortReverse={isSortReverse} sortKey={sortKey} onSort={this.onSort} searchTerm={searchTerm} onDismiss={this.onDismiss}/>
          : <p>Something went wrong.</p>
        }
        <div className="interactions">
          <ButtonWithLoading isLoading={isLoading} onClick={()=>this.fetchSearchTopStories(searchKey,page+1)}>
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;