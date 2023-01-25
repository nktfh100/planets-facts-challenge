import Navbar from "@/components/navbar/Navbar";


export default function Layout({ children }: { children: any }) {
    return (
        <main>
            <Navbar />
            {children}
        </main>
    )
}