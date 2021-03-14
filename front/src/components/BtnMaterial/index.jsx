import React, { useEffect } from "react";
import "./style.css";

export default function Btn({ label, ...rest }) {
  function effect(e) {
    const $botao = e.target;
    const $onda = document.createElement("span");
    $onda.classList.add("onda");
    $botao.insertAdjacentElement("beforeend", $onda);

    const posicoesDoBotao = $botao.getBoundingClientRect();
    const topo = Math.abs(posicoesDoBotao.top - e.clientY);
    const esquerda = Math.abs(posicoesDoBotao.left - e.clientX);
    const scale = Math.min(posicoesDoBotao.height, posicoesDoBotao.width); // posicoesDoBotao.height;

    $onda.style.setProperty("--topo", `${topo}px`);
    $onda.style.setProperty("--esquerda", `${esquerda}px`);
    $onda.style.setProperty("--scale", scale);
    $onda.style.setProperty("--opacity", 1);

    // 3 limpa efeito
    function limpaEfeito() {
      $onda.removeEventListener("transitionend", limpaEfeito);
      $onda.style.setProperty("--opacity", 0);

      $onda.addEventListener("transitionend", () => {
        $onda.remove();
      });
    }
    $onda.addEventListener("transitionend", limpaEfeito);
  }

  useEffect(() => {}, []);

  return (
    <>
      <button 
      id="btnRipple"
      className="btnRipple"
      onClick={(e) => effect(e)}
      {...rest}
       >
        {label}
      </button>
    </>
  );
}
