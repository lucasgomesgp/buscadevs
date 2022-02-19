import { Dispatch, SetStateAction, useContext } from "react";
import { createContext, ReactNode, useState } from "react";
import { Repos } from "../pages/Home/Home.types";

export const ReposContext = createContext({} as ReposTypes);

type ReposProps = {
  children: ReactNode;
};

export type User = {
  name: string;
  avatar_url: string;
  bio: string;
  created_at: string;
  location: string;
  login: string;
  html_url: string;
};

interface ReposTypes {
  repos: Repos[];
  setRepos: Dispatch<SetStateAction<Repos[]>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}
export function ReposProvider<ReposTypes>({ children }: ReposProps) {
  const [repos, setRepos] = useState<Repos[]>([]);
  const [user, setUser] = useState<User>({} as User);

  return (
    <ReposContext.Provider value={{ repos, setRepos, user, setUser }}>
      {children}
    </ReposContext.Provider>
  );
}

export const useRepos = () => {
  const { repos, setRepos, setUser,user } = useContext(ReposContext);
  return { repos, setRepos, user, setUser };
};
