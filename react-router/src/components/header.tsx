import React, { ReactElement, useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import './header.css';

const Header = (): ReactElement => {

  const [chosenLink, setChosenLink] = useState({
    home: 'nav__item nav__item_chosen',
    about: 'nav__item',
  })

  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.pathname === '/') {
      setChosenLink({
        home: 'nav__item nav__item_chosen',
        about: 'nav__item',
      })
    } else if (location.pathname === '/about') {
      setChosenLink({
        home: 'nav__item',
        about: 'nav__item nav__item_chosen',
      })
    } else if (location.pathname.includes('/details/')){
      setChosenLink({
        home: 'nav__item',
        about: 'nav__item',
      })
    } else if (location.pathname === '/404'){
      setChosenLink({
        home: 'nav__item',
        about: 'nav__item',
      })
    } else history.push('/404');
  }, [location, history]);

  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="nav__list">
          <li className={chosenLink.home}>
            <Link to="/" className="nav__link" >
              <span>Home</span>
            </Link>
          </li>
          <li className={chosenLink.about}>
            <Link to="/about" className="nav__link" >
              <span>About</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;