import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import React from "react";


const AddJadwal = ({ dokter, treatment }) => {
    const { data, setData, errors, post, reset } = useForm({
        dokter_id: dokter.id,
        treatment_id: "",
        hari: "",
        jam_mulai: "",
        jam_selesai: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.jadwal.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset(), document.getElementById("tambah_jadwal").click();
            },
        });
    };



    return (
        <>
            <input
                type="checkbox"
                id="tambah_jadwal"
                className="modal-toggle"
            />
            <div className="modal" role="dialog">
                <div className="modal-box  w-11/12 max-w-2xl ">
                    <form method="dialog">
                        <label
                            htmlFor="tambah_jadwal"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 cursor-pointer"
                        >
                            ✕
                        </label>
                    </form>
                    <h3 className="font-bold text-lg">Tambah Jadwal</h3>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3 pt-2"
                    >
                        <div className="flex flex-col gap-1">
                            <label htmlFor="hari">Hari</label>
                            <select
                                value={data.hari}
                                onChange={(e) =>
                                    setData("hari", e.target.value)
                                }
                                className="select select-secondary w-full max-w-xs"
                            >
                                <option value="" disabled >
                                    Pilih Hari
                                </option>
                                <option value="Senin">Senin</option>
                                <option value="Selasa">Selasa</option>
                                <option value="Rabu">Rabu</option>
                                <option value="Kamis">Kamis</option>
                                <option value="Jumat">Jumat</option>
                                <option value="Sabtu">Sabtu</option>
                                <option value="Minggu">Minggu</option>
                            </select>

                            <InputError message={errors.hari} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="jam_mulai">Jam Mulai</label>
                            <input
                                type="time"
                                name="jam_mulai"
                                id="jam_mulai"
                                className="input input-secondary"
                                value={data.jam_mulai}
                                onChange={(e) =>
                                    setData("jam_mulai", e.target.value)
                                }
                            />
                            <InputError message={errors.jam_mulai} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="jam_selesai">Jam Selesai</label>
                            <input
                                type="time"
                                name="jam_selesai"
                                id="jam_selesai"
                                className="input input-secondary"
                                value={data.jam_selesai}
                                onChange={(e) =>
                                    setData("jam_selesai", e.target.value)
                                }
                            />
                            <InputError message={errors.jam_selesai} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <select
                                value={data.treatment_id}
                                onChange={(e) =>
                                    setData("treatment_id", e.target.value)
                                }
                                className="select select-secondary w-full max-w-xs"
                            >
                                <option value="" disabled selected>
                                    Pilih Layanan Treatment
                                </option>
                                {treatment.map((treatment) => (
                                    <option
                                        key={treatment.id}
                                        value={treatment.id}
                                    >
                                        {treatment.nama}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.treatment_id} />
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

export default AddJadwal;
