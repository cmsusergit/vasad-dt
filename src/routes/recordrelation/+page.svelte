<script>
    // @ts-nocheck
	
    import { goto } from '$app/navigation';
    export let data
    import { onMount } from 'svelte';
    let mesg="",error_mesg=""
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
    <div class="w-full border-t-2 border-b-2 border-slate-800 ">
        <div class="flex justify-between gap-2 items-center my-2 w-full">
            <h2 class="text-2xl text-slate-700 px-2 py-2.5 font-bold">Relative List For {data?.record?.name}</h2>
            <button on:click={()=>{goto(`/addrecordrelation?record_id=${data?.record?.id}`)}} type="button" class="w-1/4 px-5 py-2.5 text-lg font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 bg-slate-700 hover:bg-slate-500 disabled:bg-gray-400">
                Insert Relative
            </button>
        </div>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        {#if data?.recordList && data?.recordList.length <= 0}
            <h1 class="text-2xl text-orange-700 p-2 text-center">Record Not Found For {data?.record?.name}</h1>
        {:else}
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
                            Relation
                        </th>
                        <th scope="col" class="px-4 py-2">
                            contact
                        </th>
                        <th scope="col" class="px-4 py-2">
                            Is Aadharcard?
                        </th>
                        <th scope="col" class="px-4 py-2">
                            Is Rationcard?
                        </th>
                        <th scope="col" class="px-4 py-2">
                            Is NRI?
                        </th>
                        <th scope="col" class="px-4 py-2">                            
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {#each data?.recordList as record1,indx}
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {indx+1}
                            </th>
                            <td class="px-4 py-2">
                                {record1.name}
                            </td>
                            <td class="px-4 py-2">
                                {record1?.relation}
                            </td>
                            <td class="px-4 py-2">                        
                                {record1.contact}
                            </td>
                            <td class="px-4 py-2">
                                {record1.isAadharcard?'Y':'N'}
                            </td>                            
                            <td class="px-4 py-2">
                                {record1.isRationcard?'Y':'N'}
                            </td>
                            <td class="px-4 py-2">
                                {record1.isNRI?'Y':'N'}
                            </td>
                            <td class="flex gap-2 px-4 py-2 text-right">
                                <a href="/"  class="text-green-700 dark:text-green-500 font-bold hover:underline">Detail</a>
                                <a href={`/addrecordrelation?record_id=${data?.record?.id}&id=${record1.id}`} class="text-blue-700 dark:text-blue-500 font-bold hover:underline">Edit</a>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</section>



