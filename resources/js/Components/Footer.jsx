import React from "react";

const Footer = () => {
    return (
        <footer className="footer py-4 bg-neutral text-neutral-content md:px-32">
            <aside>
                <img
                    // ubah logo dengan filter putih
                    className="w-32"
                    src="/assets/img/konten/logo.webp"
                    alt="app-logo"
                />
                <p>
                   {/* alamat */}
                    Jl. Raya Jemursari No. 234, Jakarta
                    <br />
                    copy right &copy; 2022 by <strong>BeautyCare</strong>
                </p>
            </aside>

        </footer>
    );
};

export default Footer;
