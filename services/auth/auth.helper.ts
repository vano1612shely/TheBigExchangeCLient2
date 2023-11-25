export const saveTokenToStorage = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

export const removeTokenFromStorage = () => {
  localStorage.removeItem("accessToken");
};

export const getTokenFromStorage = (): string | null => {
  return localStorage.getItem("accessToken");
};
