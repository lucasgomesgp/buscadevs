import moment from "moment";
import { SyntheticEvent, useEffect, useState } from "react";
import { BsArrowLeft, BsFillCalendarDateFill } from "react-icons/bs";
import { RiFileUserFill } from "react-icons/ri";
import { TiLocation } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { RepoCard } from "../../components/RepoCard";
import { useRepos } from "../../hooks/useRepos";
import { getReposPerPage } from "../../services/operations";
import { Repos } from "../Home/Home.types";
import "./styles.css";

export function User() {
  const { repos, user, setRepos } = useRepos();
  const [repoSearch, setRepoSearch] = useState("");
  const [backRepos, setBackRepos] = useState<Repos[]>(repos);
  const navigate = useNavigate();

  function handleBack() {
    navigate("/");
  }

  function handleSend(event: SyntheticEvent) {
    event.preventDefault();
    if (repoSearch) {
      setRepos(repos.filter((repo) => repo.name === repoSearch));
    }
  }

  async function handleLimit(value: string) {
    const { repositories } = await getReposPerPage(user.login, value);
    setRepos(repositories);
  }
  useEffect(() => {
    if (!repoSearch) {
      setRepos(backRepos);
    }
  }, [repoSearch]);

  return (
    <>
      <header>
        <BsArrowLeft
          size={30}
          color="ffffff"
          className="backIcon"
          onClick={handleBack}
        />
        <div className="central" onClick={handleBack}>
          <img src="assets/github-sm.svg" alt="Github" className="githubImg" />
          <h2 className="subTitle">BuscaDev</h2>
        </div>
      </header>
      <main className="infos">
        {user ? (
          <section className="user">
            <a href={user.html_url ?? "https://github.com"} target="_blank" className="redirect-git">
            <img
              src={user.avatar_url ?? "http://lorempixel.com.br/200"}
              alt={user.name ?? ""}
              className="profileImg"
            />
            <div className="central-infos">
              <span className="user-git">@{user.login}</span>
              <div className="name">
                <RiFileUserFill size={30} color="ffffff" />
                <span className="data-text">{user.name}</span>
              </div>
              <div className="date">
                <BsFillCalendarDateFill size={30} color="ffffff" />
                <p className="data-text">
                  <span>
                    Criado em:{moment(user.created_at).format("YYYY") ?? ""}
                  </span>
                </p>
              </div>
              <div className="description">
                <span className="data-text">{user.bio}</span>
              </div>
            </div>
            <div className="bottom-infos">
              <TiLocation size={30} color="ffffff" />
              <div className="location">
                <span>{user.location ?? "Brasil"}</span>
              </div>
            </div>
            </a>
          </section>
        ) : (
          ""
        )}
        <section className="repos">
          <div className="repos-search">
            <form onSubmit={handleSend}>
              <input
                type="search"
                name="repo"
                className="repo"
                placeholder="Pesquise seu repositório"
                value={repoSearch}
                onChange={(event) => {
                  setRepoSearch(event.target.value);
                }}
              />
              <button type="submit" className="btn-search">
                Buscar
              </button>
            </form>
            <div className="qtde">
              <span>Qtde.</span>
              <select
                name="quant"
                id="quant"
                onChange={(event) => handleLimit(event.target.value)}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
          <section className="repos-area">
            {repos?.length !== 0 ? (
              repos?.map((data) => <RepoCard key={data.id} {...data} />)
            ) : (
              <h4>Ocorreu algum erro!</h4>
            )}
          </section>
        </section>
      </main>
    </>
  );
}
