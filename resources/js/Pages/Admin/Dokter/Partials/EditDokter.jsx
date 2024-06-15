import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditDokter = ({ dokter }) => {
    const { data, setData, errors, post, reset } = useForm({
        nama: "",
        spesialis: "",
        deskripsi: "",
        dokter_image: null,
    });

    if (dokter !== null) {
        useEffect(() => {
            setData((prevData) => ({
                ...prevData,
                nama: dokter.nama || "",
                spesialis: dokter.spesialis || "",
                deskripsi: dokter.deskripsi || "",
            }));
        },[dokter]);
    }

    const [EditActive, setEditActive] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.dokter.update", dokter.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset(), document.getElementById("edit_dokter").click();
                // reload window
                window.location.reload();
            },
        });
    };

    return (
        <>
            <input type="checkbox" id="edit_dokter" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box  w-11/12 max-w-2xl ">
                    <form method="dialog">
                        <label
                            onClick = {
                                () => {
                                    reset();
                                    setEditActive(false);
                                }

                            }
                            htmlFor="edit_dokter"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 cursor-pointer"
                        >
                            ✕
                        </label>
                    </form>
                    <h3 className="font-bold text-lg">
                        Edit Dokter {dokter?.nama}
                    </h3>
                    <button
                        onClick={() => setEditActive(!EditActive)}
                        className="btn btn-secondary w-full mt-5"
                    >
                        Edit
                    </button>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3 pt-2"
                    >
                        <div className="flex flex-col gap-1">
                            <label htmlFor="nama">Nama Dokter</label>
                            <input
                                disabled={!EditActive}
                                type="text"
                                name="nama"
                                id="nama"
                                className="input input-secondary"
                                placeholder="ex: Dr. John Doe"
                                value={data.nama}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                            />
                            <InputError message={errors.nama} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="nama">spesialis</label>

                            <input
                                disabled={!EditActive}
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

                            {EditActive ? (
                                <ReactQuill
                                    theme="snow"
                                    className="h-52"
                                    value={data.deskripsi}
                                    onChange={(value) =>
                                        setData("deskripsi", value)
                                    }
                                />
                            ) : (
                                <div
                                    className="h-52 show-list"
                                    dangerouslySetInnerHTML={{
                                        __html: data.deskripsi,
                                    }}
                                />
                            )}

                            <InputError message={errors.deskripsi} />
                        </div>
                        <div className="flex flex-col gap-1 mt-10">
                            <label htmlFor="dokter_image">
                                Ganti Foto Dokter
                            </label>
                            <input
                                disabled={!EditActive}
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
                            disabled={!EditActive}
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

export default EditDokter;
