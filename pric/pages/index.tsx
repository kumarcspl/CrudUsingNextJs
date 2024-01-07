import {
  NextPage,
} from "next";
import { useState, useEffect } from "react";
import { User, deleteUser, fetchUsers } from "@/services/usersService";
import { Column, useTable } from "react-table";
import React from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import router, { useRouter } from 'next/router';

const About: NextPage = () => {

  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };

    getUsers();
  }, []);

  const handleEdit = (user: User) => {

    router.push({
      pathname: '/add',
      query:  { user: JSON.stringify(user) }, 
    });

    console.log(`Edit user with ID:`);
  };

  const handleDelete = async (userId: string) => {
    try {
      console.log(`Delete user with ID: ${userId}`);
  
      const deleted = await deleteUser(userId);
  
      if (deleted) {
        // Filter out the deleted user from the table rows
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        console.log(`User with ID ${userId} deleted successfully.`);
      } else {
        console.log(`Failed to delete user with ID: ${userId}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  const columns = React.useMemo(
    () => [
      { Header: 'First Name', accessor: 'fname' },
      { Header: 'Last Name', accessor: 'lname' },
      { Header: 'Address', accessor: 'addr' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Phone No.', accessor: 'phno' },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (row: any) => (
          <div className="flex  items-center">


            <button
              onClick={() => handleEdit(row.row.original)}
              className="border border-gray-300 hover:bg-gray-100 text-gray-500 font-bold py-2 px-3 rounded transition duration-300 ease-in-out mr-2"
            >
              <FaEdit size={15} className="text-gray-500" /> {/* Add border and color */}
            </button>
            <button
              onClick={() => handleDelete(row.row.original.id)}
              className="border border-gray-300 hover:bg-gray-100 text-gray-500 font-bold py-2 px-3 rounded transition duration-300 ease-in-out"
            >
              <FaTrash size={15} className="text-gray-500" /> {/* Add border and color */}
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: users }); 



  return (
    <div className="px-6 py-2 overflow-x-auto">
      <table {...getTableProps()} className="w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="bg-gray-200 text-gray-600 uppercase text-xs font-semibold"
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="py-3 px-4 text-left">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={row.index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="py-2 px-4">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

  );
};



export default About;
