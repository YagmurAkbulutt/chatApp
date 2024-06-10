import {auth, db } from "../firebase/config";
import { collection } from "firebase/firestore";
import { addDoc, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import Message from "../components/Message";


const ChatPage = ({room, setRoom}) => {
    const [messages, setMessages] = useState([])
    const lastMsg = useRef()
    const sendMessage = async (e) => {
        e.preventDefault();

        //koleksiyonun referansını alma
        const messagesCol = collection(db, "messages")
        

        //koleksiyona yeni doküman ekleme
        await addDoc(messagesCol, {
            text: e.target[0].value.trim(),
            room,
            author: {
                id:auth.currentUser.uid,
                name: auth.currentUser.displayName,
                photo: auth.currentUser.photoURL
            },
            createdAt: serverTimestamp(),
        })
        
        //inputu temizle
        e.target.reset()
    }

    //mevcut oadada gönderilen mesajlaroı anlık oalrak al
    useEffect(() => {
        //abone olunacak koleksiyonun referasnını alma
        const messagesCol = collection(db, "messages")

        //verileri çekerken kullanılacak sorguyu oluştur
        const q = query(messagesCol, where("room", "==", room), orderBy("createdAt", "asc"))

        //anlık olarak koleksiyonldaki değişimleri izleme
        //koleksyon her değiştiinde verdiğimiz fonk ile koleksiyondaki dokümanlara erişiriz

        const unsub = onSnapshot(q, (snapshot) => {
            //verilerin geçici tutuldğu dizi
            const tempMsg = [];

            // dokümanalrı dön ve verilere eriş
            snapshot.docs.forEach((doc) => tempMsg.push(doc.data()))

            //mesajları state e aktar
            setMessages(tempMsg)
        })

        //kullanıcının sohbet syafasından ayrılma anınd veri çekemyi durdur
        return() => unsub()

    }, [room])

    //yeni mesaj göndeirlme oalyo
    useEffect(() => {
        lastMsg.current?.scrollIntoView({behavior: 'smooth'})


    }, [messages])


  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>
        {messages.length > 0 ? <>
            {(messages.map((data, i) => (<Message data={data} key={i} />)))}
            <div ref={lastMsg} />
            </> : (<p className="warn"><span>Henüz hiç mesaj yok. İlk mesajı gönderin.</span></p>)}
      </main>

      <form onSubmit={sendMessage}>
        <input type="text" placeholder="Mesajınızı yazınız..." required/>
        <button>Gönder</button>
      </form>
    </div>
  )
}

export default ChatPage
