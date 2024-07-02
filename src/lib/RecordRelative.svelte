<script>
// @ts-nocheck

	import { goto } from '$app/navigation';
    import db from '../lib/db'    
    import Spinner from '../lib/spinner.svelte'
    import { createEventDispatcher, onMount } from 'svelte';
    let mesg="",error_mesg=""
    let relativeDt={isAadharcard:"true",isRationcard:"true",isNRI:"false"},loading=false
    let selfRelated=false,isEdit=false
    export let record,relativeRecord
    const dispatch= createEventDispatcher()

    $:{
        if(selfRelated==true){
            relativeDt.name=record?.name
            relativeDt.relation="SELF"
            relativeDt.contact=record?.contact
        }
        // if(selfRelated==false){
        //     relativeDt.name=""
        //     relativeDt.relation=""
        //     relativeDt.contact=""
        // }
    }
    onMount(() => {
        if(relativeRecord){
            isEdit=true
            relativeDt={...relativeRecord}//....
            //....
        }
        else{
            isEdit=false
            relativeDt.record=record?.id
        }
    })
    const handleSubmit= async()=>{
        loading=true
        try{
            if(!isEdit){
                relativeDt.record=record.id                
                await db.collection('RelativeRecord').create(relativeDt)
            }
            else{
                await db.collection('RelativeRecord').update(relativeDt.id, relativeDt)
            }
            
        }catch(error1){
            console.log(error1)            
            error_mesg=error1
        }finally{
            loading=false
        }
    }
    const calculate_age=(dt_1)=>{        
        const dt=new Date(dt_1)
        console.log(dt,dt_1)
        let month_diff = Date.now() - dt.getTime()        
        let age_dt = new Date(month_diff)         
        let year = age_dt.getUTCFullYear()
        relativeDt.relative_age=Math.abs(year - 1970)  
    }
</script>
<svelte:head>
    <title>Home</title>
    <meta name="description" content="Vasad-Dt" />
</svelte:head>
{#if loading} 
    <Spinner/>  
{/if}
{#if mesg}
    <p class="text-xl text-white bg-green-700 p-2 w-full rounded">{mesg}</p>
{/if}
{#if error_mesg}
    <p class="text-xl text-white bg-orange-700 p-2 w-full rounded">
        {error_mesg}
    </p>
{/if}
<section class="bg-white dark:bg-gray-800 w-full">
    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-gray-100 dark:border-gray-500">
        <h4 class="text-xl font-semibold text-gray-800 dark:text-white">
            Relative Detail
        </h4>
        <button on:click={()=>{dispatch("closeDlg")}} type="button" class="text-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-hide="default-modal">
            <svg fill="#000000" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 219.151 219.151" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575 C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575 c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"></path> <path d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008 c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825 c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628 c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"></path> </g> </g></svg>
            <span class="sr-only">Close</span>
        </button>
    </div>
    <div class="py-8 px-4 mx-auto w-full lg:py-12">
        <h2 class="mb-4 text-xl font-bold text-gray-800 dark:text-white">Add New Relative Record-{record.name}</h2>        
    </div>
</section>     