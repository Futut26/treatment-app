import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FormUpdateTreatment = ({ treatment }) => {
    const [EditActive, setEditActive] = useState(false);

    const { data, post, errors, setData, reset } = useForm({
        nama: "",
        harga: "",
        deskripsi: "",
        treatment_image: "",
    });

    if (treatment) {
        useEffect(() => {
            setData((prevData) => ({
                ...prevData,
                nama: treatment.nama || "",
                harga: treatment.harga || "",
                deskripsi: treatment.deskripsi || "",
            }));
        }, [treatment]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.treatment.update", treatment.id), {
            preserveScroll: true,
            onSuccess: () => (
                document.getElementById("update_treatment").click(),
                setEditActive(false)
            ),
        });
    };

    return (
        <>
            <input  type="checkbox" id="update_treatment" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box  w-11/12 max-w-2xl ">
                    <form method="dialog">
                        <label
                        htmlFor="update_treatment"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 cursor-pointer">
                            ✕
                        </label>
                    </form>
                    <h3 className="font-bold text-lg">
                        Detail Treatment {treatment?.nama}
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
                            <label htmlFor="nama">Nama Treatment</label>
                            <input
                                disabled={!EditActive}
                                type="text"
                                name="nama"
                                id="nama"
                                className="input input-secondary"
                                value={data.nama}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                            />
                            <InputError message={errors.nama} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="harga">Harga</label>
                            <input
                                disabled={!EditActive}
                                type="number"
                                name="harga"
                                id="harga"
                                className="input input-secondary"
                                value={data.harga}
                                onChange={(e) =>
                                    setData("harga", e.target.value)
                                }
                            />
                            <InputError message={errors.harga} />
                        </div>
                        <div className="flex flex-col gap-1 h-full">
                            <label htmlFor="deskripsi">Deskripsi</label>
                            {EditActive ? (
                                <>
                                    <ReactQuill
                                        theme="snow"
                                        className="h-52"
                                        value={data.deskripsi}
                                        onChange={(value) =>
                                            setData("deskripsi", value)
                                        }
                                    />
                                    <InputError message={errors.deskripsi} />
                                </>
                            ) : (
                                <div
                                    className="show-list"
                                    dangerouslySetInnerHTML={{
                                        __html: data.deskripsi,
                                    }}
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-1 mt-10">
                            <label htmlFor="treatment_image">
                                Gambar Treatment
                            </label>
                            <input
                                disabled={!EditActive}
                                type="file"
                                name="treatment_image"
                                className="file-input file-input-bordered file-input-secondary  w-full "
                                onChange={(e) =>
                                    setData(
                                        "treatment_image",
                                        e.target.files[0]
                                    )
                                }
                            />
                            <InputError message={errors.treatment_image} />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Update Treatment
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FormUpdateTreatment;
