import { endpoint, query } from "../utils/Constants";

export const getProducts = async (variables) => {
    const { results, pagination } = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            query,
            variables
        })
    })
    .then( res => res.json())
    .then( data => data.data.fetchProducts)

    return {results, pagination}
}