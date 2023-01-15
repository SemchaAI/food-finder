import { Route, Routes } from "react-router-dom";
import { Container } from "./components/Container/Container";
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { NotFound } from "./components/NotFound/NotFound";
import { Controls } from "./pages/Controls";
import { Detailed } from "./pages/Detailed";
import { Favorite } from "./pages/Favorite";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Container>
        <Content>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/favorite" element={<Favorite />} />
            <Route path="/recipe/:name" element={<Detailed />} />
            <Route path="/search" element={<Controls />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
      </Container>
      <Footer />
    </>
  );
}

export default App;
