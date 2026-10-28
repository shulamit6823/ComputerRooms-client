
const RequestApi=async ()=>{
    const token=localStorage.getItem("token")
    console.log("TOKEN:", token);
    const response= await fetch("/api/requests",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    if(!response.ok) {
        throw new Error("אירעה שגיאה בטעינת הפניות");
    }
    console.log(response);
    
    return await response.json();
  
}
export default RequestApi