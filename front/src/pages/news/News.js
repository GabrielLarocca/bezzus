import React from "react";
import Header from "../../components/Header/Header";
import blueberry from "../../img/burberry.jpg";
import ledder from "../../img/ESSENCIALS.webp";

import "./style.css";

export default function News() {
  return (
    <div>
      <Header />
      <div className="container-fluid" id="news">
        <h2 className="text-center">on hype</h2>
        <div className="col-12 mb-5">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <img
                className="img-fluid imgNews mx-auto d-block mt-5 ml-4"
                width="700"
                alt="photos"
                src={blueberry}
              ></img>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="notesNews">
                <p className="text-center noteTitulo">
                  <b>Bluberry</b>
                </p>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="d-block d-sm-none d-md-none" />
        <div className="col-12">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="notesNews">
                <p className="text-center noteTitulo">
                  <b>Ledder</b>
                </p>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <img
                className="img-fluid imgNews mx-auto d-block mt-5 ml-4"
                width="700"
                alt="photos"
                src={ledder}
              ></img>
            </div>
          </div>
        </div>
        <hr className="d-block d-sm-none d-md-none" />
        <div className="col-12 mb-5">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <img
                className="img-fluid imgNews mx-auto d-block mt-5 ml-4"
                width="700"
                alt="photos"
                src={blueberry}
              ></img>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="notesNews">
                <p className="text-center noteTitulo">
                  <b>Bluberry</b>
                </p>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="d-block d-sm-none d-md-none" />
        <div className="col-12 mb-5">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="notesNews">
                <p className="text-center noteTitulo">
                  <b>Ledder</b>
                </p>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <img
                className="img-fluid imgNews mx-auto d-block mt-5 ml-4"
                width="700"
                alt="photos"
                src={ledder}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
