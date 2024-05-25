export async function load({ params,url }) {
    const record_id = url.searchParams.get('id')

    return{record_id}
}


