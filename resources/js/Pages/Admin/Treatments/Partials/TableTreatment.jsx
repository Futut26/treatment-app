import { Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import FormUpdateTreatment from "./FormUpdateTreatment";

const TableTreatment = ({ treatment }) => {
    const [TreatmentSelected, setTreatmentSelected] = useState(null);

    const {delete : destroy} = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this treatment?")) {
            destroy(route("admin.treatment.destroy", id));
        }
    }


    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra text-center">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Thumnail</th>
                        <th>Jenis Treatment</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {treatment.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="flex items-center justify-center w-full">
                                <img
                                    src={item.treatment_image}
                                    alt={item.nama}
                                    className="w-30 h-20 object-cover"
                                />
                            </td>
                            <td>{item.nama}</td>

                            <td>
                                {/* hagra format ke rupiah */}
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(item.harga)}
                            </td>
                            <td className="space-x-2">
                                <label
                                    onClick={() => setTreatmentSelected(item)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                                    htmlFor="update_treatment"
                                >
                                    Detail
                                </label>

                                <button
                                 onClick={() => handleDelete(item.id)}
                                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {TreatmentSelected && (
                <FormUpdateTreatment treatment={TreatmentSelected} />
            )}
        </div>
    );
};

export default TableTreatment;
