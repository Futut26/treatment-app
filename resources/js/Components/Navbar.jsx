import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { useState } from "react";

const Navbar = ({ auth }) => {

    const order = usePage().props.order;


    // cek apakah salah satu dari order notfinya true
    const isOrderNotif = order?.some((order) => order.notif === true);

    return (
        <div>
            <nav
                className={`w-full md:h-20 h-14 bg-white shadow-md  flex md:px-10 lg:px-32 fixed top-0 z-40 px-4 py-2 md:py-0 `}
            >
                <Link href="/" className="w-auto">
                    <figure className="h-full py-2">
                        <img
                            className="h-full filter invert"
                            src="/assets/img/konten/logo.webp"
                            alt="app-logo"
                        />
                    </figure>
                </Link>

                <div className="w-auto ml-auto md:items-center  md:flex">
                    <ul className="flex items-center gap-8">
                        <li>
                            {auth.user ? (
                                <div className="dropdown dropdown-hover ">
                                    {auth.user.avatar ? (
                                        <div className="flex gap-3 items-center">
                                            <h1 className="hidden md:block">
                                                Welcome,{" "}
                                                <span className="font-semibold">
                                                    {auth.user.name}
                                                </span>
                                            </h1>
                                            <img
                                                tabIndex={1}
                                                src={auth.user?.avatar}
                                                className="w-10 h-10 object-cover rounded-full ring ring-primary ring-offset-base-100 ring-offset-2  "
                                                alt="avatar"
                                                referrerPolicy="no-referrer"
                                            />

                                          {isOrderNotif && (

                                                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex justify-center items-center">
                                                <i className="fas fa-bell"></i>

                                                    </span>
                                          )
                                            }
                                        </div>
                                    ) : (
                                        <i
                                            tabIndex={1}
                                            className="fas fa-user-circle text-3xl text-primary"
                                        ></i>
                                    )}
                                    <ul
                                        tabIndex={1}
                                        className="dropdown-content  z-[1] menu p-2 shadow rounded-md bg-white w-36 "
                                    >
                                        {auth.user.role.name === "customer" ? (
                                            <div className="w-full">
                                                <li className="w-full">
                                                    <Link
                                                        href={route(
                                                            "profile.edit"
                                                        )}
                                                    >
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/customer/order">

                                                    Reservasi

                                                        {isOrderNotif && (
                                                            <span className=" bg-primary text-white rounded-full w-5 h-5 flex justify-center items-center">
                                                                <i className="fas fa-bell"></i>
                                                            </span>
                                                        )}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        method="post"
                                                        href={route("logout")}
                                                        as="button"
                                                    >
                                                        Logout
                                                    </Link>
                                                </li>
                                            </div>
                                        ) : (
                                            <div className="w-full">
                                                <li className="w-full">
                                                    <Link
                                                        href={route(
                                                            "profile.edit"
                                                        )}
                                                    >
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/dashboard">
                                                        Dhasboard
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        method="post"
                                                        href={route("logout")}
                                                        as="button"
                                                    >
                                                        Logout
                                                    </Link>
                                                </li>
                                            </div>
                                        )}
                                    </ul>
                                </div>
                            ) : (
                                <Link
                                    className="btn btn-secondary "
                                    href="/login"
                                >
                                    <i className="fas fa-sign-out-alt"></i>
                                    Login/Registrasi
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>


            </nav>
        </div>
    );
};

export default Navbar;
