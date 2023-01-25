import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./DesktopNavBtn.module.scss"

export default function DesktopNavBtn(
    { title, target, i, activeColor }:
        { title: string, target: string, i: number, activeColor: string }
) {

    const router = useRouter();

    const active = router.query.infoType == target || (router.query.infoType == undefined && target == "overview")

    return (
        <>
            <li className={styles['container']}>
                <Link
                    legacyBehavior
                    href={{
                        pathname: router.pathname,
                        query: { ...router.query, infoType: target }
                    }}
                >
                    <a>
                        <span aria-hidden>{i.toString().padStart(2, "0")}</span>
                        <span>{title}</span>
                    </a>
                </Link>
            </li>
            <style jsx>{`
                li a {
                    background-color: ${active ? activeColor : ""} !important;
                }
                `}</style>
        </>
    )
}