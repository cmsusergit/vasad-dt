<script>
    // @ts-nocheck
    
    import db from '$lib/db'
    import Spinner from '$lib/spinner.svelte'
    import { onMount } from 'svelte';
        let recordList=[],loading=false
        let error_mesg
        onMount(async()=>{
            loading=true
            try{
                recordList= await db.collection('Record').getFullList({sort: '-created',expand:'RelativeRecord_via_record'}); 

            }
            catch(error1){
                error_mesg=error1
            }
            finally{
                loading=false
            }
        })
    const exportExcel=()=>{
        const el = document.getElementById('tbl1');
        const wb = XLSX.utils.table_to_book(el, { sheet: "sheet1" });        
        XLSX.writeFile(wb, 'list.xlsx');
    }
</script>
<svelte:head>
    <title>RecordReport</title>    
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
<div>
    <div class="flex justify-end w-full p-2">
        <button on:click={exportExcel} class="bg-slate-800 text-white px-4 py-2 hover:bg-slate-700 rounded">Export Excel</button>
    </div>
    <table class="w-full md:text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400" id="tbl1">
        <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center border">
            <tr>
                <th scope="col" class="bg-slate-500 text-white px-4 py-2 border">
                    Sr.
                </th>
                <th scope="col" class="bg-slate-500 text-white px-4 py-2 border">
                    Area
                </th>
                <th scope="col" class="bg-slate-500 text-white px-4 py-2 border">
                    Name
                </th>
                <th scope="col" class="bg-slate-500 text-white px-4 py-2 border">
                    Relation
                </th>
                <th scope="col" class="bg-slate-500 text-white px-4 py-2 border">
                    contact
                </th>
                <th scope="col" class="bg-slate-500 text-white px-4 py-2 border">
                    Age
                </th>
                <th scope="col" class="bg-slate-500 text-white px-4 py-2 border">
                    Is Rented?
                </th>
                <th scope="col" class="bg-slate-500 text-white px-4 py-2 border">
                    Is Permenant?
                </th>
                <th scope="col" class="bg-slate-500 text-white px-4 py-2 border">
                    Is Aadharcard?
                </th>
                <th scope="col" class="bg-slate-500 text-white px-4 py-2 border">
                    Is Rationcard?
                </th>
            </tr>
        </thead>
        <tbody>
            {#each recordList as record1,indx}
                <tr class="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center border">
                    <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                        {indx+1}
                    </th>
                    <td class="bg-white px-4 py-2 text-center border" rowspan={record1?.expand?.RelativeRecord_via_record.length+1}>
                        {record1.area}
                    </td>
                    <td class="px-4 py-2 text-center border">
                        {record1.name}
                    </td>
                    <td class="px-4 py-2 text-center border">                        
                    </td>
                    <td class="px-4 py-2 text-center border">                        
                        {record1.contact}
                    </td>
                    <td class="px-4 py-2 text-center border"></td>
                    <td class="px-4 py-2 text-center border">
                        {record1.isRented?'Y':'N'}
                    </td>                            
                    <td class="px-4 py-2 text-center border">
                        {record1.isPermenantResident?'Y':'N'}
                    </td>
                    <td class="px-4 py-2 text-center border"></td>
                    <td class="px-4 py-2 text-center border"></td>
                </tr>
                {#if record1?.expand}
                    {#each record1?.expand?.RelativeRecord_via_record as rr,indx1}
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-center border">
                            <td class="px-4 py-2 text-center border">{indx+1}.{indx1+1}</td>

                            <td class="px-4 py-2 text-center border">{rr.name}</td>
                            <td class="px-4 py-2 text-center border">{rr.relation}</td>
                            <td class="px-4 py-2 text-center border">{rr.contact}</td>
                            <td class="px-4 py-2 text-center border">
                                {rr.relative_age}
                            </td>
                            <td class="px-4 py-2 text-center border"></td>
                            <td class="px-4 py-2 text-center border"></td>
                            <td class="px-4 py-2 text-center border">
                                {rr.isAadharcard?'Y':'N'}
                            </td>
                            <td class="px-4 py-2 text-center border">
                                {rr.isRationcard?'Y':'N'}
                            </td>
                        </tr>                        
                    {/each}
                {/if}
            {/each}
        </tbody>
    </table>
</div>
