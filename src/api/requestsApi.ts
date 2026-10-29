
const RequestApi=async ()=>{
    const token=localStorage.getItem("token")
    const response= await fetch("/api/requests",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    if(!response.ok) {
        throw new Error("אירעה שגיאה בטעינת הפניות");
    }
    return await response.json();
  
}
export default RequestApi