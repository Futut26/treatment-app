import Guest from "@/Layouts/GuestLayout";
import { Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

const Show = ({ treatment, title, auth }) => {
    console.log(treatment);
    console.log(auth);

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [availableDoctors, setAvailableDoctors] = useState([]);
    const [isInputComplete, setIsInputComplete] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState({});

    const isCostumer = auth?.user && auth?.user.role?.name === "customer";
    const hasEmptyKonsumenField =
        isCostumer &&
        Object.values(auth.user.customer).some((field) => field === null);

    console.log(selectedDoctor);

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

        const availableSchedules = treatment.jadwal.filter(
            (jadwal) =>
                selectedDay === jadwal.hari &&
                time >= jadwal.jam_mulai.slice(0, 5) &&
                time <= jadwal.jam_selesai.slice(0, 5)
        );

        if (availableSchedules.length > 0) {
            setAvailableDoctors(availableSchedules.map((jadwal) => jadwal));
        } else {
            setAvailableDoctors([]);
        }
    };

    const { data, post, errors, setData } = useForm({
        user_id: auth.user?.id,
        treatment_id: treatment.id,
        jadwal_id: selectedDoctor.id,
        jam_treatment: selectedTime,
        tanggal_treatment: selectedDate,
        status: "pending",
        no_antrian: "",
    });

    console.log("data", data);

    return (
        <Guest auth={auth} title={title}>
            <div className="flex lg:px-32 md:px-24 px-5 py-10 flex-col gap-5 ">
                <div className="flex gap-5 w-[100%] flex-col md:flex-row">
                    <figure className="md:w-[50%] w-full">
                        <img
                            className="w-full"
                            src={treatment.treatment_image}
                            alt={treatment.nama}
                        />
                    </figure>

                    <div className="md:w-[50%] w-full">
                        <h1 className="text-2xl font-bold">{treatment.nama}</h1>
                        <div className="mt-5">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: treatment.deskripsi,
                                }}
                            />
                        </div>

                        <div className="mt-5">
                            <h2 className="text-xl font-bold">
                                Harga: Rp {""}
                                {new Intl.NumberFormat("id-ID").format(
                                    treatment.harga
                                )}
                                ,00
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">Booking</h1>
                    <div className="grid md:grid-cols-2 gap-5 ">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="tanggal">Tanggal</label>
                            <input
                                type="date"
                                name="tanggal"
                                id="tanggal"
                                className="input"
                                value={selectedDate}
                                onChange={handleDateChange}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="jam">Jam</label>
                            <input
                                type="time"
                                name="jam"
                                id="jam"
                                className="input"
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
                                        className={`mt-2 transform transition duration-200 hover:bg-gray-200 p-3 rounded-md flex md:justify-between md:items-center ${
                                            selectedDoctor.id ===
                                            doctor.dokter.id
                                                ? "bg-gray-200"
                                                : ""
                                        }`}
                                    >
                                        <div className="flex gap-2 items-center ">
                                            <img
                                                src={doctor.dokter.dokter_image}
                                                alt={doctor.dokter.nama}
                                                className="w-20 h-20 rounded-full object-cover"
                                            />
                                            <div>
                                                <h3 className="font-bold">
                                                    {doctor.dokter.nama}
                                                </h3>
                                                <p>{doctor.dokter.spesialis}</p>
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
                                availableDoctors.length === 0 ||
                                auth?.user?.role?.name !== "customer" ||
                                auth === null
                            }
                            onClick={() =>
                                hasEmptyKonsumenField
                                    ? alert(
                                          "Please complete your profile first."
                                      )
                                    : post(route("customer.order.store"))
                            }
                            className="btn btn-primary"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </Guest>
    );
};

export default Show;
