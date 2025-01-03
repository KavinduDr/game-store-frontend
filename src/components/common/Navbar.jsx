import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { selectSidebarStatus, setSidebarOff, setSidebarOn } from '../../redux/store/sidebarSlice';
import { selectUserName } from '../../redux/store/userSlice';
import { UserContext } from '../context/userContext';

const Navbar = () => {
  const dispatch = useDispatch();
  const sidebarStatus = useSelector(selectSidebarStatus);
  // const userName = useSelector(selectUserName);
  const userName = localStorage.getItem("name")
  const {user, setUser} = useContext(UserContext)

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("Hello");
    window.location.reload();
  };

  return (
    <NavbarWrapper className="d-flex align-items-center">
      <div className='container w-100'>
        <div className='navbar-content'>
          <div className='brand-and-toggler d-flex align-items-center justify-content-between'>
            <Link to="/" className="navbar-brand text-white text-uppercase no-wrap">
              <div className="tile">Games<span>4</span>U</div>
            </Link>
            <button type='button' className='navbar-show-btn text-white' onClick={() => dispatch(setSidebarOn())}>
              <HiOutlineMenuAlt3 size={25} />
            </button>
          </div>

          <div className={`navbar-collapse ${sidebarStatus ? "show" : " "}`}>
            <button type="button" className='navbar-hide-btn' onClick={() => dispatch(setSidebarOff())}>
              <MdClose size={25} />
            </button>

            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link to="/" className='nav-link'>home</Link>
              </li>
              <li className='nav-item'>
                <Link to="/creators" className='nav-link'>creators</Link>
              </li>
              <li className='nav-item'>
                <Link to="/stores" className='nav-link'>stores</Link>
              </li>
              <li className='nav-item'>
                <Link to="/games" className='nav-link'>games</Link>
              </li>
            </ul>

            <ul className='connect-list d-flex justify-content-center align-items-center mt-5 flex-wrap'>
              <li className='d-flex'>
                <a href="/cart"><FaShoppingCart color='white' fontSize="25px" /></a>
              </li>
              <li className='nav-item'>
                <span className='nav-link'>Hello, {localStorage.name || 'Guest'}</span>
              </li>
              <button className="white_btn" onClick={handleLogout}>
                Logout
              </button>
            </ul>
          </div>
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;

const NavbarWrapper = styled.div`
  @font-face{
	font-family: SpaceGome;
	src: url(spaceGome.ttf);
  }

  min-height: 78px;
  background: #090624;

  .title{
    font-family: SpaceGome;
    font-size: 40px;
  }

  .navbar-brand {
    font-weight: 700;
    font-size: 32px;

    span {
      color: var(--clr-green-normal);
    }
  }

  .nav-item {
    padding: 10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  .nav-link {
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 2px;
    transition: var(--transition-default);

    &:hover {
      color: var(--clr-pink-normal);
    }
  }

  .connect-text {
    letter-spacing: 2px;
  }

  .connect-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2px;
    margin-left: 2px;
  }

  .connect-link {
    padding: 6px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-default);

    &:hover {
      color: var(--clr-violet-normal);
    }
  }

  .navbar-collapse {
    position: fixed;
    right: 0;
    top: 0;
    width: 280px;
    height: 100%;
    background-color: var(--clr-white);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 60px 20px 16px;
    text-align: center;
    transform: translateX(100%);
    transition: var(--transition-default);
    z-index: 999;

    &.show {
      transform: translateX(0);
    }
  }

  .navbar-hide-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    transition: var(--transition-default);
    &:hover {
      transform: scale(1.2);
    }
  }

  .white_btn {
    border: none;
    outline: none;
    padding: 12px 0;
    background-color: #ffffff;
	  color: #c50000;
    border-radius: 20px;
    width: 120px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    margin-left: 20px;
  }

  .white_btn:hover {
	background-color: #c50000;
	color: #ffffff;
  }


  .navbar-show-btn {
    transition: var(--transition-default);
    &:hover {
      transform: scale(1.2);
    }
  }

  @media screen and (min-width: 992px) {
    .navbar-show-btn {
      display: none;
    }
    .navbar-collapse {
      transform: translateX(0);
      position: relative;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      background-color: transparent;
      box-shadow: none;
    }
    .navbar-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-item {
      margin-left: 6px;
    }
    .navbar-nav {
      display: flex;
    }
    .navbar-hide-btn {
      display: none;
    }
    .nav-link {
      color: var(--clr-white);
      padding: 1px 10px;
    }
    .connect-list {
      display: flex;
      margin-top: 0;
      color: var(--clr-white);
      margin-left: 40px;
      .connect-text {
        width: auto;
        margin-bottom: 0;
        margin-right: 22px;
        display: none;
      }
      .connect-link {
        color: var(--clr-white);
      }
    }
  }

  @media screen and (min-width: 1200px) {
    .nav-link {
      padding-right: 16px;
      padding-left: 16px;
    }
    .connect-list {
      margin-left: 88px;

      .connect-text {
        display: inline-block;
      }
    }
  }
`;
