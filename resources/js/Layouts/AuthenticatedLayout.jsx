import { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import FlashMessage from "@/Components/FlashMessage";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";

export default function Authenticated({ children, title, auth }) {
    const { flash } = usePage().props;
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    return (
        <>
            {title && <Head title={title} />}
            <div className="h-screen w-full overflow-hidden">
                {/* jika user rolenya konsumen tampilkan component navab */}

                {flash && <FlashMessage flash={flash} />}
                <Header
                    auth={auth}
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                />
                <div className="w-full h-full flex">
                    <Sidebar isSidebarOpen={isSidebarOpen} auth={auth} />
                    <main
                        className={`h-auto overflow-auto bg-blue-gray-50 w-full p-4 md:p-8  ${
                            isSidebarOpen ? "blur-sm  brightness-50 " : ""
                        }`}
                    >
                        <h1 className="text-xl md:text-2xl font-semibold ">
                            {title}
                        </h1>

                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
