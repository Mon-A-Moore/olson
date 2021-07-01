import React from 'react';

import Sidebar from '../chat/sidebar';
import Main from '../chat/main';
import './app.scss';

const array = {
  user: [
    {
      userid: 1,
      username: 'GIGA',
      roomid: 123,
      joined: false,
      users: [],
      messages: [],
    },
  ],
  list: [
    {
      id: 1,
      name: 'bochki',
      icons: '../../assets/img/test.jpg',
      userscount: 2,
      usersid: [12, 34],
      messages: [],
      listactive: false,
    },
  ],
};

const App = () => {
  const [arr, setarray] = React.useState(array);

  const [selectbutton, setselectbutton] = React.useState([{}, false]);

  /* console.log(selectbutton); */
  return (
    <>
      <div className="container">
        <Sidebar list={arr.list} selected={setselectbutton} />
        {arr.list.map(
          (item) =>
            selectbutton[0] === item.id && (
              <Main list={item} selected={selectbutton} />
            )
        )}
      </div>
    </>
  );
};

export default App;
