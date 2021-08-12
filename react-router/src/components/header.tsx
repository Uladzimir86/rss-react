import React, { ReactElement, useState } from 'react';
import { Link } from "react-router-dom";
import './header.css';

const Header = (): ReactElement => {

  const [chosenLink, setChosenLink] = useState({
    home: 'nav__item nav__item_chosen',
    about: 'nav__item',
  })

    return (
      <header className="header">
        <nav className="header__nav">
          <ul className="nav__list">
            <li className={chosenLink.home}>
              <Link to="/" className="nav__link" onClick={() => setChosenLink({
                home: 'nav__item nav__item_chosen',
                about: 'nav__item',
              })}>
                <span>Home</span>
              </Link>
            </li>
            <li className={chosenLink.about}>
              <Link to="/about" className="nav__link" onClick={() => setChosenLink({
                home: 'nav__item',
                about: 'nav__item nav__item_chosen',
              })}>
                <span>About</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
}

export default Header;