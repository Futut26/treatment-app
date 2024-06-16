import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";

const Show = ({ order, auth, title, treatment }) => {
    console.log(order);
    console.log(treatment);

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [availableDoctors, setAvailableDoctors] = useState([]);
    const [isInputComplete, setIsInputComplete] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState({});

    const [resecedujle, setRescedujle] = useState(false);

    const handleDateChange = (e) => {
        const date = e.target.value;
        setData({
            ...data,
            tanggal_treatment: date,
        });
        setSelectedDate(date);
        checkAvailability(date, selectedTime);
    };

    const handleTimeChange = (e) => {
        const time = e.target.value;
        setData({
            ...data,
            jam_treatment: time,
        });
        setSelectedTime(time);
        checkAvailability(selectedDate, time);
    };

    const checkAvailability = (date, time) => {
        if (date && time) {
            setIsInputComplete(true);
        } else {
            setIsInputComplete(false);
            setAvailableDoctors([]);
            return;
        }

        const selectedDay = new Date(date).toLocaleDateString("id-ID", {
            weekday: "long",
        });

        const availableSchedules = treatment.jadwal.filter((jadwal) => {
            const startTime = jadwal.jam_mulai.slice(0, 5);
            const endTime = jadwal.jam_selesai.slice(0, 5);

            return (
                selectedDay === jadwal.hari &&
                time >= startTime &&
                time <= endTime
            );
        });

        if (availableSchedules.length > 0) {
            setAvailableDoctors(availableSchedules.map((jadwal) => jadwal));
        } else {
            setAvailableDoctors([]);
        }
    };

    const { data, post, errors, setData } = useForm({
        jadwal_id: selectedDoctor.id,
        jam_treatment: selectedTime,
        tanggal_treatment: selectedDate,
    });

    return (
        <AuthenticatedLayout auth={auth} title={title}>
            <div className="flex flex-col gap-3 pt-10 pb-48 h-full">
                <div className="flex gap-4 w-full md:flex-row">
                    <div className="md:w-[30%] w-full h-full">
                        <img
                            className="w-full h-full"
                            src={order.treatment.treatment_image}
                            alt="Movie"
                        />
                    </div>

                    <div className="w-auto border-2 px-5">
                        <table className="table">
                            {/* head */}
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>Layanan Treatment</th>
                                    <td>:</td>
                                    <td>{order.treatment.nama}</td>
                                </tr>

                                <tr>
                                    <th>Dokter</th>
                                    <td>:</td>
                                    <td>
                                        <div className="flex gap-2 items-center justify-center">
                                            <img
                                                src={
                                                    order.jadwal.dokter
                                                        .dokter_image
                                                }
                                                alt="dokter"
                                                className="w-10 h-10 object-cover rounded-full"
                                            />

                                            <div>
                                                <h3 className="font-bold">
                                                    {order.jadwal.dokter.nama}
                                                </h3>
                                                <p>
                                                    {
                                                        order.jadwal.dokter
                                                            .spesialis
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <th>Harga</th>
                                    <td>:</td>
                                    <td>
                                        {/* convert to rupiah */}
                                        Rp.{" "}
                                        {new Intl.NumberFormat("id-ID").format(
                                            order.treatment.harga
                                        )}
                                        , 00
                                    </td>
                                </tr>

                                <tr>
                                    <th>Jadwal Treatment</th>
                                    <td>:</td>
                                    <td>
                                        {new Intl.DateTimeFormat("id-ID", {
                                            dateStyle: "full",
                                        }).format(
                                            new Date(order.tanggal_treatment)
                                        )}{" "}
                                        jam {order.jam_treatment}
                                    </td>
                                </tr>

                                <tr>
                                    <th>No Reservasi</th>
                                    <td>:</td>
                                    <td>{order.no_antrian}</td>
                                </tr>

                                <tr>
                                    <th>Status Reservasi</th>
                                    <td>:</td>
                                    <td>
                                        {order.status === "pending" ? (
                                            <span className="badge badge-warning">
                                                {order.status}
                                            </span>
                                        ) : order.status === "terkonfirmasi" ? (
                                            <span className="badge badge-success">
                                                {order.status}
                                            </span>
                                        ) : order.status === "reschedule" ? (
                                            <span className="badge badge-info">
                                                {order.status}
                                            </span>
                                        ) : (
                                            <span className="badge badge-error">
                                                {order.status}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex flex-col gap-2 pb-32">
                    {/* button resecedujle */}
                    <div className="flex gap-2">
                        <button
                            disabled={order.status === "terkonfirmasi"}
                            onClick={() => setRescedujle(!resecedujle)}
                            className="btn btn-success"
                        >
                            Reschedule Jadwal
                        </button>
                    </div>
                    <div className="p-4 border border-primary">
                        <div className="grid grid-cols-2 gap-5 ">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="tanggal">Tanggal</label>
                                <input
                                    disabled={!resecedujle}
                                    type="date"
                                    name="tanggal"
                                    id="tanggal"
                                    className="input input-primary"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="jam">Jam</label>
                                <input
                                    disabled={!resecedujle}
                                    type="time"
                                    name="jam"
                                    id="jam"
                                    className="input input-primary"
                                    value={selectedTime}
                                    onChange={handleTimeChange}
                                    required
                                />
                            </div>
                        </div>

                        {availableDoctors.length > 0 ? (
                            <div className="mt-5 w-[50%]">
                                <h2 className="text-xl font-bold">
                                    Available Doctors:
                                </h2>
                                <ul className="mt-2">
                                    {availableDoctors.map((doctor, index) => (
                                        <li
                                            key={index}
                                            className={`mt-2 transform transition duration-200 hover:bg-gray-200 p-3 rounded-md flex justify-between items-center ${
                                                selectedDoctor.id ===
                                                doctor.dokter.id
                                                    ? "bg-gray-200"
                                                    : ""
                                            }`}
                                        >
                                            <div className="flex gap-2 items-center">
                                                <img
                                                    src={
                                                        doctor.dokter
                                                            .dokter_image
                                                    }
                                                    alt={doctor.dokter.nama}
                                                    className="w-20 h-20 rounded-full object-cover"
                                                />
                                                <div>
                                                    <h3 className="font-bold">
                                                        {doctor.dokter.nama}
                                                    </h3>
                                                    <p>
                                                        {
                                                            doctor.dokter
                                                                .spesialis
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    disabled={
                                                        selectedDoctor.id ===
                                                        doctor.id
                                                    }
                                                    onClick={() => {
                                                        setSelectedDoctor(
                                                            doctor
                                                        );
                                                        setData({
                                                            ...data,
                                                            jadwal_id:
                                                                doctor.id,
                                                        });
                                                    }}
                                                    className="btn btn-primary"
                                                >
                                                    Pilih Dokter
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            isInputComplete && (
                                <div className="mt-5 text-red-500">
                                    No available slots for the selected date and
                                    time.
                                </div>
                            )
                        )}

                        {/* button booking */}
                        <div className="mt-5">
                            <button
                                disabled={
                                    !isInputComplete ||
                                    availableDoctors.length === 0

                                }
                                onClick={() =>
                                    post(
                                        route(
                                            "customer.order.reschedule",
                                            order.id
                                        )
                                    )
                                }
                                className="btn btn-primary"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
