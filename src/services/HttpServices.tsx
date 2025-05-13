// import { nhanvienType } from "../model/nhanvienType";

import UrlApi from "./UrlApi";

// export const getData = (api: string) => {
//   return new Promise<nhanvienType[]>(function (resolve) {
//     fetch(`http://localhost:3000/${api}`)
//       .then((res) => res.json())
//       .then((json) => {
//         const value: nhanvienType[] = json.data as nhanvienType[];
//         resolve(value);
//       })
//       .catch(() => {
//         resolve([]);
//       });
//   });
// };

const _getArrayData = (token: string, api: string) => {
  return fetch(`${UrlApi.api_http}${api}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

/*#region các hàm publish */

export const getToken = () => {
  const api = `${UrlApi.api_http}${UrlApi.api_auth_token}`;
  // console.log(api);
  return fetch(api, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: UrlApi.username,
      password: UrlApi.password,
    }),
  });
};

export const getTokenString = (): Promise<string> => {
  // console.log(api);
  return new Promise<string>((resolve) => {
    const api = `${UrlApi.api_http}${UrlApi.api_auth_token}`;
    fetch(api, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: UrlApi.username,
        password: UrlApi.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        resolve(json.token);
      });
  });
};

export const getArrayData = (api: string) => {
  getToken()
    .then((res) => res.json())
    .then((json) => {
      _getArrayData(json.token, api);
    });
};

export const getArrayDataPromise = <T,>(api: string): Promise<Array<T>> => {
  return new Promise<Array<T>>((resolve) => {
    getTokenString().then((token) => {
      fetch(`${UrlApi.api_http}${api}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          const value: T[] = json.data as T[];
          resolve(value);
        })
        .catch(() => {
          resolve([]);
        });
    });
  });
};

export const getRowData = <T,>(api: string): Promise<T> => {
  return new Promise<T>((resolve) => {
    getTokenString().then((token) => {
      fetch(`${UrlApi.api_http}${api}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          const value: T = json.data.google_drive as T;
          return resolve(value);
        })
        .catch(() => {
          // return resolve([]);
        });
    });
  });
};

/*#endregion các hàm publish */
