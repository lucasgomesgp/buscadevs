import moment from "moment";
import { Repos } from "../../pages/Home/Home.types";
import { GoRepoForked } from "react-icons/go";
import { FcLock } from "react-icons/fc";
import "./styles.css";


export function RepoCard({
  id,
  description,
  created_at,
  forks,
  language,
  name,
  topics,
  html_url,
  license
}: Repos) {
  return (
    <>
      {id && name ? (
        <section className="card" key={id}>
          <div className="card-infos">
            <div className="infos-text">
              <h2 className="title-repo">
                <a href={`${html_url}`} target="_blank">
                  {name}
                </a>
              </h2>
              <p className="description-text">{description}</p>
              <div className="infos-icons">
                <div className="fork-infos">
                  <p>Forks</p>
                  <GoRepoForked size={30} />
                  <p>{forks}</p>
                </div>
                <div className="licence-infos">
                <p>Licença</p>
                <FcLock size={30} />
                <p>{license?.key.toUpperCase() ?? "Sem licença"}</p>
                </div>
              </div>
              <span className="language">Linguagem: {language}</span>
            </div>
          </div>
          <div className="about">
            <p>
              {topics
                ? topics.map((topic) => (
                    <span className="about-info" key={topic+"."+Math.random()*100}>#{topic}</span>
                  ))
                : ""}
            </p>
            <p>Criado em: {moment(created_at).format("YYYY/MM/DD")} </p>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}
