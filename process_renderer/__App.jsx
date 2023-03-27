// import { useCallback, useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import "./App.css";

// import Window from "./pages/Index";

// function App() {
//   const [name, setName] = useState(["asdf"]);
//   const [data, setData] = useState([""]);

//   // useEffect(() => {}, [name]);

//   const onClick = async () => {
//     window.api.invoke("fromTest");
//     console.log("render to send");
//   };

//   window.api.receive("test", (data) => {
//     console.log(`Received from main process`);
//     setName(data.accountId);
//     window.api.removeAllListeners("test");
//     console.log(data);
//   });

//   return (
//     <div className="App">
//       <Window />
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="./vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>

//       <div className="card">
//         <button onClick={onClick}>{name}</button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   );
// }

// export default App;
