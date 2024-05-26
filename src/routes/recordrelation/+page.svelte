<script>
	import { goto } from '$app/navigation';

    // @ts-nocheck
    
    import RecordRelative from '../../lib/RecordRelative.svelte'
    export let data
    import { onMount } from 'svelte';
    let mesg="",error_mesg=""
    let isInsertRecord=false



    onMount(async() => {
        if(!data?.record?.id){
            alert("RecordId Required")
            goto('/')
        }
    })   
</script>
<svelte:head>
        <title>Home</title>
        <meta name="description" content="Vasad-Dt" />
</svelte:head>
<section>
    {#if mesg}
        <p class="text-xl text-white bg-green-700 p-2 w-full rounded">{mesg}</p>
    {/if}
    {#if error_mesg}
        <p class="text-xl text-white bg-orange-700 p-2 w-full rounded">
            {error_mesg}
        </p>
    {/if}    
    {#if isInsertRecord}
        <RecordRelative on:closeDlg={()=>{isInsertRecord=false}} record={data.record}/>
    {:else}
        <div class="w-full border-t-2 border-b-2 border-slate-800 ">
            <div class="flex justify-between gap-2 items-center my-2 w-full">
                <h2 class="text-2xl text-slate-700 px-2 py-2.5 font-bold">Relative List For {data?.record.name}</h2>
                <button on:click={()=>{isInsertRecord=true}} type="submit" class="w-1/4 px-5 py-2.5 text-lg font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400">
                    Insert RelativeRecord
                </button>
            </div>
        </div>
        <!-- <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full md:text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-4 py-2">
                            Sr.
                        </th>
                        <th scope="col" class="px-4 py-2">
                            Name
                        </th>
                        <th scope="col" class="px-4 py-2">
                            area
                        </th>
                        <th scope="col" class="px-4 py-2">
                            contact
                        </th>
                        <th scope="col" class="px-4 py-2">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {#each recordList as record,indx}
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {indx+1}
                            </th>
                            <td class="px-4 py-2">
                                {record.name}
                            </td>
                            <td class="px-4 py-2">
                                {record.area}
                            </td>
                            <td class="px-4 py-2">                        
                                {record.contact}
                            </td>
                            <td class="flex gap-2 px-4 py-2 text-right">
                                <a href={`/recordrelation?record_id=${record.id}`} class="text-green-700 dark:text-green-700 font-bold hover:underline">+Relation</a>
                                <a href={`/record?id=${record.id}`} class="text-blue-600 dark:text-blue-500 font-bold hover:underline">Edit</a>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div> -->

    {/if}
</section>



