import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import EditDokter from "./Partials/EditDokter";
import AddJadwal from "./Partials/AddJadwal";
import EditJadwal from "./Partials/EditJadwal";
import { useForm } from "@inertiajs/react";

const Jadwal = ({ jadwal, auth, title, treatment }) => {
    const [JadwalSelected, setJadwalSelected] = useState(null);

    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this?")) {
            destroy(route("admin.jadwal.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout auth={auth} title={title + " " + jadwal.nama}>
            <div className="pt-5 pb-20 flex flex-col gap-4">
                <div className="w-full">
                    <label
                        htmlFor="tambah_jadwal"
                        className="btn btn-primary cursor-pointer"
                    >
                        Add new
                    </label>
                </div>

                <div className="overflow-auto">
                    <table className="table table-zebra text-center">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Hari</th>
                                <th>Treatment</th>
                                <th>Jam Mulai</th>
                                <th>Jam Selesai</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jadwal.jadwal.map((j, index) => (
                                <tr key={j.id}>
                                    <td>{index + 1}</td>
                                    <td>{j.hari}</td>
                                    <td>{j.treatment.nama}</td>
                                    <td>{j.jam_mulai}</td>
                                    <td>{j.jam_selesai}</td>
                                    <td className="space-x-2">
                                        <label
                                            htmlFor="edit_jadwal"
                                            onClick={() => setJadwalSelected(j)}
                                            className="btn btn-secondary cursor-pointer"
                                        >
                                            Edit
                                        </label>
                                        <button
                                        onClick={() => handleDelete(j.id)}
                                         className="btn btn-error cursor-pointer">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <AddJadwal treatment={treatment} dokter={jadwal} />
                {JadwalSelected && (
                    <EditJadwal jadwal={JadwalSelected} treatment={treatment} />
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Jadwal;
