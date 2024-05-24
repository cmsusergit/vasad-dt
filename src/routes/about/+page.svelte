<script>
import { onMount } from 'svelte';

let recordList=["test1","test2"]
	onMount(async()=>{

	})
</script>
<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>
<div class="text-column"> <p>{JSON.stringify(recordList)}</p>
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
            {#each recordList as record}
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td class="px-4 py-2">
                        Silver
                    </td>
                    <td class="px-4 py-2">
                        Laptop
                    </td>
                    <td class="px-4 py-2">
                        $2999
                    </td>
                    <td class="px-4 py-2 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
</div>




