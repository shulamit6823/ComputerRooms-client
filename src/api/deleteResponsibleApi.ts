


const deleteResponsibleApi= async(id:number)=>{
    const token=localStorage.getItem("token");

    const response =await fetch(`/api/manager/responsibles/${id}`,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    if(!response.ok)
        throw new Error("Failed to delete responsible");
}
export default deleteResponsibleApi