import axios from "axios"


export const getUsers =async () => {
  const response = await import('../app/api/profile/users/route') 

  if(!response.ok){
    throw new Error('Failed to fetch')
  }

  return await (await response.GET()).json()
}