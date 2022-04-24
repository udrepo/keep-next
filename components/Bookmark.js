import Image from "next/image";
import Link from 'next/link'
import {FaListUl, FaRegStar, FaShareAlt, FaTrash} from "react-icons/fa";

export default function Bookmark() {
    return <div className="m-1 p-4 hover:shadow-2xl ">
        <Link href={'https://react-icons.github.io/react-icons/icons?name=fa'}>
            <a>
                <Image src="/main.jpg" height={280} width={400}/>
                <p className="text-xl font-bold">Link title</p>
                <p className="text-sm">Site name</p>
            </a>
        </Link>
        <div className="flex gap-2 text-gray-500 mt-4">
            <button className="hover:text-yellow-400"><FaRegStar size={20}/></button>
            <button className="hover:text-red-400"><FaListUl size={20}/></button>
            <button className="hover:text-red-400"><FaShareAlt size={20}/></button>
            <button className="hover:text-red-600"><FaTrash size={20}/></button>
        </div>
    </div>
}