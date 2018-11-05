import React, {useState} from "react";
import ReactDOM from "react-dom";

// import "./styles.css";

function App() {
    const [count, updateCount] = useState(0);
    console.log('render!')
    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>You clicked {count} times!</h2>

            <button onClick={() => updateCount(5)}>Decrement</button>
            <button onClick={() => updateCount(c => c + 1)}>Increment</button>
        </div>
    );
}

const rootElement = document.getElementById("app-root");
ReactDOM.render(<App/>, rootElement);
