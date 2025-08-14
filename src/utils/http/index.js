import Fly from "flyio/dist/npm/wx"
import toast from "../toast";
import storage from "../storage";

const fly = new Fly()

fly.config.baseURL = "https://www.wanandroid.com"
fly.interceptors.request.use(request => {
  console.log("Request--->", request.url);
  console.log(request);
  const cookie = storage.getSync("cookie")
  console.log("请求cookie -->", cookie);
  if (cookie) {
    request.headers["Cookie"] = cookie[0];
  }
  return request;
})

fly.interceptors.response.use(response => {
  console.log("Response--->", response.request.url);
  console.log(response);
  if (response.status !== 200) {
    return Promise.reject(new Error(`请求失败: ${response.status}`));
  }

  if (response.request.url === "user/login") {
    const cookie = response.headers["set-cookie"];
    console.log("返回cookie-->", cookie[0]);
    if (cookie) {
      storage.save("cookie", cookie);
    }
  }

  if (response.data.errorCode ===0) {
    if (response.data.data == null) {
      return true
    }
    return response.data.data;
  } else {
    return null;
  }
}, (error) => {
  handleError(error);
  return Promise.reject(error);
})

export function flyGet (url, params = {}) {
  toast.loading()
  return fly.get(url, params).then((res) => {
    toast.hideLoading()
    return res
  }).catch((err) => {
    toast.hideLoading()
    throw err;
  })
}

export function flyPost(url, params = {}, isFormData = false) {
  toast.loading()
  return fly.post({
    method: "post",
    url,
    params,
    headers: isFormData ? {
      "Content-Type": "application/x-www-form-urlencoded",
    } : {"Content-Type": "application/json", }}
  ).then((res) => {
    toast.hideLoading()
    return res
  }).catch((err) => {
    toast.hideLoading()
    throw err;
  })
}

function handleError(err) {
  if (err.response) {
    console.log("请求失败---->", err.response)
  } else {
    console.log("请求失败---->", err.message)
  }
}
