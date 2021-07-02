import React from 'react';
import './groupname.scss';

const GroupName = ({icons,name,count}) => {

  return (
		<div className="main-header">
		<button className="main-header__button">
			<div className="main-header__button-item">
				<img src={icons} alt="иконка" />
				<div>
					<h1>
						<p>{name}</p>
					</h1>
					<h2>
						<p>{count} users</p>
					</h2>
				</div>
			</div>
		</button>
	</div>
  );
};

export default GroupName;