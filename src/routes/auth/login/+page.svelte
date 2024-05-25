<script>
	import { goto } from '$app/navigation';

// @ts-nocheck
    import db from '../../../lib/db'    
    import Spinner from '../../../lib/spinner.svelte'
    let error_mesg,authDt
    let loading=false,user={email:'',password:''}
    const handleSubmit= async()=>{
        loading=true
        try {
            authDt = await db.collection('users').authWithPassword(user.email,user.password)

            goto("/")
            error_mesg=''
        } catch (error) {
            console.log(error);
            error_mesg=error.message+" User Email or Password Incorrect"
        }finally{
            loading=false
        }
    }
</script>
<svelte:head>
        <title>Login</title>
</svelte:head>
<section>
    {#if error_mesg}
        <p class="text-xl text-white bg-orange-700 p-2 w-full rounded">
            {error_mesg}
        </p>
    {/if} 
    {#if loading}  
        <Spinner/>  
    {/if}
    <section class="bg-white dark:bg-gray-800 w-full">
        <div class="py-8 px-4 mx-auto w-full lg:py-12">
            <h2 class="mb-4 text-xl font-bold text-gray-800 dark:text-white">Login</h2>
            <form on:submit={handleSubmit}>
                <div class="border my-4 w-full border-slate-800"></div>
                <div class="w-full">
                    <div class="sm:col-span-2">
                        <label for="email" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">Email</label>
                        <input bind:value={user.email} type="email" name="email" id="email" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Email" required>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="password" class="block my-2 text-lg font-medium text-gray-800 dark:text-white">Password</label>
                        <input bind:value={user.password} type="password" name="password" id="password" class="bg-gray-50 border border-gray-400 text-gray-800 text-lg rounded-lg focus:rind-primary-700 focus:border-primary-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Password" required>
                    </div>
                </div>
                <div class="border my-4 w-full border-slate-800"></div>
                <button type="submit" class="w-full text-center px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400" disabled={loading}>
                    Login
                </button>   
            </form>
        </div>
    </section>
</section>