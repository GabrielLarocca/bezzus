import React from "react";

export default function ProductCard(props) {
  return (
    <div className="col-sm-6 col-md-6 col-lg-4 carder">
      <div className="card">
        <img
          className="card-img-top"
          height="300"
          src={`${process.env.REACT_APP_API_URL}/upload/?&mimetype=${props.value.produtoFoto.mimetype}&filename=${props.value.produtoFoto.filename}&folder=produto`}
          alt="Card cap"
        />
        <div className="card-body">
          <p class="card-title text-center">
            <b>{props.value.marca}</b>
          </p>
          <p className="card-text text-center">{props.value.titulo}</p>
        </div>
      </div>
    </div>
  );
}
