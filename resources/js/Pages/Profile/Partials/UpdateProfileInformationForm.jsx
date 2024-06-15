import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useState } from "react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "w-screen ",
}) {
    const user = usePage().props.auth.user;
    console.log(user);
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("profile.update", user.id ));
    };

    // State untuk menyimpan URL gambar priview
    const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);

    // Fungsi untuk menampilkan priview gambar
    const previewImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setAvatarPreviewUrl(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setAvatarPreviewUrl(null);
        }
    };

    return (
        <section className="w-full">
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 flex gap-5 w-[100%] ">
                <div className="w-[50%] flex flex-col gap-10">
                    <div>
                        <InputLabel htmlFor="name" value="Nama Lengkap" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2 text-gray-800">
                                Your email address is unverified.
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Click here to re-send the verification
                                    email.
                                </Link>
                            </p>

                            {status === "verification-link-sent" && (
                                <div className="mt-2 font-medium text-sm text-green-600">
                                    A new verification link has been sent to
                                    your email address.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="w-[50%] flex flex-col gap-2">
                    <InputLabel htmlFor="photo" value="Photo" />

                    <div className="mt-1 flex items-center gap-5">
                        {avatarPreviewUrl ? (
                            <img
                                src={avatarPreviewUrl}
                                alt="avatar"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : user.avatar ? (
                            <img
                                src={user.avatar}
                                alt="avatar"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : (
                            <i className="bi bi-person-circle text-3xl"></i>
                        )}

                        <TextInput
                            id="photo"
                            type="file"
                            className=""
                            onChange={(e) => {
                                setData("avatar", e.target.files[0]);
                                previewImage(e);
                            }}
                        />
                    </div>

                    <InputError className="mt-2" message={errors.avatar} />

                    <div className="flex  gap-4 w-full justify-end">
                        <PrimaryButton disabled={processing}>
                            Save
                        </PrimaryButton>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Saved.</p>
                        </Transition>
                    </div>
                </div>
            </form>
        </section>
    );
}
