import styles from "./Navbar.module.scss"
import planetsData from "@/data.json"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Navbar() {

    const router = useRouter();

    const [mobileNavActive, setMobileNavActive] = useState(false);

    useEffect(() => {
        if (mobileNavActive) {
            document?.body?.classList.add("no-scroll");
        } else {
            document?.body?.classList.remove("no-scroll");
        }
    }, [mobileNavActive]);

    const handleItemClick = () => {
        setMobileNavActive(false);
    }

    return (
        <header className={styles['container']}>
            <h1 className={styles['logo']}>The planets</h1>
            <button onClick={() => setMobileNavActive((state) => !state)} aria-label="mobile navigation" className={styles['mobile-nav-btn']}>
                <Image width={24} height={17} src={"/icon-hamburger.svg"} alt={""} />
            </button>
            <nav className={`${styles['nav']} ${mobileNavActive ? styles["nav-active"] : ""}`}>
                <ul>
                    {planetsData.map((ele, i) => {
                        return (
                            <NavbarItem
                                onClick={handleItemClick}
                                key={ele.name}
                                active={ele.name.toLowerCase() == router.query.planet}
                                title={ele.name}
                                target={ele.name.toLowerCase()}
                                color={ele.color}
                            />
                        )
                    })}
                </ul>
            </nav>
        </header>
    )
}

function NavbarItem(
    { active, title, target, color, onClick }:
        { active: boolean, title: string, target: string, color: string, onClick: () => void }) {
    return (
        <li
            className={`${styles["navbar-item"]} ${active && styles["navbar-item-active"]}`}
        >
            <Link legacyBehavior className={styles['navbar-item-link']} href={target} >
                <a onClick={onClick}>
                    <span>{title}</span>
                    <Image aria-hidden className={styles['mobile-nav-item-icon']} width={4} height={8} src={"/icon-chevron.svg"} alt={""} />
                </a>
            </Link>
            <style jsx>{`
                a {
                    border-top: 0.25rem solid ${active ? color : "transparent"};
                }

                a:hover {
                    border-top: 0.25rem solid ${color};
                }

                @media screen and (max-width: 980px) {
                    a, a:hover {
                        border-top: unset;
                    }
                }

                @media screen and (max-width: 690px) {

                    a::before {
                        content: "";
                        display: inline-block;
                        width: 1rem;
                        height: 1rem;
                        background-color: ${color};
                        border-radius: 50%;
                        margin: 0 1.5rem;
                    }
                }
        `}</style>
        </li>
    )
}