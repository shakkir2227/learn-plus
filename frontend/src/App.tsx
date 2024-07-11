import RoutePaths from "./routes"
import { Provider } from "react-redux"
import store from "./store"


const App = () => {
    return (
        <Provider store={store}>
            <RoutePaths />
        </Provider>
    )
}

export default App
