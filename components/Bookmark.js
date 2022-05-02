import Link from 'next/link'
import {FaListUl, FaRegStar, FaShareAlt, FaTrash} from "react-icons/fa";
import {useState} from "react";

export default function Bookmark({id, title, desc, image, isFav, link, isFavHandler, deleteBookmarkHandler}) {

    const [imageUrl, setImageUrl] = useState(image);

    function validURL(str) {
        let regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if (!regex.test(str)) return false;
        else return true;

    }

    if (!validURL(imageUrl))
        setImageUrl('https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png')

    const style = isFav ? 'hover:text-yellow-400 text-yellow-400' : 'hover:text-yellow-400'
    return <div className="m-1 p-4 hover:shadow-2xl ">
        <Link href={link}>
            <a>
                <img src={imageUrl.toString()}
                     height={200} width={400} loading="lazy"/>
                <p className="text-xl font-bold desc mt-2">{title}</p>
                <p className="text-sm desc mt-2">{desc}</p>
            </a>
        </Link>
        <div className="flex gap-2 text-gray-500 mt-4">
            <button className={style} onClick={e => {
                isFavHandler(e, id, isFav);
                console.log(id)
            }
            }><FaRegStar size={20}/></button>
            <button className="hover:text-red-400"><FaListUl size={20}/></button>
            <button className="hover:text-red-400"><FaShareAlt size={20}/></button>
            <button className="hover:text-red-600" onClick={e => deleteBookmarkHandler(e, id)}>
                <FaTrash size={20}/></button>
        </div>

    </div>
}