import SiteBackground from "@/components/Background/SiteBackground"
import Navbar from "@/components/Home/Navbar"
import ThreeGraphBG from "../dynamicImport"


export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="">
            <Navbar />
            <ThreeGraphBG nodeCount={60} />
            {children}
        </div>
    )
}
