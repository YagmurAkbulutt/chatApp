import { signInWithPopup } from "firebase/auth"
import {auth, provider} from '../firebase/config'


const LoginPage = ({setIsAuth}) => {
    const handleClick = () => {
        // google ile giriş
        signInWithPopup(auth, provider)
        // giriş başarılıysa
        .then((data) => {
            //kullanıcının yetkisini trueya çekme
            setIsAuth(true);

            //kullanıcının tokenini lokale kaydet
            localStorage.setItem('TOKEN', data.user.refreshToken)
        })
    }
  return (
    <div className="container">
      <div className="login">
        <h1>ChatApp</h1>
        <p>Devam Etmek İçin Giriş Yapın</p>
        <button onClick={handleClick}>
            <img src="g-logo.png" />
            <span>Google Hesabı İle Giriş</span>
        </button>
      </div>
    </div>
  )
}

export default LoginPage
