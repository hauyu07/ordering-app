export default function login(data) {
  return fetch("https://sdpdb-api.herokuapp.com/rsignin", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
