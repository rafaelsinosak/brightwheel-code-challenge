import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer, Main } from "./components";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <div className="App" data-testid="app-1">
      <Routes>
          <Route path="/" exact element={<Main />}></Route>
          <Route> 404 Not Found!</Route>
      </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
