import { Link, usePage } from "@inertiajs/react";
import React from "react";

const TreatmentsCard = () => {
    const service = usePage().props.service.treatment;
    console.log(service);

    return (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-10 py-20 lg:px-32 md:px-24 px-5 place-content-center">
            {service.map((item, index) => (
                <div key={index} className="card w-full bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src={item.treatment_image}
                            alt="Shoes"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                           {item.nama}
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>
                            {/* parse html */}
                            <div
                                className="show-list"
                             dangerouslySetInnerHTML={{ __html: item.deskripsi }} />
                        </p>
                        <div className="card-actions justify-end">
                            <Link href={`/treatment/${item.id}`} as="button"
                             className="btn btn-primary">Read More</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TreatmentsCard;
