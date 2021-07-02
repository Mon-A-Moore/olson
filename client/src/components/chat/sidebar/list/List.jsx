import React from 'react';
import Item from './listItem';

import './list.scss';
import image from '../../../../assets/img/icons-редактировать.svg';

const List = ({ list, selected }) => {
  return (
    <div className="sidebar__list">
      <ul>
        {list.map((item) => (
          <Item item={item} index={item.id} selected={selected} />
        ))}
      </ul>
      <button className="sidebar__list-add">
        <img src={image} alt="" />
      </button>
    </div>
  );
};

export default List;
