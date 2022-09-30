import fetchJsonp from "fetch-jsonp"

export default async function requestVk(
  groupID: string | number,
  groupKey: string
) {
  if (!groupKey) {
    groupKey = import.meta.env.VITE_GROUP_KEY
  }
  try {
    const res = await fetchJsonp(
      `https://api.vk.com/method/groups.getById?group_id=${groupID}&fields=members_count,description&v=5.131&access_token=${groupKey.replace(
        /['"]+/g,
        ""
      )}`,
      { timeout: 7000 }
    )
    if (!!res.ok) {
      try {
        const body = await res.json()
        return body
      } catch (err) {
        console.error(err)
      }
    } else console.log("Res isn't ok", res)
  } catch (err) {
    console.error(err)
    return null
  }
}
