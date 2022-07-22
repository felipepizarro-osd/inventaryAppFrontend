import React from "react";
import "./Home.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Search from "../../components/searchProduct/searchProducts";

const Home = () => {
  return (
    <section className="home">
      
      <div>
          <Sidebar className="sidebar" />
        </div>
      <div className="homeConteiner">
        <div className="search">
            <Search />
        </div>
        
      </div>
    </section>
  );
};

export default Home;