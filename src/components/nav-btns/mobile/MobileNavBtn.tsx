import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./MobileNavBtn.module.scss"

export default function MobileNavBtn(
    { title, target, activeColor }:
        { title: string, target: string, activeColor: string }) {

    const router = useRouter();

    const active = router.query.infoType == target || (router.query.infoType == undefined && target == "overview")

    return (
        <>
            <li className={`${styles['container']} ${active && styles['container-active']}`}>
                <Link
                    legacyBehavior
                    href={{
                        pathname: router.pathname,
                        query: { ...router.query, infoType: target }
                    }}
                >
                    <a>
                        {title}
                    </a>
                </Link>
            </li>
            <style jsx>{`
                li a {
                    border-bottom: 4px solid ${active ? activeColor : "transparent"};
                }
                `}</style>
        </>
    );
}