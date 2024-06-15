import { router } from "@inertiajs/react";


const MenuDashboard = [
    {
        role: "admin",
        menu: [
            {
                name: "Treatment Service",
                url: "/admin/treatment",
                icon: "fas fa-home",
            },
            {
                name: "Kelola Dokter",
                url: "/admin/dokter",
                icon: "fas fa-users",
            },
            {
                name: "Kelola Reservasi" ,
                url: "/admin/customer/order",
                icon: "fas fa-users",
            },
            {
                name: "Pengaturan Akun",
                url: "/profile",
                icon: "fas fa-user-circle",
            },
            {
                name: "Halaman Depan",
                url: "/",
                icon: "fas fa-pager",
            }
        ],

    },
    {
        role: "customer",
        menu: [
            {
                name: "My Profile",
                url: "/profile",
                icon: "fas fa-user-circle",
            },
            {
                name: "Personal Data",
                url: "/personal-data",
                icon: "fas fa-user-lock",
            },
            {
                name: "My Reservation",
                url: "/customer/order",
                icon: "fas fa-money-check-alt",
            },
            {
                name: "Halaman Depan",
                url: "/",
                icon: "fas fa-pager",
            }
        ],
    }
];

export default MenuDashboard;
