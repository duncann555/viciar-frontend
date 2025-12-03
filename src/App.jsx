import Menu from "./components/shared/Menu.jsx";
import Footer from "./components/shared/Footer.jsx";
import Admin from "./components/pages/Admin.jsx";

function App() {
  return (
    <>
      <Menu />
      <main>
        <Admin></Admin>
      </main>
      <Footer />
    </>
  );
}

export default App;
