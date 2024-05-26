import db from '../../lib/db'
// @ts-ignore

export async function load({ params,url }) {

    const record_id = url.searchParams.get('record_id')
    const record=await db.collection('Record').getOne(record_id)
    const recordrelation_id = url.searchParams.get('id')
    return{record,recordrelation_id}
}

