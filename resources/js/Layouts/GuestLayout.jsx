import ApplicationLogo from "@/Components/ApplicationLogo";
import CustomerNotif from "@/Components/CustomerNotif";
import FlashMessage from "@/Components/FlashMessage";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Guest({ children, auth, title }) {
    const { flash } = usePage().props;
    const isCostumer = auth.user && auth.user.role.name === "customer";
    const hasEmptyKonsumenField =
        isCostumer &&
        Object.values(auth.user.customer).some((field) => field === null);

    return (
        <>
            {title && <Head title={title} />}
            {flash && <FlashMessage flash={flash} />}
            {hasEmptyKonsumenField && <CustomerNotif name={auth.user.name} />}

            <div>
                <Navbar auth={auth} />
                <div className=" mt-20 bg-gray-100">{children}</div>
                <Footer />
            </div>
        </>
    );
}
