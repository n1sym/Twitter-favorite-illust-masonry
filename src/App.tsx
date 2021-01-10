import MainTable from "./Components/MainTable";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>iineum</title>
      </Helmet>
      <div className="bg-indigo-100 min-h-screen">
        <div className="container mx-auto">
          <header className="flex justify-center items-center text-3xl h-32 mx-5">
            いいねした画像を並べるサイト
          </header>
          <div className="flex justify-center">
            <MainTable />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;
