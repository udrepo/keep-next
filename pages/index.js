import {useContext, useEffect, useState} from "react";
import {Context} from "../context";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useRouter} from "next/router";
import Loading from "../components/Loading";
import Image from "next/image";
import {FcBookmark, FcGoogle} from "react-icons/fc";
import Footer from "../components/Footer";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const login = async () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.idToken;
                // The signed-in user info.
                const user = result.user;
                router.push('/home');
                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

    }

    const {state} = useContext(Context);

    if (state.isAuth) {
        router.push('/home')
    }

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1900);
    }, []);

    return isLoading ? <Loading/> :
        <div className="">
            <nav className="flex items-center h-10v px-40 border-b-2 border-red-200 shadow-md">
                <FcBookmark size={32} color={'#f87474'}/>
                <h1 className="text-4xl text-red-400">Keeppy</h1>
            </nav>
            <section className="grid grid-cols-2 items-center h-80v px-40 py-7">
                <div><Image src="/main.jpg" width={400} height={268}/></div>
                <div className="flex flex-col items-center gap-10">
                    <p className="text-gray-700 font-bold text-2xl">Keep your bookmarks
                        safety and easy.
                        <br/>Get access to your data everywhere.
                        <br/>To start sign in with Google
                    </p>
                    <button className="bg-gray-100 m-4 p-3 w-fit flex items-center gap-4 rounded hover:shadow-2xl"
                            onClick={login}>
                        <FcGoogle size={40}/>
                        <p className="text-xl text-red-400 font-bold">Sign in with Google</p></button>
                </div>
            </section>
       <Footer/>
        </div>
}

{/*<h1 className="text-3xl font-bold underline text-orange-700">*/
}
{/*    Hello world!*/
}
{/*</h1>*/
}
{/*{JSON.stringify(state.isAuth)}*/
}
{/*<br/>*/
}
{/*<button className="bg-blue-100 m-4 p-3" onClick={login}>Sign in with Google</button>*/
}

