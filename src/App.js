import React, { Component } from "react";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import routes from "./routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        {routes}
        <Footer />
      </div>
    );
  }
}

export default App;
