// import { nhanvienType } from "../model/nhanvienType";

import CommonStatus from "../administrator/compoments/common_props/CommonStatus";
import { ParameterApiType } from "../model/ParameterApiType";
import { ResponseApiType } from "../model/ResponseApiType";
import { ResponseFileUploadApiType } from "../model/ResponseFileUploadApiType";
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
  return fetch(`${UrlApi.getApiHttp()}${api}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

/*#region các hàm publish */

export const getToken = () => {
  // const api = `${UrlApi.api_http}${UrlApi.api_auth_token}`;
  const api = `${UrlApi.getApiHttp()}${UrlApi.api_auth_token}`;
  // console.log(api);
  return fetch(api, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // username: UrlApi.username,
      // password: UrlApi.password,
      username: UrlApi.getApiUsername(),
      password: UrlApi.getApiPassword(),
    }),
  });
};

export const getTokenString = (): Promise<string> => {
  // console.log(api);
  return new Promise<string>((resolve) => {
    const api = `${UrlApi.getApiHttp()}${UrlApi.api_auth_token}`;
    fetch(api, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // username: UrlApi.username,
        // password: UrlApi.password,
        username: UrlApi.getApiUsername(),
        password: UrlApi.getApiPassword(),
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

export const getArrayDataPromise = <T,>(
  api: string,
  parameter?: ParameterApiType[]
): Promise<Array<T>> => {
  return new Promise<Array<T>>((resolve) => {
    getTokenString().then((token) => {
      let parameterQuery = "";
      if (parameter) {
        parameterQuery = parameter
          .map((m) => {
            return `${m.name}=${m.value}`;
          })
          .join("&");
        parameterQuery = `?${parameterQuery}`;
      }
      console.log("parameterQuery " + parameterQuery);
      const url_api_get = `${UrlApi.getApiHttp()}${api}${parameterQuery}`;
      console.log("url_api_get " + url_api_get);
      fetch(url_api_get, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          let value: T[] = [];
          if (json.data.google_drive) {
            value = json.data.google_drive as T[];
          }
          resolve(value);
        })
        .catch(() => {
          resolve([]);
        });
    });
  });
};

export const getRowFromListData = <T,>(
  api: string,
  parameter?: ParameterApiType[]
): Promise<T> => {
  return new Promise<T>((resolve) => {
    getTokenString().then((token) => {
      let parameterQuery = "";
      if (parameter) {
        parameterQuery = parameter
          .map((m) => {
            return `${m.name}=${m.value}`;
          })
          .join("&");
        parameterQuery = `?${parameterQuery}`;
      }
      console.log("parameterQuery " + parameterQuery);
      const url_api_get = `${UrlApi.getApiHttp()}${api}${parameterQuery}`;
      console.log("url_api_get " + url_api_get);
      fetch(`${UrlApi.getApiHttp()}${api}${parameterQuery}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          const value: T[] = json.data.google_drive as T[];
          const row = value[0];
          return resolve(row);
        })
        .catch(() => {
          return resolve({} as T);
        });
    });
  });
};

export const getRowData = <T,>(
  api: string,
  parameter?: ParameterApiType[]
): Promise<T> => {
  return new Promise<T>((resolve) => {
    getTokenString().then((token) => {
      let parameterQuery = "";
      if (parameter) {
        parameterQuery = parameter
          .map((m) => {
            return `${m.name}=${m.value}`;
          })
          .join("&");
        parameterQuery = `?${parameterQuery}`;
      }
      // console.log("parameterQuery " + parameterQuery);
      const url_api_get = `${UrlApi.getApiHttp()}${api}${parameterQuery}`;
      console.log("url_api_get: " + url_api_get);
      fetch(url_api_get, {
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
          return resolve({} as T);
        });
    });
  });
};

export const postRowData = <T,>(
  api: string,
  data: T
): Promise<ResponseApiType> => {
  return new Promise<ResponseApiType>((resolve) => {
    getTokenString().then((token) => {
      const api_url_post = `${UrlApi.getApiHttp()}${api}`;
      fetch(api_url_post, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json; charset=UTF-8",
          //  "Content-Type": "application/x-www-form-urlencoded",
        },
        // Adding body or contents to send
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => {
          const value = json as ResponseApiType;
          return resolve(value);
        })
        .catch(() => {
          // return resolve([]);
        });
    });
  });
};

export const uploadSingleImage = (
  api: string,
  data: File
): Promise<ResponseFileUploadApiType> => {
  return new Promise<ResponseFileUploadApiType>((resolve) => {
    getTokenString().then((token) => {
      const api_url_post = `${UrlApi.getApiHttp()}${api}`;
      const formData = new FormData();
      formData.append("fileImage", data);
      console.log(formData);
      fetch(api_url_post, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          //Lưu ý không cần conten type vì tự hiểu trong form data
          // "Content-type": "multipart/form-data",
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((json) => {
          const value = json.data.google_drive
            .data as ResponseFileUploadApiType;
          return resolve(value);
        })
        .catch(() => {
          return resolve({});
        });
    });
  });
};

export const DeleteRowData = (
  api: string,
  id: string
): Promise<ResponseApiType> => {
  return new Promise<ResponseApiType>((resolve) => {
    getTokenString().then((token) => {
      // console.log(token);
      const api_url_post = `${UrlApi.getApiHttp()}${api}/${id}`;
      // console.log(api_url_post);
      fetch(api_url_post, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          // console.log(json);
          const value: ResponseApiType = json as ResponseApiType;
          return resolve(value);
        })
        .catch((error) => {
          const value: ResponseApiType = {
            status: CommonStatus.BAD,
            message: "Xóa không thành công",
            data: error,
          };
          return resolve(value);
        });
    });
  });
};

/*#endregion các hàm publish */
