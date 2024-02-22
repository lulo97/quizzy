import Link from "next/link";

interface ProfileButtonProps {
    profile_url: string;
}

export default function ProfileButton(props: ProfileButtonProps) {
    return (
        <Link href={props.profile_url} className="flex flex-row items-center justify-between font-semibold">
            Profile
        </Link>
    )
}