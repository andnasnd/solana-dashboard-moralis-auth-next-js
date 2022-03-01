import Image from 'next/image'
import Footer from 'rc-footer'
import 'rc-footer/assets/index.css'
import { render } from 'react-dom'
import { AwesomeButton } from 'react-awesome-button';

export default function Auth({authenticate}) {

  // custom anonymous fxn to call auth method
  const phantomAuth = async () => {
    try {
      await authenticate({
        type: 'sol'
      })
    } catch (e) {
      console.log(e)
    }
  }

    return(
      <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
          <h1 className="text-blue font-bold text-4xl md:text-6xl lg:text-7xl">sol<span className="text-black">Dashboard</span></h1>
          <AwesomeButton onPress={phantomAuth} className="flex items-center justify-center rounded-2xl text-white px-2 py-1 mt-3 md:text-xl lg:text-3xl">
          <img className="w-10 md:w-14 h-10 md:h-14 mr-4" src="/images/phantom.png" alt="Phantom icon" />
            Login
          </AwesomeButton>
      </div>
      </>
    )
}