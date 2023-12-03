import React, { useState } from 'react'
import { FaCheckSquare } from "react-icons/fa";
import { MdDelete, MdEdit } from 'react-icons/md';




const Tablerow = ({user,selectedRows,handleRowSelect,handleEditUser,handleDeleteSelected}) => {
    const [editable,setEditable] = useState(false)

  return (
    <tr key={user.id} className={selectedRows.includes(user.id) ? 'bg-gray-200' : ''}>
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  onChange={() => handleRowSelect(user.id)}
                  checked={selectedRows.includes(user.id)}
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  value={user.name}
                  className = {`outline-none p-1 ${editable && 'border '}`}
                  onChange={(e) => handleEditUser(user.id, 'name', e.target.value)}
                  readOnly={!editable}
                 
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  value={user.email}
                  className = {`outline-none p-1 ${editable && 'border '}`}
                  onChange={(e) => handleEditUser(user.id, 'email', e.target.value)}
                  readOnly={!editable}
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  value={user.role}
                  className = {`outline-none p-1 ${editable && 'border '}`}
                  onChange={(e) => handleEditUser(user.id, 'role', e.target.value)}
                  readOnly={!editable}
                />
              </td>
              
              <td className="px-4 py-3">
               { editable?(
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => setEditable(!editable)}
                >
                  <FaCheckSquare />
                </button>
               ):(
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => {
                    handleEditUser(user.id, 'email', user.email)
                    setEditable(!editable)
                  }}
                >
                  <MdEdit />
                </button>
               )
                
               }
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteSelected(user.id)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
  )
}

export default Tablerow