import { db } from "../../firebase/config";
import { collection, getDocs , orderBy, query,addDoc,serverTimestamp,where,limit,Timestamp} from "firebase/firestore";

const aylarGetir = async () => {
    try {
        const colRef = collection(db, 'aylar');

        const q=query(colRef,orderBy('sira'));

        const docSnap = await getDocs(q); // await ekledim

        let dizi = [];

        docSnap.forEach(doc => {
            let veri = { ...doc.data(), id: doc.id };
            dizi.push(veri);
        });

        return dizi;
    } catch (error) {
        console.error("Aylar getirilirken hata oluştu: ", error);
        throw error; // Hata durumunda hata fırlat
    }
}

const yillarGetir = async () => {
    try {
        const colRef = collection(db, 'yillar');

        const q=query(colRef,orderBy('ad'));

        const docSnap = await getDocs(q); // await ekledim

        let dizi = [];

        docSnap.forEach(doc => {
            let veri = { ...doc.data(), id: doc.id };
            dizi.push(veri);
        });

        return dizi;
    } catch (error) {
        console.error("Yillar getirilirken hata oluştu: ", error);
        throw error; // Hata durumunda hata fırlat
    }
}


const islemEkle = async (veri)=>{

    const colRef =collection(db,'islemler');

    const docRef= await addDoc(colRef,{...veri,tarih:serverTimestamp()});

    return {...veri,tarih:Timestamp.now,id:docRef.id}
}

const son10IslemGetir=async (email)=>{

    const colRef=collection(db,'islemler');

    const q = query(colRef,where("email","==",email),orderBy('tarih','desc'),limit(10));

    const querySnapshot=await getDocs(q);

    let dizi=[];

    querySnapshot.forEach((doc)=>{

        dizi.push({...doc.data(),id:doc.id})
    })

    return dizi;
}


const islemServis = {
    aylarGetir,
    yillarGetir,
    islemEkle,
    son10IslemGetir
}

export default islemServis;
