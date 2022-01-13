import create from 'zustand';

interface storeState {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const useStore = create<storeState>(set => ({
  loggedIn: false,
  setLoggedIn: loggedIn => {
    set(state => ({
      loggedIn: loggedIn,
    }));
  },
}));
export default useStore;
