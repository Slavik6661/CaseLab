 
export async function getUsersData(){
    try{
        const response=await fetch("https://jsonplaceholder.typicode.com/users/")
        if(!response.ok){
            throw new Error ('error response')
        }  
        return  response.json()
    }
    catch(error){
        console.error('An error occurred:', error);
    }
}

export async function getUserTodos(userID){
    try{
        const response=await fetch(`https://jsonplaceholder.typicode.com/users/${userID}/todos`)
        if(!response.ok){
            throw new Error ('error response')
        }  
        return  response.json()
    }
    catch(error){
        console.error('An error occurred:', error);
    }
}