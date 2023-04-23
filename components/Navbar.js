import Link from "next/link"

export default function Navbar() {
    return (
        <div className="w3-bar w3-black w3-hide-small">
            <Link href="/" className="w3-bar-item w3-button" title="Home">
                <i className="fa fa-home" />
            </Link>
            <Link href="/article/1" className="w3-bar-item w3-button" title="Article">
                <i className="fa fa-newspaper-o" />
            </Link>
        </div>
    )
}