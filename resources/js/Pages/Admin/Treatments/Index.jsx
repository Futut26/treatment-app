import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import TableTreatment from "./Partials/TableTreatment";
import FormTambahTreatment from "./Partials/FormTambahTreatment";

const Index = ({ auth, title, treatment }) => {
    console.log("tr", treatment);
    return (
        <AuthenticatedLayout auth={auth} title={title}>
            <div className="pb-20 pt-5">
                <div className="flex flex-col gap-5">
                    <div className="col-span-2 flex w-full gap-3">
                        <button onClick={()=>document.getElementById('tambah_treatment').showModal()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add New
                        </button>
                    </div>
                    <TableTreatment treatment={treatment} />
                    <FormTambahTreatment/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
