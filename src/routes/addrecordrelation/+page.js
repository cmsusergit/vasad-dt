import db from '../../lib/db'
// @ts-ignore

export async function load({ params,url }) {
    const record_id = url.searchParams.get('record_id')
    if(record_id){
        try{
            const record=await db.collection('Record').getOne(record_id)
            const id = url.searchParams.get('id')               
            let relativeRecord
            if(id)
                relativeRecord=await db.collection('RelativeRecord').getOne(id)

            return{record,relativeRecord}
        }
        catch(error1){
            console.log(error1)
            return {}
        }        
    }
    return {}
}


