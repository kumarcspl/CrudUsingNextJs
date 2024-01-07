import { useState, useEffect } from "react";
import { User, addUser, updateUser } from '../services/usersService';
import Snackbar from '../components/Snackbar';
import router, { useRouter } from "next/router";

const Add = () => {
  const [user, setUser] = useState({ id: '', fname: '', lname: '', addr: '', email: '', phno: '' });
  const [errors, setErrors] = useState({
    fname: '',
    lname: '',
    addr: '',
    email: '',
    phno: '',
  });
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const userString = router.query.user;

    if (userString) {
      const parsedUser: User = JSON.parse(userString as string);
      setUser(parsedUser);
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [router.query.user]);



  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'error'
  >('success'); 


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    // Validation logic
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    const newErrors = {
      fname: !user.fname.match(nameRegex) ? 'Invalid first name' : '',
      lname: !user.lname.match(nameRegex) ? 'Invalid last name' : '',
      addr: !user.addr.trim() ? 'Address cannot be empty' : '',
      email: !user.email.match(emailRegex) ? 'Invalid email address' : '',
      phno: !user.phno.match(phoneRegex) ? 'Invalid phone number (should be 10 digits)' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== '')) {
      console.log('Please fill out all fields correctly.');
      return;
    }


    console.log('Info :  into handle');
    try {
      let success = false;
      console.log('Info :  into handle' + isEdit);
      if (isEdit) {
        success = await updateUser(user);
      } else {
        success = await addUser(user);
      }

      if (success) {
        setUser({ id: '', fname: '', lname: '', addr: '', email: '', phno: '' });
        setSnackbarSeverity('success');
        setSnackbarMessage('User data saved successfully!');
        setOpenSnackbar(true);
      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage('Unable to store Data!!');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };





  return (
    <div className="px-6 py-2">
      <Snackbar
        isOpen={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
      {/* <h1 className="text-2xl font-bold mb-4">Add New Customer</h1> */}
      <form className="grid gap-3 md:grid-cols-2 md:gap-5" onSubmit={handleSubmit}>
        <div className="md:col-span-1">
          <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">First Name</label>
          <input
            value={user.fname}
            onChange={(e) => setUser({ ...user, fname: e.target.value })}
            type="text" id="firstName" name="firstName" className="w-full border-gray-300 rounded-md p-2 mb-2 text-white" />
             {errors.fname && <p className="text-red-500">{errors.fname}</p>}
        </div>
        <div className="md:col-span-1">
          <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">Last Name</label>
          <input
            value={user.lname}
            onChange={(e) => setUser({ ...user, lname: e.target.value })}
            type="text" id="lastName" name="lastName" className="w-full border-gray-300 rounded-md p-2 mb-2 text-white" />
             {errors.lname && <p className="text-red-500">{errors.lname}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
          <textarea
            value={user.addr}
            onChange={(e) => setUser({ ...user, addr: e.target.value })}
            id="address" name="address" rows={3} className="w-full border-gray-300 rounded-md p-2 mb-2 text-white"></textarea>
             {errors.addr && <p className="text-red-500">{errors.addr}</p>}
        </div>
        <div className="md:col-span-1">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email" id="email" name="email" className="w-full border-gray-300 rounded-md p-2 mb-2 text-white" />
             {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="md:col-span-1">
          <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone</label>
          <input
            value={user.phno}
            onChange={(e) => setUser({ ...user, phno: e.target.value })}
            type="number" id="phone" name="phone" className="w-full border-gray-300 rounded-md p-2 mb-2 text-white" />
             {errors.phno && <p className="text-red-500">{errors.phno}</p>}
        </div>
        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="w-6/12 px-5 py-2 text-white bg-black rounded-full cursor-pointer bg-gradient-to-r from-green to-blue-500 hover:scale-105 focus:outline-none"
          >SAVE
          </button>
        </div>

      </form>
    </div>



  );
};

export default Add;
