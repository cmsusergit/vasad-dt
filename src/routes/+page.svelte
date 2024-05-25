<script>
    // @ts-nocheck
    
    import db from '../lib/db'
    import Spinner from '../lib/spinner.svelte'
    import { onMount } from 'svelte';
        let recordList=[],loading=false
        let error_mesg
        onMount(async()=>{

            loading=true
            try{

                recordList= await db.collection('Record').getFullList({sort: '-created'}); 
            }
            catch(error1){
                error_mesg=error1
            }
            finally{
                loading=false
            }
        })
    </script>
    <svelte:head>
        <title>Add/Update</title>    
        <meta name="description" content="About this app" />
    </svelte:head>
    {#if loading}    
        <Spinner/>
    {/if}
    {#if error_mesg}
        <p class="text-xl text-white bg-orange-700 p-2 w-full rounded">
            {error_mesg}
        </p>
    {/if}
    <div class="text-column">
        <h1 class="text-2xl text-center">વાસદ</h1>									
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        <td class="px-4 py-2 text-right">
                            <a href={`/recordrelation?record_id=${record.id}`} class="font-medium text-green-700 dark:text-green-700 font-bold hover:underline">+Relation</a>
                        </td>
                        <td class="px-4 py-2 text-right">
                            <a href={`/record?id=${record.id}`} class="font-medium text-blue-600 dark:text-blue-500 font-bold hover:underline">Edit</a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    </div>
