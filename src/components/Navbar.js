import React from 'react'
import styles from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'

export default function Navbar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = async () => {

    await dispatch(logout());
    await dispatch(reset());

    navigate('/login')

  }

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}><Link to="/"> TYA Bütçe Yönetim</Link></li>

        {!user ? (
         <> 
           <li><Link to="/login"> Giriş</Link></li>
           <li><Link to="/signup"> Üye Ol</Link></li>
          </>

        ) : (

          <>
          <span> Merhaba {user.displayName}</span>
          <li><button className={styles.btn} onClick={onLogout}><FaSignOutAlt />Logout</button></li>
          
          </>

             )}

      
      </ul>
    </nav>
  )
}
