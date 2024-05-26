<script>
// @ts-nocheck

	import { goto } from '$app/navigation';
    import db from '../lib/db'    
    import Spinner from '../lib/spinner.svelte'
    import { createEventDispatcher, onMount } from 'svelte';
    let mesg="",error_mesg=""
    let relativeDt={isAadharcard:"true",isRationcard:"true",isNRI:"false"},loading=false
    let selfRelated=false
    export let record
    const dispatch= createEventDispatcher()

    $:{
        if(selfRelated==true){
            relativeDt.record_id=record.id
            relativeDt.name=record.name
            relativeDt.relation="SELF"
            relativeDt.contact=record.contact
        }
        if(selfRelated==false){
            relativeDt.name=""
            relativeDt.relation=""
            relativeDt.contact=""
        }
    }
    onMount(() => {
        console.log("****")
    })
    const handleSubmit= async()=>{
        loading=true
        try{
            relativeDt.record_id=record.id
            await db.collection('RelativeRecord').create(relativeDt)
            goto('/')
        }catch(error1){
            console.log(error1)
        }finally{
            loading=false
        }
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
            Insert Relative
        </h4>
        <button on:click={()=>{dispatch("closeDlg")}} type="button" class="text-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-hide="default-modal">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close</span>
        </button>
    </div>
    <div class="py-8 px-4 mx-auto w-full lg:py-12">
        <h2 class="mb-4 text-xl font-bold text-gray-800 dark:text-white">Add New Relative Record-{record.name}</h2>
        <form on:submit={handleSubmit}>
            <div class="border my-4 w-full border-slate-800"></div>
            <div class="w-full">
                <div class="sm:col-span-2">
                    <label for="name" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">નામ/Name</label>
                    <input bind:value={relativeDt.name} type="text" name="name" id="name" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="નામ/Name" required>
                </div>
                <div class="sm:col-span-2">
                    <label for="self_relation" class="my-2 text-lg font-medium text-gray-800 dark:text-white flex gap-2 items-center">                            
                        <input bind:checked={selfRelated} id="self_relation" type="checkbox" class="w-5 h-5">
                        <span>પોતે/SELF</span>
                    </label>
                    <label for="relation" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">સંબંધ/Relation</label>
                    <input bind:value={relativeDt.relation} type="text" name="relation" id="relation" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:bg-gray-500" placeholder="સંબંધ/Relation" disabled={selfRelated} >
                </div>
                <div class="sm:col-span-2">
                    <label for="dob" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">જન્મતારીખ/Birth Date</label>
                    <input bind:value={relativeDt.dob} type="date" name="dob" id="dob" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="સંપર્ક નંબર/Contact" required>
                </div>                                            
                <div class="sm:col-span-2">
                    <label for="bgroup" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">રક્ત જૂથ/Blood Group</label>                        
                    <select bind:value={relativeDt.bloodgroup} name="bgroup" id="bgroup" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="સંપર્ક નંબર/Contact" required>
                        <option>A+</option>
                        <option>B+</option>  
                    </select>
                </div> 
                <div class="sm:col-span-2">
                    <label for="contact" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">સંપર્ક નંબર/Contact</label>
                    <input bind:value={relativeDt.contact} type="text" name="contact" id="contact" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="સંપર્ક નંબર/Contact" required>
                </div>                      
                <div class="sm:col-span-2">
                    <label for="education" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">શિક્ષણ/Education</label>
                    <input bind:value={relativeDt.education} type="text" name="education" id="education" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="શિક્ષણ/Education" required>
                </div>                                         
                <div class="sm:col-span-2">
                    <label for="educationOrganization" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">જો અભ્યાસ કરતા હોય તો શાળાનું નામ/School Name</label>
                    <input bind:value={relativeDt.educationOrganization} type="text" name="educationOrganization" id="educationOrganization" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="જો અભ્યાસ કરતા હોય તો શાળાનું નામ/School Name" required>
                </div>                     
                <div class="sm:col-span-2">
                    <label for="present_occupation" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">વર્તમાન વ્યવસાય/Present Occupation</label>
                    <input bind:value={relativeDt.present_occupation} type="text" name="present_occupation" id="present_occupation" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="વર્તમાન વ્યવસાય/Present Occupation" required>
                </div>   
                <div class="border my-4 w-full border-slate-800"></div>
                <div class="sm:col-span-2">
                    <label for="isAadharcard" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">આધાર કાર્ડ(હા/ના)? /Is Aadharcard?</label>
                    <div class="flex gap-2">
                        <input bind:group={relativeDt.isAadharcard}  type="radio" name="isAadharcard_y" id="isAadharcard_y" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value=true>
                        <label for="isAadharcard_y" class="border-b w-full">હા/Yes</label>
                        <input bind:group={relativeDt.isAadharcard}  type="radio" name="isAadharcard_n" id="isAadharcard_n" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value=false>
                        <label for="isAadharcard_n" class="border-b w-full">ના/No</label>
                    
                    </div>
                </div>
                <div class="border my-4 w-full border-slate-800"></div>
                <div class="sm:col-span-2">
                    <label for="isRationcard" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">રેશન કાર્ડ(હા/ના)? /Is Ration card?</label>
                    <div class="flex gap-2">
                        <input bind:group={relativeDt.isRationcard}  type="radio" name="isRationcard_y" id="isRationcard_y" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value=true>
                        <label for="isRationcard_y" class="border-b w-full">હા/Yes</label>
                        <input bind:group={relativeDt.isRationcard}  type="radio" name="isRationcard_n" id="isRationcard_n" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value=false>
                        <label for="isRationcard_n" class="border-b w-full">ના/No</label>
                    </div>
                </div>
                <div class="border my-4 w-full border-slate-800"></div>
                <div class="sm:col-span-2">
                    <label for="isNRI" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">ન.રા.ઈ.(હા/ના)? /Is NRI?</label>
                    <div class="flex gap-2">
                        <input bind:group={relativeDt.isNRI}  type="radio" name="isNRI_y" id="isNRI_y" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value=true>
                        <label for="isNRI_y" class="border-b w-full">હા/Yes</label>
                        <input bind:group={relativeDt.isNRI}  type="radio" name="isNRI_n" id="isNRI_n" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value=false>
                        <label for="isNRI_n" class="border-b w-full">ના/No</label>
                    </div>
                </div>
                {#if relativeDt.isNRI=="true"}
                <div class="sm:col-span-2">
                    <label for="countryNRI" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">દેશનું નામ/Country Name</label>
                    <input bind:value={relativeDt.countryNRI} type="text" name="countryNRI" id="countryNRI" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="વર્તમાન વ્યવસાય/Present Occupation" required={relativeDt?.isNRI}>
                </div>   
                {/if}
                <div class="border my-4 w-full border-slate-800"></div>
            </div>
            <div class="flex flex-col md:gap-2 md:flex-row">
                <button type="submit" class="w-full px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400" disabled={loading}>
                    સબમિટ/SUBMIT
                </button>
                
                
                <button on:click={()=>{dispatch("closeDlg")}} type="button" class="w-full px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 bg-orange-500 hover:bg-orange-700 disabled:bg-gray-400" disabled={loading}>
                    Close
                </button>
            </div>
        </form>
    </div>
</section>     