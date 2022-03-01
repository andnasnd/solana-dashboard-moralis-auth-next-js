import { useMoralis } from "react-moralis";
import Auth from "../components/Auth";
import Dashboard from '../components/Dashboard'
import FooterComponent from '../components/Footer'

export default function Home() {

  const {
    isAuthenticated,
    authenticate,
    logout,
    user
  } = useMoralis()

  if(!isAuthenticated) {
    return(
      <>
        <Auth authenticate={authenticate} />
        <FooterComponent />
      </>
      )
  }

  return (
    <>
      <Dashboard logout={logout} user={user}/>
      <FooterComponent />
    </>
  )
}


