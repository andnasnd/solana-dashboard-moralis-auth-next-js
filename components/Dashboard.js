import React, { useRef, useEffect, useState } from "react"
import { useMoralisSolanaApi } from "react-moralis"
import { AwesomeButton } from 'react-awesome-button';
import ClipboardCopy from './ClipboardCopy'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from '@solana/wallet-adapter-react'

export default function Dashboard({logout, user}) {

    let walletAddress = user.get('solAddress')
    let SolanaAPI = useMoralisSolanaApi()
    let [solanaBalance, setSolanaBalance] = useState('')
    let [splBalance, setSplBalance] = useState([{}])
    let [nftBalance, setNftBalance] = useState([{}])
    let [nftMetadata, setNftMetadata] = useState([{}])
    const [copySuccess, setCopySuccess] = useState('')
    const textAreaRef = useRef(null)

    const [isCopied, setIsCopied] = useState(false);

    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    };

    function notify() {
        toast('Copied to clipboard! 🥳', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setCopySuccess('Copied!');
        notify();
    };

    let [isLoading, setIsLoading] = useState(true)

    let mdata = [{}]
    let m = [{}]

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await SolanaAPI.account.balance({
                    network: 'devnet',
                    address: walletAddress
                })
                setSolanaBalance(res.solana)
            } catch (e) {
                console.log(e)
            }

            try {
                let res = await SolanaAPI.account.getSPL({
                    network: 'devnet',
                    address: walletAddress
                })
                setSplBalance(res)
            } catch (e) {
                console.log(e)
            }

            try {
                let res = await SolanaAPI.account.getNFTs({
                    network: 'devnet',
                    address: walletAddress
                })
                setNftBalance(res)
            } catch (e) {
                console.log(e)
            }

            // // destructure NFT addresses into input array
            // const nftAddresses = nftBalance.map(nft => nft.mint)

            // nftAddresses.map(x => {
            //     try {
            //         let res = SolanaAPI.nft.getNFTMetadata({
            //                 network: 'devnet',
            //                 address: x
            //             })
            //             mdata.push(res)
            //         } catch (e) {
            //             console.log(e)
            //         }
            //      })

            // nftBalance.map(element => {
            //     // for each NFT address, get NFTMetadata
            //     nftAddresses.map(x => {
            //         try {
            //             let res = SolanaAPI.nft.getNFTMetadata({
            //                 network: 'devnet',
            //                 address: x
            //             })
            //             mdata.push(res)
            //         } catch (e) {
            //             console.log(e)
            //         }
            //     })
            // });



            // Promise.all(mdata).then((values) => {
            //     console.log(values)
            // })

            // curl --location --request GET 'api-mainnet.magiceden.dev/v2/wallets/8wsgU3zeFPMZH6LRTYup2j9igbrWg1jeRaDFp4kmt3JZ/tokens?offset=0&limit=100&listedOnly=true'

            setIsLoading(false)
        }

        fetchData()

    }, [])

    return(
        <>
            <div className="flex">
                <div className="self-start text-blue font-bold text-5xl md:text-5xl lg:text-5xl pt-4 pl-4 pr-10 ">sol<span className="text-black">Dashboard</span></div>
                <div className="absolute top-4 right-4">
                    <AwesomeButton
                        className="self-center"
                        onPress={logout}
                    >
                        Logout
                    </AwesomeButton>
                    <ToastContainer
                        position="bottom-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover={false}
                    />
                </div>
            </div>
            <div className="w-screen h-screen flex flex-col items-center justify-center py-4 px-4 bg-white overflow-auto" >
                <div className="p-1"></div>
                <div className="w-full h-full max-w-4xl grid grid-cols-1 md:grid-cols-2 content-start gap-4 md:gap-4">
                    <div className="text-center bg-white md:col-span-2 rounded-2xl drop-shadow-lg px-2 py-2 md:text-lg" >
                            <p className="text-black font-bold text-xl md:text-3xl">wallet address</p>
                            <p className="text-black text-[0.8rem] md:text-lg">
                                {walletAddress} {''}
                                <CopyToClipboard text={walletAddress} onCopy={onCopyText}>
                                    <button onClick={notify}>{isCopied ? '✅' : '📋'}</button>
                                </CopyToClipboard>
                            </p>
                    </div>
                    <div className="bg-white rounded-2xl drop-shadow-lg px-2 py-2 md:px-4 md:py-4 md:text-lg">
                        <p className="text-2xl md:text-4xl">💰 Balance </p>
                        {!isLoading && <p className="md:mt-4 text-3xl md:text-6xl"> {solanaBalance.slice(0,6)} <span>SOL</span></p>}
                    </div>

                    <div className="bg-white rounded-2xl drop-shadow-lg px-2 py-2 md:px-4 md:py-4 md:text-lg">
                        <p className="text-2xl md:text-4xl">🧿 SPL Tokens:  {!isLoading ? splBalance.length : ''}</p>
                        <ul className="list-disc ml-8 md:mt-4 text-md md:text-lg">
                            {splBalance.length > 0 && !isLoading && splBalance.map((spl, i) => (
                                    <li key={i}>{spl.mint?.slice(0,18)}...<span className="float-right pr-4"> {spl.amount} </span></li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white md:col-span-2 rounded-2xl drop-shadow-lg px-2 py-2 md:px-4 md:py-4 md:text-lg">
                        <p className="text-2xl md:text-4xl">🖼️ NFTs: {!isLoading ? nftBalance.length : ''}</p>
                        <ul className="list-disc px-4 md:mt-4 text-md md:text-lg">
                            {nftBalance.length > 0 && !isLoading && nftBalance.map((nft, i) => ( 
                                <li className="text-ellipsis overflow-hidden" key={i}>{nft.mint}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}