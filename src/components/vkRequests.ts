import fetchJsonp from "fetch-jsonp";
export default async function makeRequest(
  groupID: string | number = 43215063,
  groupKey: string = import.meta.env.VITE_GROUP_KEY
) {
  console.log("groupKey " + groupKey);
  try {
    const res = await fetchJsonp(
      `https://api.vk.com/method/groups.getById?group_id=${groupID}&fields=members_count&v=5.131&access_token=${groupKey.replace(
        /['"]+/g,
        ""
      )}`,
      { timeout: 10000 }
    );
    if (!!res.ok) {
      const body = await res.json();
      console.log(body);
      return body;
    }
  } catch (err) {
    console.error(err);
    return {};
  }
}
