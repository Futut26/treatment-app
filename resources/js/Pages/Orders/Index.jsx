import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";

const Index = ({ orders, auth, title }) => {
    console.log(orders);

    const { delete: destroy } = useForm();

    // handle button delete order
    const handleDelete = (id) => {
        if (confirm("Apakah anda yakin untuk membatalkan reservasi?")) {
            destroy(route("customer.order.destroy", { id }));
        } else {
            return;
        }
    };

    return (
        <AuthenticatedLayout auth={auth} title={title}>
            <div className="flex flex-col gap-3 mt-10 mb-20">
                {orders.map((order, index) => (
                    <div
                        key={index}
                        className="card card-side bg-base-100 shadow-xl"
                    >
                        <figure>
                            <img
                                src={order.treatment.treatment_image}
                                alt="Movie"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                Layanan Treatment : {order.treatment.nama}
                            </h2>
                            {/* deskripsi parse html */}
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: order.treatment.deskripsi,
                                }}
                            ></p>

                            {order.status === "pending" &&
                            order.notif === true ? (
                                <div
                                    role="alert"
                                    className="alert alert-warning"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                    <span>Harap Konfirmasi Reservasi</span>
                                </div>
                            ) : (
                                ""
                            )}

                            <p>
                                Status :{" "}
                                <span
                                    className={
                                        order.status === "pending"
                                            ? "badge badge-warning"
                                            : order.status === "terkonfirmasi"
                                            ? "badge badge-success"
                                            : order.status === "reschedule"
                                            ? "badge badge-info"
                                            : "badge badge-error"

                                    }
                                >
                                    {order.status}{" "}
                                </span>
                            </p>

                            <h3 className="card-title">
                                Harga: Rp {""}
                                {new Intl.NumberFormat("id-ID").format(
                                    order.treatment.harga
                                )}
                                ,00
                            </h3>

                            <div className="card-actions justify-end">
                                <Link
                                    href={`/customer/order/${order.id}`}
                                    className="btn btn-primary"
                                >
                                    Detail Reservasi
                                </Link>
                                <button
                                    onClick={() => handleDelete(order.id)}
                                    disabled={order.status === "terkonfirmasi"}
                                    className="btn btn-error"
                                >
                                    Batalkan Reservasi
                                </button>

                                <Link
                                    disabled={order.status === "terkonfirmasi"}
                                    href={`/customer/order/${order.id}/confirm`}
                                    className="btn btn-success"
                                >
                                    <span className="badge badge-success">
                                        <i className="fas fa-bell"></i>
                                    </span>
                                    Konfirmasi Reservasi
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
