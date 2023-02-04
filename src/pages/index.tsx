import { useRouter } from "next/router"
import { useEffect } from "react"
import PlanetsData from "@/data.json"

export default function Home() {

    const router = useRouter();

    useEffect(() => {
        router.push(PlanetsData[0].name.toLowerCase())
    }, [router])

    return (<h1 style={{ textAlign: "center" }}>Loading...</h1>)
}