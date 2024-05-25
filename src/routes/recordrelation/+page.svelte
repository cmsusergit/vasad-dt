<script>
	import { goto } from '$app/navigation';

    // @ts-nocheck
    
    import RecordRelative from '../../lib/RecordRelative.svelte'
    export let data
    import { onMount } from 'svelte';
    let mesg="",error_mesg=""
    onMount(() => {
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
    <RecordRelative record={data.record}/>
</section>



