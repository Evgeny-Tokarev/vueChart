import fetchJsonp from "fetch-jsonp";
// export async function makeRequest(url: string, jsonpCallback = 'callback') {
//   const res = await fetchJsonp(url, { jsonpCallback })
//   if (res.ok) {
//     const body = await res.json()
//     if (body.code === 0) {
//       return body
//     }
//   }
//   console.error('jsonp error')
// }
export default async function makeRequest(
  groupID: string | number = 43215063,
  groupKey: string = import.meta.env.VITE_GROUP_KEY
) {
  const res = await fetchJsonp(
    `https://api.vk.com/method/groups.getMembers?group_id=${groupID}&v=5.131&access_token=${groupKey.replace(
      /['"]+/g,
      ""
    )}`,
    { jsonpCallbackFunction: "jsonpCallback" }
  );
  if (res.ok) {
    const body = await res.json();
    if (body.code === 0) {
      return body;
    }
  }
  console.error("jsonp error");
  function jsonpCallback(data: any): void {
    console.log(data);
  }
}
