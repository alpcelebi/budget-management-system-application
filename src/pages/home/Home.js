import React, { useEffect } from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GirisForm from './GirisForm';
import { son10IslemGetir } from '../../features/islem/islemSlice';

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { islemler } = useSelector((state) => state.islem);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    if (user) {
      dispatch(son10IslemGetir(user.email));
    }
  }, [navigate, user, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {islemler && islemler.map((i) => (
          <div key={i.id} className={styles.islem}>
            <span className={styles.islemIsim}>{i.isim+" ="}</span>
            <span className={styles.islemDeger}>{i.deger}</span>
          </div>
        ))}
      </div>

      <div className={styles.sidebar}>
        <GirisForm />
      </div>
    </div>
  );
}
