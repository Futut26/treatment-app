import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FormTambahTreatment = () => {
    const { data, post, errors, setData, reset } = useForm({
        nama: "",
        harga: "",
        deskripsi: "",
        treatment_image: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.treatment.store"), {
            preserveScroll: true,
            onSuccess: () => (
                document.getElementById("tambah_treatment").close(),
                reset()
            ),
        });
    };

    return (
        <dialog id="tambah_treatment" className="modal">
            <div className="modal-box  w-11/12 max-w-2xl ">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-lg">
                    Tambah Jenis Treatment Baru
                </h3>

                <form
                    onSubmit={handleSubmit}
                 className="flex flex-col gap-3 pt-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="nama">Nama Treatment</label>
                        <input
                            type="text"
                            name="nama"
                            id="nama"
                            className="input input-secondary"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                        />
                        <InputError message={errors.nama} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="harga">Harga</label>
                        <input
                            type="number"
                            name="harga"
                            id="harga"
                            className="input input-secondary"
                            value={data.harga}
                            onChange={(e) => setData("harga", e.target.value)}
                        />
                        <InputError message={errors.harga} />
                    </div>
                    <div className="flex flex-col gap-1 h-full">
                        <label htmlFor="deskripsi">Deskripsi</label>
                        <ReactQuill
                            theme="snow"
                            className="h-52"
                            value={data.deskripsi}
                            onChange={(value) => setData("deskripsi", value)}
                        />
                        <InputError message={errors.deskripsi} />
                    </div>
                    <div className="flex flex-col gap-1 mt-10">
                        <label htmlFor="treatment_image">
                            Gambar Treatment
                        </label>
                        <input
                            type="file"
                            name="treatment_image"
                            className="file-input file-input-bordered file-input-secondary  w-full "

                            onChange={(e) =>
                                setData("treatment_image", e.target.files[0])
                            }
                        />
                        <InputError message={errors.treatment_image} />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Tambah Treatment
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default FormTambahTreatment;
