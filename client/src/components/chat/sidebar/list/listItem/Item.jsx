import React from 'react';

import './item.scss';

const Item = ({item, index, selected}) => {


  return (
		<li key={index}  className="item">
		<button  onClick={() =>selected([item.id,true])} className="button-item">
			<div className="button-item__container">
				<img src={item.icons} alt="иконка" />
				<div>
					<h1>
						<p>{item.name}</p>
					</h1>
				</div>
			</div>
		</button>
	</li>
  );
};

export default Item;
