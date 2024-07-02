<script>
    // @ts-nocheck
	import { goto } from '$app/navigation';
    import db from '$lib/db'    
    import Spinner from '$lib/spinner.svelte'
    import { onMount } from 'svelte';
    let mesg="",error_mesg=""
    export let data
    let relativeDt={isAadharcard:"true",isRationcard:"true",isNRI:"false"},loading=false
    let selfRelated=false,isEdit=false
    $:{
        if(selfRelated==true){

            relativeDt.name=data?.record?.name
            relativeDt.relation="SELF"
            relativeDt.contact=data?.record?.contact
        }
        // if(selfRelated==false){
        //     relativeDt.name=""
        //     relativeDt.relation=""
        //     relativeDt.contact=""
        // }
    }
    onMount(() => {
        if(data?.relativeRecord){
            isEdit=true
            relativeDt={...data?.relativeRecord}//....
            //....
            relativeDt.isAadharcard=`${relativeDt.isAadharcard}`
            relativeDt.isRationcard=`${relativeDt.isRationcard}`









            relativeDt.isNRI=`${relativeDt.isNRI}`
            const dt=new Date(relativeDt.dob)
            relativeDt.dob=dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()

            console.log(relativeDt.dob);
        }
        else{
            isEdit=false
            relativeDt.record=data?.record?.id
        }
    })
    const handleSubmit= async()=>{
        loading=true
        try{
            if(!isEdit){
                relativeDt.record=data?.record.id
                await db.collection('RelativeRecord').create(relativeDt)
            }
            else{
                console.log(relativeDt)
                await db.collection('RelativeRecord').update(relativeDt.id, relativeDt)
            }
            goto(`/recordrelation?record_id=${data?.record?.id}`)
        }catch(error1){
            console.log('++++',error1)            
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
<section>
    {#if mesg}
        <p class="text-xl text-white bg-green-700 p-2 w-full rounded">{mesg}</p>
    {/if}
    {#if error_mesg}
        <p class="text-xl text-white bg-orange-700 p-2 w-full rounded">
            {error_mesg}
        </p>
    {/if}    
    
    {#if loading}
        <Spinner/>
    {/if}
    <section class="bg-white dark:bg-gray-800 w-full">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-gray-100 dark:border-gray-500">
            <h4 class="text-xl font-semibold text-gray-800 dark:text-white">
                Insert Relative
            </h4>
            <button on:click={()=>{goto(`/recordrelation?record_id=${data?.record?.id}`)}} type="button" class="text-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-hide="default-modal">
                <svg fill="#000000" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 219.151 219.151" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575 C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575 c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"></path> <path d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008 c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825 c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628 c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"></path> </g> </g></svg>
                <span class="sr-only">Close</span>
            </button>
        </div>
        <div class="py-8 px-4 mx-auto w-full lg:py-12">
            <h2 class="mb-4 text-xl font-bold text-gray-800 dark:text-white">Add New Relative Record-{data?.record.name}</h2>
            <form on:submit|preventDefault={handleSubmit}>
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
                        <input bind:value={relativeDt.dob} on:blur={()=>{calculate_age(relativeDt.dob)}} type="date" name="dob" id="dob" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="સંપર્ક નંબર/Contact" required>
                    </div>                                            
                    <div class="sm:col-span-2">
                        <label for="relative_age" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">ઉંમર/Age</label>
                        <input bind:value={relativeDt.relative_age} type="number" name="relative_age" id="relative_age" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ઉંમર/Age" required>
                    </div>                                            
                    <div class="sm:col-span-2">
                        <label for="bgroup" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">રક્ત જૂથ/Blood Group</label>                        
                        <select bind:value={relativeDt.bloodGroup} name="bgroup" id="bgroup" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="સંપર્ક નંબર/Contact" required>
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
                        <label for="isNRI" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">વિદેશમાં રહો છો?(હા/ના)? /Is NRI?</label>
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
                </div>
            </form>
        </div>
    </section>     


    <!-- {JSON.stringify(data?.record)}
    <RecordRelative on:closeDlg={()=>{goto(`/recordrelation?record_id=${data?.record?.id}`)}} record={data?.record} relativeRecord={data?.relativeRecord}/> -->
</section>
