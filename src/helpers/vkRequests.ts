import fetchJsonp from "fetch-jsonp"

export default async function requestVk(
  groupID: string | number,
  groupKey: string
) {
  if (!groupKey) {
    console.log(import.meta.env.VITE_GROUP_KEY )
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
    console.log(res)
    if (!!res.ok) {
      try {
        const body = await res.json()
        console.log(body)
        return body
      } catch (err) {
        console.error(err)
      }
    } else {
    }
  } catch (err) {
    console.error(err)
    return null
  }
}
