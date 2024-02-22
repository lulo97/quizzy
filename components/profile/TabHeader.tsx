import Image from "next/image"

interface TabHeaderProps {
    tab_name: string, 
    icon_dir: string, 
    handleTabClick: () => void,
    isActive: boolean
}

export default function TabHeader({
    tab_name, 
    icon_dir, 
    handleTabClick,
    isActive
}: TabHeaderProps) {

    return (
        <div className={`shadow-lg mx-2 flex-1 px-4 py-2 rounded-lg flex flex-row justify-center items-center gap-2 ${isActive ? "bg-white border-b-teal-400 border-2" : "bg-gray-50"}`} onClick={handleTabClick}>
            <Image
                src={icon_dir}
                alt={tab_name}
                width={20}
                height={20}
            >
            </Image>
            <div className={`font-extrabold ${isActive ? "text-sky-600" : "text-gray-600"} hover:text-dark-1`}>
                {tab_name}
            </div>
        </div>
    )
}