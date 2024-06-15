import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddDokter = () => {
    const { data, setData, errors, post, reset } = useForm({
        nama: "",
        spesialis: "",
        deskripsi: "",
        dokter_image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.dokter.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset(),
                document.getElementById("tambah_dokter").click();
            },
        });
    };

    return (
        <>
            <input
                type="checkbox"
                id="tambah_dokter"
                className="modal-toggle"
            />
            <div className="modal" role="dialog">
                <div className="modal-box  w-11/12 max-w-2xl ">
                    <form  method="dialog">
                        <label
                            htmlFor="tambah_dokter"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 cursor-pointer"
                        >
                            ✕
                        </label>
                    </form>
                    <h3 className="font-bold text-lg">Tambah Dokter Baru</h3>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-2">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="nama">Nama Dokter</label>
                            <input
                                type="text"
                                name="nama"
                                id="nama"
                                className="input input-secondary"
                                placeholder="ex: Dr. John Doe"
                                value={data.nama}
                                onChange={(e) => setData("nama", e.target.value)}
                            />
                            <InputError message={errors.nama} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="nama">spesialis</label>
                            <input
                                type="text"
                                name="spesialis"
                                id="spesialis"
                                className="input input-secondary"
                                placeholder="ex: Dokter Gigi"
                                value={data.spesialis}
                                onChange={(e) =>
                                    setData("spesialis", e.target.value)
                                }
                            />
                            <InputError message={errors.spesialis} />
                        </div>

                        <div className="flex flex-col gap-1 h-full">
                            <label htmlFor="deskripsi">Deskripsi</label>
                            <ReactQuill
                                theme="snow"
                                className="h-52"
                                value={data.deskripsi}
                                onChange={(value) =>
                                    setData("deskripsi", value)
                                }

                            />
                            <InputError message={errors.deskripsi} />

                        </div>
                        <div className="flex flex-col gap-1 mt-10">
                            <label htmlFor="dokter_image">Foto Dokter</label>
                            <input
                                type="file"
                                name="dokter_image"
                                className="file-input file-input-bordered file-input-secondary  w-full "
                                onChange={(e) =>
                                    setData("dokter_image", e.target.files[0])
                                }
                            />
                            <InputError message={errors.dokter_image} />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Simpan
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddDokter;
