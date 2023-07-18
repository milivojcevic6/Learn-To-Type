import logo from "../../logo.svg";

function Home(){

    return(
        <div>
            <img src={logo} className="App-logo" alt="logo" />
            {/*<p>*/}
            {/*  Edit <code>src/App.js</code> and save to reload.*/}
            {/*</p>*/}
            <p>
                Write the word you see in order to win!
            </p>
            <a
                className="App-link"
                href="/play"
            >
                Play
            </a>
        </div>
    );
}

export default Home