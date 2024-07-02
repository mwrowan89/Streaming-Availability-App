import "./App.css";
import Banner from "./components/Banner";
import Menu from "./components/Menu";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SelectButtons from "./components/SelectButtons";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="App">
      <Menu />
      <Header />
      <Banner /> <br></br>
      <br />
      <SelectButtons />
      <Footer className="footer" />
    </div>
  );
}
