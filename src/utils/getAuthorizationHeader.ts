
export function getAuthorizationHeader() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${JSON.parse(token || "")?.accessToken || ""}`,
  };
}