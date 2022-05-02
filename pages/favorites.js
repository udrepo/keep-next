import {useContext, useEffect, useState} from "react";
import {Context} from "../context";
import {useRouter} from "next/router";
import {getAuth} from "firebase/auth";
import Loading from "../components/Loading";
import {FcBookmark} from "react-icons/fc";
import Bookmark from "../components/Bookmark";
import Footer from "../components/Footer";
import Link from 'next/link';
import axios from "axios";


export default function Favorites() {
    const [isLoading, setIsLoading] = useState(true);
    const [bookmarks, setBookmarks] = useState([]);
    const [link, setLink] = useState("");
    const {state, dispatch} = useContext(Context);
    const router = useRouter();
    const auth = getAuth();

    const getBookmarks = async () => {
        auth.onIdTokenChanged(async user => {
            if (!user) console.log('fuck!');
            else {
                const {token} = await user.getIdTokenResult();
                axios.get('http://localhost:3030/api/bm/', {
                    headers: {token}
                }).then(res => setBookmarks(res.data.bookmarks));
            }
        });
    }

    const addBookmarkHandler = async e =>{
        e.preventDefault();
        auth.onIdTokenChanged(async user => {
            if (!user) console.log('fuck!');
            else {
                const {token} = await user.getIdTokenResult();
                axios.post('http://localhost:3030/api/bm/', {
                    link
                }, {
                    headers: {token}
                }).then(res => {
                    setIsLoading(true);
                    setBookmarks(res.data.bookmarks);
                });
            }
        });
    }

    const deleteBookmarkHandler = async (e, id) =>{
        e.preventDefault();
        auth.onIdTokenChanged(async user => {
            if (!user) console.log('fuck!');
            else {
                const {token} = await user.getIdTokenResult();
                axios.delete(`http://localhost:3030/api/bm/${id}`, {
                    headers: {token}
                }).then(res => {
                    setIsLoading(true);
                });
            }
        });
    }

    const logoutHandler = async () => {
        await auth.signOut();
        dispatch({
            type: 'LOGOUT'
        });
        await router.push('/');
    }
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1800);
        getBookmarks();
        console.log('as');
    }, [isLoading]);

    // if (!state.isAuth) {
    //     logoutHandler();
    // }

    return isLoading ? <Loading/> :
        <div>

            <nav className="flex items-center justify-between h-10v px-24 border-b-2 border-red-200 shadow-md">
                <div className="flex items-center">
                    <FcBookmark size={32} color={'#f87474'}/>
                    <Link href={'/'}><a className="text-4xl text-red-400"><p
                        className="text-gray-900">Keeppy</p>
                    </a></Link>
                </div>
                <div>
                    <img
                        className="inline-block h-9 w-9 rounded-full ring-2 ring-white"
                        src={state.user.picture}
                        alt=""
                    />
                    <button className="bg-blue-100 m-4 p-3 bg-gray-100 hover:bg-red-300 rounded-xl
                    transition ease-in delay-100"
                            onClick={logoutHandler}>Logout
                    </button>
                </div>
            </nav>
            <main className="px-24 py-10 grid grid-cols-6 gap-4">
                <div className="m-4 text">
                    <ul className="my-8">
                        <li className="py-2 px-4 ">
                            <Link href={'/home'}><a>My list</a></Link>
                        </li>
                        <li className="bg-red-300 py-2 px-4 rounded-xl">
                            <Link href={'/favorites'}><a>Favorites</a></Link>
                        </li>
                        <p className="py-2 px-4 ">
                            Collections:
                        </p>
                        <li className="py-2 px-4 ">
                            <button> - Lol</button>
                        </li>
                    </ul>
                    <label>Add collection</label>
                    <form>
                        <input type="text" placeholder="add collection"
                               className="border border-red-300 w-36 my-2"/>
                        <button type="submit"
                                className="bg-red-300 rounded opacity px-4 hover:bg-red-400 text-white">Add
                        </button>
                    </form>
                </div>
                <div className="col-span-5">
                    <div className="m-4 flex justify-between">
                        <p className="text-2xl">My List</p>
                        <form className="flex gap-2" onSubmit={addBookmarkHandler}>
                            <input type="url" name="url" id="url"
                                   className="px-4 py-1 border-2 rounded border-green-400"
                                   placeholder="https://example.com"
                                   pattern="https://.*" size="50"
                                   onChange={e => {
                                       e.preventDefault();
                                       setLink(e.target.value)
                                   }
                                   }
                                   required/>
                            <button type="submit"
                                    className="bg-green-600 rounded opacity px-4 hover:bg-teal-800 text-white">Add
                            </button>
                        </form>
                    </div>
                    <hr/>
                    <div className="grid grid-cols-3 gap-4">
                        {bookmarks.filter(bm=> bm.isFav === true).map(bm => <Bookmark key={bm._id}
                                                       id={bm._id}
                                                       title={bm.title} image={bm.image} isFav={bm.isFav} desc={bm.desc}
                                                       link={bm.link}
                                                       deleteBookmarkHandler = {deleteBookmarkHandler}
                        />).reverse()}
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
}
