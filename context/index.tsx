import { createContext } from 'react';

export enum EUserType {
  ADMIN = 'admin',
  VIEWER = 'viewer',
  BRANCH = 'branch',
}

interface IMainContext {
  selectedTribe: number;
  setSelectedTribe: (n: number) => void;
  selectedGrade: number;
  setSelectedGrade: (n: number) => void;
  setOrganizationId: (n: number) => void;
  organizationId: number;
  userType: EUserType;
}

export const initialContext = {
  selectedTribe: 0,
  setSelectedTribe: (_v: number) => {
    // console.log({ v });
  },
  selectedGrade: 0,
  setSelectedGrade: (_v: number) => {
    // console.log({ v });
  },
  organizationId: 0,
  setOrganizationId: (_v: number) => {
    // console.log({ v });
  },
  userType: EUserType.VIEWER,
};

export const MainContext = createContext<IMainContext>(initialContext);

export const AuthContext = createContext<{
  user: any;
  setUser: (user: any) => void;
}>({ user: null, setUser: () => {} });
