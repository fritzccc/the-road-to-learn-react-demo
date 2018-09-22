import React from 'react';
import Button from '../Button'
import classNames from 'classnames'
const Sort = ({sortKey,onSort,activated,children})=>{
  const sortClass=classNames(
    'button-inline',
    {'button-active':sortKey===activated}
  );
  return (
    <Button onClick={()=>onSort(sortKey)} className={sortClass}>{children}</Button>
  )
}

export default Sort;