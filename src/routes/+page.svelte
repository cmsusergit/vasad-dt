<script>
    // @ts-nocheck
    
    import db from '../lib/db'
    import Spinner from '../lib/spinner.svelte'
    import { onMount } from 'svelte';
        let recordList=[],loading=false
        let error_mesg,searchText
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
        const handleInput=async()=>{
            recordList= await db.collection('Record').getFullList({filter:`name?~"%${searchText}%" `,sort: '-created'}); 
        }
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
            <div class="w-full flex justify-end p-2">   

                <form on:submit|preventDefault={handleInput} class="flex items-center p-2 w-full">
                    <label for="name" class="mr-2 text-lg font-medium text-gray-800 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
                            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                            </svg>
                    </label>
                    <input bind:value={searchText} type="text" name="name" id="name" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="નામ/Name">
                </form>                     
                <a href={`/record`} class="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-500">ADD RECORD</a>
            </div>
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
                                <a href={`/recordrelation?record_id=${record.id}`} class="text-green-700 dark:text-green-700 font-bold hover:underline">Relative List</a>
                                <a href={`/record?id=${record.id}`} class="text-blue-600 dark:text-blue-500 font-bold hover:underline">Edit</a>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
