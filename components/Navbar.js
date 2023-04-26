import Link from "next/link"
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export default function Navbar() {
    return (
        <>
            <div className="w3-bar w3-black w3-top">

                <Link href="/" className="w3-bar-item w3-button" title="Home">
                    <i className="fa fa-home" style={{ fontSize: 20 }} />
                </Link>
                <Link href="/article" className="w3-bar-item w3-button" title="Article">
                    <i className="fa fa-newspaper-o" style={{ fontSize: 20 }} />
                </Link>
                <span className="w3-bar-item w3-button w3-right" title="Home">
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