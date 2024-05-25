<script>
    // @ts-nocheck
    
    import db from '../../lib/db'    
    import Spinner from '../../lib/spinner.svelte'
    import { onMount } from 'svelte';
    let mesg="",error_mesg=""
    export let data
    let loading=false,is_edit=false




    let formDt={}
    onMount(async() => {
        if(data?.record_id){
            is_edit=true            
            let dt = await db.collection('Record').getOne(data?.record_id)
            //....
            formDt={...dt}//....
            formDt["isRented"]=""+formDt["isRented"]
            formDt["isPermenantResident"]=""+formDt["isPermenantResident"]
            console.log(dt);
        }else{
            is_edit=false
            formDt={
                name:'',
                area:'',
                address:'',
                contact:'',
                isRented:"false",    
                landLordName:'',
                isPermenantResident:"true",
                residentOriginal:''
            }
        }
    })
    const handleSubmit= async()=>{
            loading=true
            try{
                const record1 = await db.collection('Record').create(formDt);
                console.log(record1)    
                formDt.id=record1.id
                mesg="Successfully Inserted"
            }catch(error1){
                console.log(error1)
                error_mesg=error1
            }
            finally{
                loading=false
            }
    }
    </script>
    <svelte:head>
        <title>Home</title>
        <meta name="description" content="Svelte demo app" />
    </svelte:head>
    <section>        
        {#if loading}  <Spinner/>  {/if}
        {#if mesg}
            <p class="text-xl text-white bg-green-700 p-2 w-full rounded">{mesg}</p>
        {/if}
        {#if error_mesg}
            <p class="text-xl text-white bg-orange-700 p-2 w-full rounded">
                {error_mesg}
            </p>
        {/if}
        <section class="bg-white dark:bg-gray-800 w-full">
            <div class="py-8 px-4 mx-auto w-full lg:py-12">
                <h2 class="mb-4 text-xl font-bold text-gray-800 dark:text-white">Add New Record</h2>
                {#if formDt?.id}                    
                    <div class="w-full flex justify-end p-2">                        
                        <a href={`/recordrelation?record_id=${formDt.id}`} class="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-500">ADD RELATIVE</a>
                    </div>
                {/if}
                <form on:submit={handleSubmit}>
                    <div class="border my-4 w-full border-slate-800"></div>
                    <div class="w-full">
                        <div class="sm:col-span-2">
                            <label for="area" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">વિસ્તાર/Area</label>
                            <input bind:value={formDt.area} type="text" name="area" id="area" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="વિસ્તાર/Area" required>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="name" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">નામ/Name</label>
                            <input bind:value={formDt.name} type="text" name="name" id="name" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="નામ/Name" required>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="addr" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">સરનામું/Address</label>
                            <textarea bind:value={formDt.address} id="addr" rows="8" class="block p-2.5 w-full text-lg text-gray-800 bg-gray-50 rounded-lg border border-gray-400 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="સરનામું/Address" required></textarea>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="contact" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">સંપર્ક નંબર/Contact</label>
                            <input bind:value={formDt.contact} type="text" name="contact" id="contact" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="સંપર્ક નંબર/Contact" required>
                        </div>                        
                        <div class="border my-4 w-full border-slate-800"></div>
                        <div class="sm:col-span-2">
                            <label for="isrented" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">મકાન ભાડે છે?/Is Staying On Rent?</label>
                            <div class="flex gap-2">
                                <input bind:group={formDt.isRented}  type="radio" name="onrent_y" id="onrent_y" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value=true>
                                <label for="onrent_y" class="border-b w-full">હા/Yes</label>
                                <input bind:group={formDt.isRented}  type="radio" name="onrent_n" id="onrent_n" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value=false>
                                <label for="onrent_n" class="border-b w-full">ના/No</label>
                            </div>
                            {#if formDt.isRented=="true"}
                                <div class="sm:col-span-2">
                                    <label for="landlord" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">મકાનમાલિકનું નામ/Name of LandLord</label>
                                    <input bind:value={formDt.landLordName} type="text" name="landlord" id="landlord" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="મકાનમાલિકનું નામ/Name of LandLord">
                                </div>
                            {/if}
                        </div>   
                        <div class="border my-4 w-full border-slate-800"></div>
                        <div class="sm:col-span-2">
                            <label for="onresident" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">મૂળ વાસદ ના રહીશ છો?/Is Proper Vasad Resident?</label>
                            <div class="flex gap-2">
                                <input bind:group={formDt.isPermenantResident}  type="radio" name="onresident_y" id="onresident_y" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value=true>
                                <label for="onresident_y" class="border-b w-full">હા/Yes</label>
                                <input bind:group={formDt.isPermenantResident}  type="radio" name="onresident_n" id="onresident_n" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value=false>
                                <label for="onresident_n" class="border-b w-full">ના/No</label>
                            </div>
                        </div>     
                        {#if formDt.isPermenantResident=="false"}
                            <div class="sm:col-span-2">
                                <label for="orig_resident" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">ના હોય તો કઈ ના મૂળ રહીશ છો?</label>
                                <input bind:value={formDt.residentOriginal} type="text" name="orig_resident" id="orig_resident" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ના હોય તો કઈ ના મૂળ રહીશ છો?">
                            </div>
                        {/if}                    
                        <div class="border my-4 w-full border-slate-800"></div>
                    </div>
                    <button type="submit" class="w-full text-center px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400" disabled={loading}>
                        સબમિટ/SUBMIT
                    </button>
                </form>
            </div>
        </section>      
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
    
    
    
    
    
    
    
    
    
    
    





