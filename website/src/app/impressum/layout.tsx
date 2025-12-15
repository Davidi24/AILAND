import Navbar from "@/components/Home/Navbar"
import ThreeGraphBG from "../dynamicImport"


export default function ImpressumLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="">
            <Navbar />
            <ThreeGraphBG nodeCount={60} />
            <div className="pt-8">
                 {children}
            </div>
           
        </div>
    )
}
