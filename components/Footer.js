import {FaTelegram} from "react-icons/fa";

export default function Footer() {
    return <footer className="h-10v border-t-2 px-40 border-red-200 shadow-md flex items-center justify-end gap-12">
        <p className="flex items-center gap-2">Connect: <FaTelegram size={22} color={'#f34d32'}/></p>
        <p>© Ulan Duisek. Almaty, 2022</p>
    </footer>
}