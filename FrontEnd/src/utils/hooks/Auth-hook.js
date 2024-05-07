import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export default function useAuth() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const [tokenExpDate, setTokenExpDate] = useState(null);
  const [profile, setProfile] = useState({});

  const login = useCallback((userId, token, profile, expDate) => {
    console.log("logged in");
    const tokenExpDate =
      expDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setToken(token);
    setUserId(userId);
    setProfile(profile);
    setTokenExpDate(tokenExpDate);

    localStorage.setItem(
      "user",
      JSON.stringify({
        userId,
        token,
        expiration: tokenExpDate.toISOString(),
      })
    );
    console.log(userId);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpDate(null);
    setProfile(profile);
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));

    const tokenExpirationDate = data && new Date(data.expiration).getTime();
    const now = new Date().getTime();

    if (data && data.token && tokenExpirationDate > now) {
      login(data.userId, data.token);
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpDate) {
      const remainingTime = tokenExpDate.getTime() - new Date().getTime();

      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpDate]);

  return { userId, token, login, logout, profile };
}
