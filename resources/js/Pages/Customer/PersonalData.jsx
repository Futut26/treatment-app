import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { useState } from "react";

const PersonalData = ({ auth, title }) => {
    const customer = usePage().props.auth.user.customer;
    const user = usePage().props.auth.user;

    const { data, setData, post, errors } = useForm({
        no_hp: customer.no_hp || "",
        no_ktp: customer.no_ktp || "",
        alamat: customer.alamat || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("personal-data.update", customer.id), {
            preserveScroll: true,
            onSuccess: () => {
                setEditActive(false);
            },
        });
    };

    const [EditActive, setEditActive] = useState(false);
    return (
        <AuthenticatedLayout auth={auth} title={title}>
            <div className="flex flex-col gap-4 pb-20 pt-5">
                <div className="flex flex-col ">
                    <h1 className="text-primary text-xl font-semibold">
                        Informasi Akun
                    </h1>
                    <div className="flex w-[50%] border border-secondary ">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Nama Lengkap</td>
                                    <td>:</td>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                    <td>{user.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {customer.no_hp === null ||
                customer.no_ktp === null ||
                customer.alamat === null ? (
                    <div role="alert" className="alert alert-error">
                        {/* icon warning */}
                        <i
                            className="fa fa-exclamation-triangle"
                            aria-hidden="true"
                        ></i>
                        <span>Data Pribadi anda belum lengkap !</span>
                    </div>
                ) : (
                    ""  
                )}

                <div className="flex flex-col w-full ">
                    <div className="flex py-4 items-center gap-4">
                        <h1 className="text-primary text-xl font-semibold">
                            Informasi Data Pribadi
                        </h1>

                        <button
                            onClick={() => setEditActive(!EditActive)}
                            className="btn btn-secondary"
                        >
                            Edit Data Pribadi
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="flex w-full border border-secondary p-5">
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="grid grid-cols-2 w-full gap-5">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text">
                                            No Hp
                                        </span>
                                    </div>
                                    <input
                                        disabled={!EditActive}
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                        value={data?.no_hp}
                                        onChange={(e) =>
                                            setData("no_hp", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.no_hp} />
                                </label>

                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text">
                                            No KTP
                                        </span>
                                    </div>
                                    <input
                                        disabled={!EditActive}
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered w-full "
                                        value={data?.no_ktp}
                                        onChange={(e) =>
                                            setData("no_ktp", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.no_ktp} />
                                </label>

                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text">
                                            Alamat
                                        </span>
                                    </div>
                                    {/* text area */}
                                    <textarea
                                        disabled={!EditActive}
                                        placeholder="Type here"
                                        className="textarea textarea-bordered w-full "
                                        value={data?.alamat}
                                        onChange={(e) =>
                                            setData("alamat", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.alamat} />
                                </label>
                            </div>

                            <div className="w-ful mt-5">
                                <button
                                    disabled={!EditActive}
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default PersonalData;
