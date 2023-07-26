import React from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

class Usuario extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      username: "",
      email: "",
      password: "",
      usuario: [],
      modalAberta: false,
    };
  }

  componentDidMount() {
    this.buscarUsuario();
  }

  componentWillUnmount() {}

  buscarUsuario() {
    fetch("http://localhost:3000/Usuario/")
      .then((res) => res.json())
      .then((dados) => {
        this.setState({ usuario: dados });
      });
  }

  deletarUsuario = (id) => {
    fetch("http://localhost:3000/Usuario/" + id, { method: "DELETE" })
      .then((res) => {
        console.log(res.status);
        if (res.ok) {
          this.buscarUsuario();
        } else {
          throw new Error("Erro ao excluir usuario");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  carregarUsuario = (id) => {
    fetch("http://localhost:3000/Usuario/" + id, { method: "GET" })
      .then((resposta) => resposta.json())
      .then((usuario) => {
        this.setState({
          id: usuario.ID,
          username: usuario.username,
          email: usuario.email,
          password: usuario.password,
        });
        this.abrirModal();
      });
  };

  atualizarUsuario = (usuario) => {
    fetch("http://localhost:3000/Usuario/" + usuario.id, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(usuario),
    }).then((res) => {
      if (res.ok) {
        this.buscarUsuario();
      } else {
        console.error("Erro ao atualizar o usuario:", res.status, res.statusText);
      }
    });
  };

  cadastraUsuario = (usuario) => {
    fetch("http://localhost:3000/Usuario", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then((res) => {
        console.log(res.status);
        if (res.ok) {
          this.buscarUsuario();
          this.setState({
            username: "",
            email: "",
            password: "",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  renderTabela() {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {this.state.usuario.map((usuario) => {
            return (
              <tr key={usuario.ID}>
                <td>{usuario.ID}</td>
                <td>{usuario.username}</td>
                <td>{usuario.email}</td>
                <td>
                  <button
                    className="BtnAtualizar"
                    onClick={() => this.carregarUsuario(usuario.ID)}
                  >
                    Atualizar
                  </button>
                  <button
                    className="BtnExcluir"
                    onClick={() => this.deletarUsuario(usuario.ID)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  atualizaUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  atualizaEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  atualizaSenha = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  submit = (event) => {
    event.preventDefault(); // impede que o comportamento padrão de submissão do formulário ocorra
    if (this.state.id == 0) {
      const usuario = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };

      this.cadastraUsuario(usuario);
    } else {
      const usuario = {
        id: this.state.id,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };

      this.atualizarUsuario(usuario);
    }
    this.fecharModal(event);
  };

  reset = (event) => {
    event.preventDefault();
    this.setState({
      id: 0,
      username: "",
      email: "",
      password: "",
    });
  };

  fecharModal = (e) => {
    e.preventDefault();
    this.setState({
      modalAberta: false,
      id: 0,
      username: "",
      email: "",
      password: "",
    });
  };

  abrirModal = () => {
    this.setState({
      modalAberta: true,
    });
  };

  render() {
    return (
      <div>
        <>
          {this.state.modalAberta && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={this.fecharModal}>
                  &times;
                </span>
                <form class="form-container">
                  <label>
                    Nome:
                    <input
                      type="text"
                      value={this.state.username}
                      onChange={this.atualizaUsername}
                    />
                  </label>
                  <br />
                  <label>
                    Email:
                    <input
                      type="email"
                      value={this.state.email}
                      onChange={this.atualizaEmail}
                    />
                  </label>
                  <br />
                  <label>
                    Senha:
                    <input
                      type="password"
                      value={this.state.password}
                      onChange={this.atualizaSenha}
                    />
                  </label>
                  <br />
                </form>
                <div className="Btns">
                  <button
                    className="novo"
                    type="submit"
                    onClick={this.fecharModal}
                  >
                    Fechar
                  </button>
                  <button className="novo" type="submit" onClick={this.submit}>
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
        <div className="btnNovo">
          <button className="novo" type="submit" onClick={this.abrirModal}>
            Novo
          </button>
        </div>

        {this.renderTabela()}
      </div>
    );
  }
}

export default Usuario;
