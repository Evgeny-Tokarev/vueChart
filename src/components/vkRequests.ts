import fetchJsonp from "fetch-jsonp";
export default async function makeRequest(
  groupID: string | number = "exclusive_muzic",
  groupKey: string
) {
  try {
    const res = await fetchJsonp(
      `https://api.vk.com/method/groups.getById?group_id=${groupID}&fields=members_count,description&v=5.131&access_token=${groupKey.replace(
        /['"]+/g,
        ""
      )}`,
      { timeout: 10000 }
    );
    if (!!res.ok) {
      const body = await res.json();
      return body;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}
