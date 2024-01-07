
export interface User {
    id: string;
    fname: string;
    lname: string;
    addr: string;
    email: string;
    phno: string;
  }
  
export const addUser = async ({ fname,lname,addr, email,phno }:{ fname: string;lname:string,addr:string, email: string,phno:string }) => {
    console.log(process.env);
    console.log(process.env.BACKENDURL);
    const response = await fetch('http://localhost:5001/prictest/us-central1/api/users', {//${process.env.REACT_APP_BACKEND_URL}
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fname,lname,addr, email,phno }),
    });
  
    if (!response.ok) {
        return false;
      //throw new Error('Failed to add user');
    }else{
        return true;
    }
  };

export const fetchUsers = async (): Promise<User[]> => {
    try {
      const response = await fetch('http://localhost:5001/prictest/us-central1/api/users');
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };


  export const deleteUser = async (userId: string): Promise<boolean> => {
    try {
      // Make a DELETE request to your API endpoint passing the userId
      const response = await fetch(`http://localhost:5001/prictest/us-central1/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        return true;
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      return false; 
    }
  };

  export const updateUser = async ({id, fname,lname,addr, email,phno }:{id:string, fname: string;lname:string,addr:string, email: string,phno:string }) => {
    console.log(process.env);
    console.log(process.env.BACKENDURL);
    const response = await fetch(`http://localhost:5001/prictest/us-central1/api/users/${id}`, {//${process.env.REACT_APP_BACKEND_URL}
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fname,lname,addr, email,phno }),
    });
  
    if (!response.ok) {
        return false;
    }else{
        return true;
    }
  };
  