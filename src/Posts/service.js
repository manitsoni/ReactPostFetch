export const getPosts = async(pageNo) => {
    return await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNo}`)
}