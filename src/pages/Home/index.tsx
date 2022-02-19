import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepos } from "../../hooks/useRepos";
import { getUser } from "../../services/operations";
import "./styles.css";

export function Home() {
  const { setRepos, setUser } = useRepos();
  const [userInpt, setUserInpt] = useState("");
  const navigate = useNavigate();
  const [isInvalid, setIsInvalid] = useState(false);

  function handleSubmit(event: SyntheticEvent) {
    event?.preventDefault();
    if (!userInpt) {
      setIsInvalid(true);
    } else {
      getAll();
    }
  }

  async function getAll() {
    const { repositories, userInfo } = await getUser(userInpt);
    if (repositories.length >= 1) {
      setRepos(repositories);
      setUser(userInfo);
      navigate("/user");
      setIsInvalid(false);
    }
  }
  return (
    <main className="content">
      <section className="searchArea">
        <h1 className="title">BuscaDev</h1>
        <img src="./assets/github.svg" alt="Github" className="github" />
        <form onSubmit={handleSubmit}>
          {isInvalid ? <p className="invalid-user">Usuário inválido</p> : ""}
          <input
            type="text"
            name="user"
            id="user"
            value={userInpt}
            onChange={(e) => setUserInpt(e.target.value)}
            placeholder="Usuário do Github"
            className="userGit"
            autoComplete="off"
          />
        </form>
      </section>
      <section className="wallpaper">
        <h3 className="centralSubText">Busque mais sobre o seu Dev favorito</h3>
        <img src="./assets/devs.png" alt="Desenvolvedores" className="devsImg" />
      </section>
    </main>
  );
}
