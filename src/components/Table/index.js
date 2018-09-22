import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Sort from '../Sort';
import {sortBy} from 'lodash';


const largeColumn = {
  width: '40%',
};
const midColumn = {
  width: '30%',
};
const smallColumn = {
  width: '10%',
};

const SORTS={
  DEFAULT:arr=>arr,
  TITLE:arr=>sortBy(arr,'title'),
  AUTHOR:arr=>sortBy(arr,'author'),
  COMMENTS: arr => sortBy(arr, 'num_comments').reverse(),
  POINTS: arr => sortBy(arr, 'points').reverse(),
}

const Table = ({list,onDismiss,onSort,sortKey,isSortReverse}) =>{
  const showData = isSortReverse ? 
    SORTS[sortKey](list).reverse() :
    SORTS[sortKey](list)
  return (
    <div className="table">
      <div className="table-row table-header">
        <span style={largeColumn}>
          <Sort onSort={onSort} sortKey={'TITLE'} activated={sortKey}>Title</Sort>
        </span>
        <span style={midColumn}>
          <Sort onSort={onSort} sortKey={'AUTHOR'} activated={sortKey}>Author</Sort>
        </span>
        <span style={smallColumn}>
          <Sort onSort={onSort} sortKey={'COMMENTS'} activated={sortKey}>Comments</Sort>
        </span>
        <span style={smallColumn}>
          <Sort onSort={onSort} sortKey={'POINTS'} activated={sortKey}>Points</Sort>
        </span>
        <span style={smallColumn}>
        </span>
      </div>
    {
      showData.map(item =>
        <div key={item.objectID} className="table-row">
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={midColumn}>
            {item.author}
          </span>
          <span style={smallColumn}>
            {item.num_comments}
          </span>
          <span style={smallColumn}>
            {item.points}
          </span>
          <span style={smallColumn}>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline">
              Dismiss
            </Button>
          </span>
        </div>
        )
      }
    </div>
  )
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID:PropTypes.string.isRequired,
      auther:PropTypes.string,
      url:PropTypes.string,
      num_comments:PropTypes.number,
      points:PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Table;