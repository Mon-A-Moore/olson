import React from 'react';
import GroupName from './groupname/GroupName';
import Contentcontaier from './contentcontainer/Contentcontaier';
import classNames from 'classnames';
import './main.scss';
import '../sidebar/sidebar.scss';

const Main = ({ list, selected }) => {
  const [count, setcount] = React.useState(null);
  console.log(count);
  return (
    <div className={classNames('main', selected[1] === false && 'inactive')}>
      <div className="main__header header">
        <GroupName name={list.name} icons={list.icons} count={count} />
        <button className="button-burger">
          <svg
            fill="#AAAAAA"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="25px"
            height="25px"
          >
            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
          </svg>
        </button>
        <button className="button-burger">
          <div className="Icon">
            <span></span>
          </div>
        </button>
      </div>
      <Contentcontaier list={list} count={count} setcount={setcount} />
    </div>
  );
};

export default Main;
