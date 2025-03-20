export const useAuth = () => {
    const localData = localStorage.getItem("access_token")
    return (
        localData ? true : false
    );
  };