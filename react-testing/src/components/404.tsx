import React, { ReactElement } from 'react';
import './404.css';

const Page404 = (): ReactElement => 
  <div className="four">
    <h2 className="four__title four__title_h2">404</h2>
    <h3 className="four__title four__title_h3">Oops... you seem to be lost</h3>
    <p className="four__text">Just don&lsquot be discouraged, but there is no such page :(</p>
  </div>

export default Page404