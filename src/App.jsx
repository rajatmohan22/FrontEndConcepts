import AvailableNFTs from "./components/AvailableNFTs";
import "./App.css"

function App() {
  return (
    <>
      <h1 className="text-primary md-4 mx-4 mx-4">My-NFTs</h1>
      <div className="container AvailableNFTs-container">
        <AvailableNFTs />
      </div>
    </>
  );
}

export default App;
