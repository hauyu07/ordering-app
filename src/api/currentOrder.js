export default async function currentOrder() {
  return await (
    await fetch("https://sdpdb-api.herokuapp.com/currentorderpage")
  ).json();
}
