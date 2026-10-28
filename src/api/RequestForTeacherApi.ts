
const Request_teacherApi=async ()=>{
    const token=localStorage.getItem("token")
    const response= await fetch("/api/requests/mine",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    if(!response.ok) {
        throw new Error(`אירעה שגיאה בטעינת הפניות של מורה`);
    }
    return await response.json();
  
}
export default Request_teacherApi