const fetcher = async ({ url, method, body, json = true }) => {
  const res = await fetch(url, {
    //add body field and spread over body object if body is true
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  if (json) {
    const data = await res.json();
    return data.data;
  }
};

export const register = (user) => {
  return fetcher({ url: "api/register", method: "post", body: user });
};

export const signin = (user) => {
  return fetcher({ url: "api/signin", method: "post", body: user });
};
