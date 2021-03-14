import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import api from "../../service/api";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import ReactPaginate from "react-paginate";

export default function Clientes() {
  const [lista, setlista] = useState([]);
  const [nome, setnome] = useState("");
  const [skip, setSkip] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const limit = 25;

  function fetchPagination(data) {
    const skip = data.selected * limit;
    setSkip(skip);
  }

  async function fetchData() {
    const response = await api.post("/v1/usuario/list", {
      limit,
      skip,
      busca: nome,
    });
    console.log(response.data.data);
    setlista(response.data.data);
    setPageCount(response.data.total / limit);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [skip]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="d-block mb-4">
          <span className="text-primary">Clientes </span>
          <span className="text-secondary ml-2">
            Todos usuarios cadastrados
          </span>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-4 mt-2 mb-3">
            <input
              type="text"
              value={nome}
              onChange={(e) => setnome(e.target.value)}
              className="input-search"
              placeholder="Pesquise um nome"
            />
          </div>
          <div className="col-sm-12 col-md-4 mt-2 mb-3">
            <button className="btn-main w-100" onClick={() => fetchData()}>
              Buscar
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card-content table-responsive-sm">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Ativo</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">Root</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((el, i) => {
                    return (
                      <tr key={i}>
                        <td>{el.ativo ? <FaCheck /> : <MdClose />}</td>
                        <td>{el.nome}</td>
                        <td>{el.email}</td>
                        <td>{el.root ? <FaCheck /> : <MdClose />}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {lista.length > 0 && (
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  breakLabel="..."
                  breakClassName="page-item disabled"
                  breakLinkClassName="page-link"
                  disabledClassName="disabled"
                  pageCount={pageCount}
                  pageClassName="page-item"
                  previousClassName="page-item"
                  pageLinkClassName="page-link"
                  initialPage={0}
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  marginPagesDisplayed="0"
                  pageRangeDisplayed="6"
                  onPageChange={fetchPagination}
                  containerClassName="pagination"
                  subContainerClassName="pages"
                  activeClassName="active"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
