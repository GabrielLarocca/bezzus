import React, { useState, useEffect } from "react";
import Faq from "react-faq-component";
import CheckData from "../../components/CheckData/CheckData";
import Header from "../../components/Header/Header";
import ProductCard from "../../components/ProductCard/ProductCard";
import api from "../../services/api";
import { Range, getTrackBackground } from "react-range";
import "./style.css";

export default function Shopping({ rtl }) {
  const [marcas, setmarcas] = useState("");
  const [values, setValues] = useState([25, 50]);
  const [skip] = useState(0);
  const [lista, setlista] = useState([]);
  const limit = 25;
  const STEP = 100;
  const MIN = 10;
  const MAX = 30000;

  async function fetchData() {
    const response = await api.post("/v1/produtos/list", {
      limit,
      skip,
    });
    setlista(response.data.data);
  }

  // function fetchPagination(data) {
  //   const skip = data.selected * limit;
  //   window.scroll(0, 0);
  //   setSkip(skip);
  // }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  function marcasControl(value, e) {
    if (marcas.indexOf(value) > -1 && !e.target.checked) {
      marcas.splice(marcas.indexOf(value), 1);
    } else {
      marcas.push(value);
    }
    setmarcas([...marcas]);
  }

  const data = {
    rows: [
      {
        title: "CATEGORY",
        content: <p></p>,
      },
      {
        title: "PRICE",
        content: (
          <div className="mb-5 p-3">
            <Range
              values={values}
              step={STEP}
              min={MIN}
              max={MAX}
              onChange={(values) => {
                setValues(values);
              }}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: "36px",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "5px",
                      width: "100%",
                      borderRadius: "4px",
                      background: getTrackBackground({
                        values,
                        colors: ["#ccc", "#548BF4", "#ccc"],
                        min: MIN,
                        max: MAX,
                        rtl,
                      }),
                      alignSelf: "center",
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "42px",
                    width: "42px",
                    borderRadius: "4px",
                    backgroundColor: "#FFF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 2px 6px #AAA",
                  }}
                >
                  <div
                    style={{
                      height: "16px",
                      width: "5px",
                      backgroundColor: isDragged ? "#548BF4" : "#CCC",
                    }}
                  />
                </div>
              )}
            />
            <p className="textPrice">
              I want something between US${values[0]} and US${values[1]}
            </p>
          </div>
        ),
      },
      {
        title: "BRAND",
        content: (
          <>
            <div className="brands">
              <CheckData
                label={"Adidas"}
                onChange={(e) => marcasControl(e.target.value)}
              />
              <CheckData label={"Nike"} />
              <CheckData label={"Gucci"} />
              <CheckData label={"Versace"} />
            </div>
          </>
        ),
      },
      {
        title: "COLOR",
        content: (
          <div className="row">
            <div className="color a" />
            <div className="color b" />
            <div className="color c" />
            <div className="color d" />
            <div className="color e" />
          </div>
        ),
      },
    ],
  };

  const styles = {
    bgColor: "#e5e5e5",
    titleTextColor: "black",
    rowTitleColor: "black",
    // rowContentColor: 'grey',
    // arrowColor: "red",
  };

  const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
  };

  return (
    <div>
      <Header />
      <div className="container-fluid" id="shop">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-3 bodyBusca">
              <div className="ml-3">
                <Faq data={data} styles={styles} config={config} />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-9 mt-3">
              <div className="row showroom">
                {lista.map((el) => {
                  return <ProductCard value={el} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
