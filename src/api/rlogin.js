export default function login(data) {
  return fetch("", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => {
    res.json();
    console.log("login: ", res);
  });
}
