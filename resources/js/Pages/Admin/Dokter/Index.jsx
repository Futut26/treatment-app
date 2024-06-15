import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import AddDokter from "./Partials/AddDokter";
import EditDokter from "./Partials/EditDokter";

const Index = ({ auth, dokter, title }) => {
    const [DokterSelected, setDokterSelected] = useState(null);
    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("admin.dokter.index", { search }));
    };

    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("Are you sure?")) {
            destroy(route("admin.dokter.destroy", { id }));
        } else {
            return;
        }
    };

    return (
        <AuthenticatedLayout auth={auth} title={title}>
            <div className="flex pt-5 pb-20 flex-col gap-4">
                <div className="w-full flex gap-5">
                    <label
                        htmlFor="tambah_dokter"
                        className="btn btn-primary cursor-pointer"
                    >
                        Add new
                    </label>
                    <form onSubmit={handleSearch} className="flex gap-2 w-full">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search..."
                            className="input input-bordered w-1/2"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <input
                            type="submit"
                            value="Search"
                            className="btn btn-secondary cursor-pointer"
                        />
                    </form>
                </div>

                <div className="overflow-auto">
                    <table className="table table-zebra text-center">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Foto</th>
                                <th>Nama</th>
                                <th>Spesialis</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dokter.map((d, index) => (
                                <tr key={d.id}>
                                    <td>{index + 1}</td>
                                    <td className="w-full flex justify-center">
                                        <img
                                            src={d.dokter_image}
                                            alt={d.nama}
                                            className="w-20 h-20 object-cover rounded-full"
                                        />
                                    </td>
                                    <td>{d.nama}</td>
                                    <td>{d.spesialis}</td>
                                    <td className="space-x-2">
                                        <label
                                            htmlFor="edit_dokter"
                                            onClick={() => setDokterSelected(d)}
                                            className="btn btn-secondary cursor-pointer"
                                        >
                                            Edit
                                        </label>
                                        <Link
                                            href={route("admin.dokter.jadwal", {
                                                dokter: d.id,
                                            })}
                                            className="btn btn-warning cursor-pointer"
                                        >
                                            Jadwal
                                        </Link>
                                        <button
                                        onClick={() => handleDelete(d.id)}
                                         className="btn btn-error cursor-pointer">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <AddDokter />
                {DokterSelected && <EditDokter dokter={DokterSelected} />}
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
