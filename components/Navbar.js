import Link from "next/link"
import { Inter } from 'next/font/google'
import Image from "next/image"
import { Typewriter } from 'react-simple-typewriter'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ['latin'] })



export default function Navbar() {

    const navigate = useRouter();
    const { pathname } = navigate;
    const [typewriterKey, setTypewriterKey] = useState(0);

    useEffect(() => {
        setTypewriterKey(prevKey => prevKey + 1);
    }, [pathname])

    return (
        <>
            <div className="w3-bar w3-top w3-padding" style={{ backgroundColor: '#ffffef', color: '#7b6d55' }}>
                <Link href="/" className="w3-bar-item w3-round" title="Home" style={{ padding: 0, marginRight: 10, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <span style={{ marginRight: 5 }}><Image src="/gifs/iloveread.gif" width={39.5} height={39.5}  /></span>
                </Link>
                <Link href="/article/v2" className="w3-right w3-bar-item w3-round" title="Article" style={{ padding: 0, marginRight: 10, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <span style={{ marginRight: 5 }}><Image src="/github.png" width={39.5} height={39.5} /></span>
                </Link>
                <Link href="/posts" className="w3-right w3-bar-item w3-round" title="Posts" style={{ padding: 0, marginRight: 10, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <span style={{ marginRight: 5 }}><Image src="/linkedin.png" width={39.5} height={39.5} /></span>
                </Link>
            </div>
            <header className={`${inter.className} w3-container w3-center w3-padding-48`} style={{ color: '#7b6d55' }}>
                <h1 className="w3-xxxlarge">
                    <b className='w3-opacity'>DEVCUP</b> <img src="/gifs/coffee.gif" alt="coffee" width={48} height={48} />
                </h1>
                <Typewriter
                    key={typewriterKey}
                    words={["Take a sip of coffee, and a gulp of developer wisdom. Double-shot your skills with Devcup"]}
                    typeSpeed={50}
                    stopBlinkinOnComplete
                    cursor="|"
                />
            </header>
        </>
    )
}