import "./App.css";
import Banner from "./components/Banner";
import Menu from "./components/Menu";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SelectButtons from "./components/SelectButtons";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="main">
      <div className="menu-icon">
        <Menu />
      </div>
      <main className="App">
        <Header />
        <Banner /> <br></br>
        <SearchBar />
        <SelectButtons />
        <Footer />
      </main>
    </div>
  );
}
