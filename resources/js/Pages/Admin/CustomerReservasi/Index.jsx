import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

const Index = ({ auth, title, orders }) => {
    console.log(orders);

    const [search, setSearch] = useState("");
    const [filteredOrders, setFilteredOrders] = useState(orders);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const newFilteredOrders = orders.filter((order) => {
            return (
                order.user.name.toLowerCase().includes(search.toLowerCase()) ||
                order.no_antrian.toString().includes(search)
            );
        });
        setFilteredOrders(newFilteredOrders);
    };

    return (
        <AuthenticatedLayout auth={auth} title={title}>
            <div className="flex flex-col pb-32 pt-5">
                {/* form search by nama customer or no antrian */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="w-[60%] my-3 flex gap-2"
                >
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Cari berdasarkan nama customer atau no antrian"
                    />
                    <button type="submit" className="btn btn-primary">
                        Cari
                    </button>
                </form>

                <div className="overflow-x-auto">
                    <table className="table table-zebra table-xs text-center">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nama Customer</th>
                                <th>Email customer</th>
                                <th>Phone customer</th>
                                <th>Alamat</th>
                                <th>Jenis Treatment</th>
                                <th>Dokter</th>
                                <th>Jadwal Treatment</th>
                                <th>Status</th>
                                <th>No Antrian</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{order.user.name}</td>
                                    <td>{order.user.email}</td>
                                    <td>{order.user.customer.no_hp}</td>
                                    <td>{order.user.customer.alamat}</td>
                                    <td>{order.treatment.nama}</td>
                                    <td>{order.jadwal.dokter.nama}</td>
                                    <td>
                                        {new Intl.DateTimeFormat("id-ID", {
                                            dateStyle: "full",
                                        }).format(
                                            new Date(order.tanggal_treatment)
                                        )}{" "}
                                        jam {order.jam_treatment}
                                    </td>
                                    <td>{order.status}</td>
                                    <td>{order.no_antrian}</td>
                                    <td className="space-x-3">
                                        <Link
                                            href={`/admin/customer/order/${order.id}`}
                                            className="btn btn-success btn-xs"
                                        >
                                            Reschedule
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
