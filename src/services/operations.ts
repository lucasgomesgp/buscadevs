import { User } from "../hooks/useRepos";
import { Repos } from "../pages/Home/Home.types";
import { api } from "./api";

export async function getUser(username: string) {
  const { data: repositories } = await api.get<Repos[]>(
    `users/${username}/repos?per_page=10`
  );
  const { data: userInfo } = await api.get<User>(`users/${username}`);
  return { repositories, userInfo };
}

export async function getReposPerPage(username: string, limit: string) {
  const { data: repositories } = await api.get<Repos[]>(
    `users/${username}/repos?per_page=${limit}`);
  return { repositories };
}
