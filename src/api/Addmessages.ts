export const AddMessageTeacherApi=async(id:string,desc:string)=>{
     if (!desc.trim()) return;
    const token= localStorage.getItem("token");
    const response=await fetch(`/api/requests/${id}/messages`,
        {
            method:"POST",
            headers:{
                 "Content-Type":"application/json",
                  Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
                 description: desc
             })
        }
    ) 
     if(!response.ok)
            throw new Error("אירעה שגיאה בעידכון הודעה חדשה.")
}

export const AddMessageResponApi=async(id:string,desc:string)=>{
     if (!desc.trim()) return;
    const token= localStorage.getItem("token");
    const response=await fetch(`/api/requests/${id}/internal-notes`,
        {
            method:"POST",
            headers:{
                 "Content-Type":"application/json",
                  Authorization:`Bearer ${token}`
            },
             body:JSON.stringify({
                 description: desc
             })
        }
    ) 
     if(!response.ok)
            throw new Error("אירעה שגיאה בעידכון הודעה חדשה.")
}