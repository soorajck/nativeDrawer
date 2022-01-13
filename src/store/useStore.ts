import create from 'zustand';

interface storeState {
  loggedIn: boolean;
  data: any;
  setLoggedIn: (loggedIn: boolean) => void;
  setData: (data: object) => void;
}

const useStore = create<storeState>(set => ({
  loggedIn: true,
  data: {},
  setLoggedIn: loggedIn => {
    set(state => ({
      loggedIn: loggedIn,
    }));
  },
  setData: data => {
    set(state => ({
      data: {...state.data, ...data},
    }));
  },
}));
export default useStore;
