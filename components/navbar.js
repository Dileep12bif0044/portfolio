import Link from 'next/link'
import { useRouter } from 'next/router';
import { NavBarWrapper } from '../styles/Navbar.js'

const Navbar = () => {
    const route = useRouter()
    return (
        <NavBarWrapper>
            <nav >
                <ul>
                    <Link href="/" passHref={true}>
                        <li className={route?.pathname == '/' ? "active" : "inactive"}>Home</li>
                    </Link>
                    <Link href='/about' passHref={true}>
                        <li className={route?.pathname == '/about' ? "active" : "inactive"}>About Me</li>
                    </Link>
                    <a className={route?.pathname == '/github' ? "active" : "inactive"} href='https://github.com/Dileep12bif0044' target="_blank" rel="noreferrer">Github</a>
                </ul>
            </nav>
        </NavBarWrapper>
    )
}

export default Navbar