import { useState, useEffect } from "react";
import { aylarGetir, yillarGetir, reset ,islemEkle} from "../../features/islem/islemSlice";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';

export default function GirisForm() {
    const [isim, setIsim] = useState('');
    const [deger, setDeger] = useState('');
    const [tip, setTip] = useState('gelir');
    const [secilenAy, setSecilenAy] = useState('Ocak');
    const [secilenYil, setSecilenYil] = useState('2023');

    const { aylar, yillar } = useSelector((state) => state.islem);
    const{user}=useSelector((state)=>state.auth)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(aylarGetir());
        dispatch(yillarGetir());
        dispatch(reset());
    }, [dispatch]);

    const handleSubmit =async (e) => {
        e.preventDefault();
        
        await dispatch(islemEkle({

            isim,
            deger,
            tip,
            secilenAy,
            secilenYil,
            email:user.email

        }))

        setIsim('');
        setDeger('');
    };

    return (
        <>
            <h3>Bütçe için Giriş işlemi</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>İşlem ismi: </span>
                    <input type="text" required onChange={(e) => setIsim(e.target.value)} value={isim} />
                </label>
                <label>
                    <span>Değer: </span>
                    <input type="number" required onChange={(e) => setDeger(e.target.value)} value={deger} />
                </label>
                <label>
                    <span>Tip: </span>
                    <select onChange={(e) => setTip(e.target.value)}>
                        <option value="gelir">Gelir</option>
                        <option value="gider">Gider</option>
                    </select>
                </label>
                <label>
                    <span>Aylar: </span>
                    <select onChange={(e) => setSecilenAy(e.target.value)} value={secilenAy}>
                        {aylar && aylar.map(ay => (
                            <option key={ay.id} value={ay.ad}>{ay.ad}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <span>Yıllar: </span>
                    <select onChange={(e) => setSecilenYil(e.target.value)} value={secilenYil}>
                        {yillar && yillar.map(yil => (
                            <option key={yil.id} value={yil.ad}>{yil.ad}</option>
                        ))}
                    </select>
                </label>
                <button>İşlem Ekle</button>
            </form>
        </>
    );
}
