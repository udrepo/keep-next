import '../styles/globals.css'
import { Provider } from "../context";
import AuthState from "../components/AuthState";

export default function MyApp({ Component, pageProps }) {
    return (
        <Provider>
            <AuthState>
            <Component {...pageProps} />
            </AuthState>
        </Provider>
    );
}
