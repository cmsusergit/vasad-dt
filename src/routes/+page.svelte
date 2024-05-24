<script>
// @ts-nocheck
 
import db from '../lib/db'

import { onMount } from 'svelte';
let mesg="",error_mesg=""
let formDt=
{
    name:'',
    area:'',
    address:'',
    contact:'',
    isRented:"false",

    landLordName:'',
    isPermenantResident:"true",
    residentOriginal:''
}
onMount(() => {
	console.log("****")
})
const handleSubmit= async()=>{
           try{
            const record1 = await db.collection('Record').create(formDt);
            console.log(record1)

            mesg="Successfully Inserted"
        }catch(error1){
            console.log(error1)
            error_mesg=error1
        }
}
</script>
<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
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
	<form class="flex mt-2 border flex-col border-slate-700" on:submit={handleSubmit}>            
            <div class="p-2 w-full">
                <div class="flex px-2 gap-1 flex-col w-full">
                    <label for="name" class="text-lg font-bold">વિસ્તાર/Area</label>										
                    <input bind:value={formDt.area} type="text" id="name" class="p-1 border" required>
                </div>
                <div class="flex px-2 gap-1 flex-col w-full">
                    <label for="name" class="text-lg font-bold">નામ/Name</label>

                    <input bind:value={formDt.name} type="text" id="name" class="p-1 border" required>
                </div>
                <div class="flex px-2 gap-1 flex-col w-full">
                    <label for="addr" class="text-lg font-bold">સરનામું/Address</label>
                    <textarea bind:value={formDt.address} id="addr" class="p-1 border" required></textarea>
                </div>                    
                <div class="flex px-2 gap-1 flex-col w-full">
                    <label for="contact" class="text-lg font-bold">સંપર્ક નંબર/Contact</label>
                    <input bind:value={formDt.contact} type="text" id="contact" class="p-1 border" required>
                </div>  
                <div class="flex justify-center px-4 mx-2 my-2 border">
                    <div class="flex p-2 gap-1 flex-col w-full">
                        <label class="text-lg font-bold">મકાન ભાડે છે?/Is Staying On Rent?</label>
                        <div class="flex gap-2">
                            <input bind:group={formDt.isRented}  type="radio" id="onrent_y" name="onrent" class="p-1 border" value=true>
                            <label for="onrent_y" class="border-b w-full">હા/Yes</label>       
                        </div>
                        <div class="flex gap-2">
                            <input bind:group={formDt.isRented}  type="radio" id="onrent_n" name="onrent" class="p-1 border" value=false>
                            <label for="onrent_n" class="border-b w-full">ના/No</label>
                        </div>
                    </div>
                </div>
                
                {#if formDt.isRented=="true"}
                    <div class="flex gap-1 flex-col mb-2 w-full">
                            <div class="flex px-2 gap-1 flex-col w-full">
                                    <label for="orig_resident" class="text-lg font-bold">મકાનમાલિકનું નામ/Name of LandLord</label>
                                    <input bind:value={formDt.landLordName} type="text" id="orig_resident" class="p-1 border">
                            </div>
                    </div>
                {/if}
                <div class="flex justify-center px-4 mx-2 my-2 border">
                    <div class="flex p-2 gap-1 flex-col w-full">
                        <div class="flex p-2 gap-1 flex-col w-full">
                            <label class="text-lg font-bold">મૂળ વાસદ ના રહીશ છો?/Is Proper Vasad Resident?</label>
                            <div class="flex gap-2">
                                <input  bind:group={formDt.isPermenantResident} type="radio" id="onresident_y" name="onresident" class="p-1 border" value=true>
                                <label for="onresident_y" class="border-b w-full">હા/Yes</label>       
                            </div>
                            <div class="flex gap-2">
                                <input  bind:group={formDt.isPermenantResident} type="radio" id="onresident_n" name="onresident" class="p-1 border" value=false>
                                <label for="onresident_n" class="border-b w-full">ના/No</label>
                            </div>
                        </div>
                    </div>
                </div>
                {#if formDt.isPermenantResident=="false"}
								<div class="flex gap-1 flex-col mb-2 w-full">
										<div class="flex px-2 gap-1 flex-col w-full">
												<label for="orig_resident" class="text-lg font-bold">ના હોય તો કઈ ના મૂળ રહીશ છો?/Mention Original Resident</label>
												<input bind:value={formDt.residentOriginal} type="text" id="orig_resident" class="p-1 border">
										</div>
								</div>
                {/if}
            </div>
            <div class="flex justify-end p-2 mt-2 border">
                <button class="bg-blue-700 hover:bg-blue-800 p-2 w-48 text-white text-center rounded" type="submit">સબમિટ/SUBMIT</button>
            </div>

            <div>                
            </div>
        </form>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
