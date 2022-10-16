// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getAPI(name: string) {
  const HOST = process.env.NEXT_PUBLIC_IO_URL ?? "http://localhost:5001";
  return {
    get: (url: string) => {
      // get query string from url
      const query = url.split("?")[1];
      return fetch(`${HOST}${url.split("?")[0]}?name=${name}&${query}`).then(
        (res) => res.json()
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post: (url: string, data: any) => {
      return fetch(`${HOST}${url}?name=${name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, name }),
      }).then((res) => res.json());
    },
  };
}
