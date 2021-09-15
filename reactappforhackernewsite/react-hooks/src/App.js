import React, {useState, useEffect}from "react";

/**
 * 
 Class component
*/
/* 
class App extends React.Component {
    state = {
        count: 0
    };
    increment = () => {
        this.setState(
            { count: this.state.count +1}
            );
    }
    render () {
        return (
            <div>
                <h2>counter App</h2>
                <button onClick={this.increment}>Clicked {this.state.count} times</button>
            </div>
        );
    };
} */

/**
 * 
 *  Functional components
 * 
 *  */

// const App = () => {
//     const [count, setCount] = useState(0);

//     const increment = (msg) => {
        
//         setCount(count+1);
//     };

//     return (
//         <div>
//             <h2>counter App</h2>
//             <button onClick={increment}>Clicked {count} times</button>
//         </div>
//     );

// }

//Using life cycle components

/* class App extends React.Component {
    state = {
        count: 0
    };
    increment = () => {
        this.setState(
            { count: this.state.count +1}
            );
    }
    componentDidMount() {
        document.title = `Clicked ${this.state.count} times`;
    }

    componentDidUpdate(){
        document.title = `Clicked ${this.state.count} times`;
    }

    render () {
        return (
            <div>
                <h2>counter App</h2>
                <button onClick={this.increment}>Clicked {this.state.count} times</button>
            </div>
        );
    };
} 
 */

//Using useEffect istead of the lifecycle methods
/* 
const App = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Clicked ${count} times`;
    })

    const increment = (msg) => {
        
        setCount(count+1);
    };

    return (
        <div>
            <h2>counter App</h2>
            <button onClick={increment}>Clicked {count} times</button>
        </div>
    );

} */



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <img src={logo} className="App-logo" alt="logo" /> */}
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


//Create a Hacker news client

const App = () => {
    //set news
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('react');
    const [url, setUrl] = useState(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);

    const [loading, setLoading] = useState(false);

    //fetch news
    const fetchNews = () => {

        //set loading to true
        setLoading(true);

        fetch(url)
            .then(result => result.json())
            .then(data => {setNews(data.hits); setLoading(false) })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchNews();
    }, [url]); // control the on second argument
    const handleChange = (event) => {

        setSearchQuery(event.target.value);
    }

    const handleSumbit = (event) => {
        event.preventDefault();
        setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
    }

    const showLoading = () =>  (loading ? <h2>Loading....</h2> : "");

    const searchForm = () =>  (<form onSubmit={handleSumbit}>
        <input type="text" value={searchQuery} onChange={handleChange}></input>
        <button>Search</button>
    </form>);

    const showNews = () => {
        if(loading){
            return <h2>Loading....</h2>;
        } else{
            return (
                <div>
                    <form onSubmit={handleSumbit}>
                <input type="text" value={searchQuery} onChange={handleChange}></input>
                <button>Search</button>
                </form>
                {news.map((n,i) => ( <p key={i}>{n.title}</p>))  };
                </div>
            )
        }
    }

    return (
        <div>
            <h2>News</h2>
            {/* {showLoading()} */}
            {/* {searchForm()} */}
            {showNews()}
            
            
        </div>
    )
}

export default App;
