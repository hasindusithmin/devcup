import Link from "next/link"
import { Inter } from 'next/font/google'
import Image from "next/image"
const inter = Inter({ subsets: ['latin'] })
export default function Navbar() {
    return (
        <>
            <div className="w3-bar w3-black w3-text-white w3-top">
                <span className="w3-bar-item w3-margin-right" style={{ padding: 0, marginRight: 20, display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: 5 }}><Image src="/logo.gif" width={39.5} height={39.5} className="w3-grayscale" /></span> <span style={{ fontWeight: 'bold', alignItems: 'center', fontSize: 16 }}>DEVCUP</span>
                </span>
                <Link href="/" className="w3-bar-item w3-button w3-round" title="Home" style={{ padding: 0, marginRight: 10, display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: 5 }}><i className="fa fa-home" style={{ fontSize: 39.5 }} /></span> <span style={{ fontWeight: 'bold', alignItems: 'center', fontSize: 12 }}>HOME</span>
                </Link>
                <Link href="/article" className="w3-bar-item w3-button w3-round" title="Article" style={{ padding: 0, marginRight: 10, display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: 5 }}><i className="fa fa-sticky-note-o" style={{ fontSize: 39.5 }} /></span> <span style={{ fontWeight: 'bold', alignItems: 'center', fontSize: 12 }}>ARTICLE</span>
                </Link>
                <span className="w3-bar-item w3-button w3-right">
                    <i className="fa fa-cog w3-spin" style={{ fontSize: 20 }} />
                </span>
            </div>
            <header className={`${inter.className} w3-container w3-center w3-padding-48 w3-white`}>
                <h1 className="w3-xxxlarge">
                    <b className='w3-opacity'>DEVCUP</b> <img src="/coffee.gif" alt="coffee" width={48} height={48} />
                </h1>
                <h6>
                    Take a sip of coffee, and a gulp of developer wisdom. Double-shot your skills with Devcup
                </h6>
            </header>
        </>
    )
}