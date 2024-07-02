// @ts-ignore
import db from '$lib/db'

export async function load({ params,url }) {
    const record_id = url.searchParams.get('record_id')
    if(record_id){
        try{
            const record=await db.collection('Record').getOne(`${record_id}`)
            const recordList=await db.collection('RelativeRecord').getFullList({filter:`record="${record_id}" `})
            return{record,recordList}
        }catch(error1){

            console.log(error1);
            return {record:{},recordList:[]}
        }    
    }
    return {}
}






