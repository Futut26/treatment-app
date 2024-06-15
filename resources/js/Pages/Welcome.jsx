import TreatmentsCard from "@/Components/TreatmentsCard";
import Guest from "@/Layouts/GuestLayout";
import { Link, Head, usePage } from "@inertiajs/react";

export default function Welcome({ auth }) {
    
    //console.log(service);
    return (
        <>
            <Guest auth={auth} title="Welcome">
                <div>
                    <img
                        className="w-full object-cover"
                    src="/assets/img/konten/banner.png" alt="" />
                </div>
                <TreatmentsCard  />
            </Guest>
        </>
    );
}
