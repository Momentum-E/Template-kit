import React from 'react';

const action = () => {
  const actionItems = [
    {
      vehicleNo: 'ABC12378',
      severity: 'High',
      importance: 'H',
      description: 'Lorem ipsum dolor sit amet',
      bestPractice: 'Lorem ipsum dolor sit amet',
      actionToBeTaken:
        'charge',
      confirmButtonAction: 'Close',
      createdDate: '2024-05-27',
      closedDate: '2024-05-28',
      dueDate: '2024-06-10',
    },
    {
      vehicleNo: 'XYZ78967',
      severity: 'Medium',
      importance: 'M',
      description:
        'Sed do eiusmod tempor',
      bestPractice:
        'Sed do eiusmod tempor',
      actionToBeTaken:
        'change battery',
      confirmButtonAction: 'Close',
      createdDate: '2024-05-26',
      closedDate: '2024-05-28',
      dueDate: '2024-06-05',
    },
    {
      vehicleNo: 'DEF45656',
      severity: 'Low',
      importance: 'L',
      description:
        'Ut enim ad minim veniam',
      bestPractice:
        'Ut enim ad minim veniam',
      actionToBeTaken:
        'charge',
      confirmButtonAction: 'Close',
      createdDate: '2024-05-25',
      closedDate: '2024-05-28',
      dueDate: '2024-06-15',
    },
  ];

  return (
    <div className="container">
      {/* <h2 className="text-2xl font-bold mb-4">Action Center</h2> */}
      <table className="table-auto w-full">
        <thead className='bg-gray-100'>
          <tr>
            <th className="border px-2 py-2">Vehicle No</th>
            <th className="border px-2 py-2">Severity</th>
            {/* <th className="px-2 py-2">Importance</th> */}
            <th className="border px-2 py-2">Description</th>
            <th className="border px-2 py-2">Best Practice</th>
            <th className="border px-2 py-2">Action To be Taken</th>
            <th className="border px-2 py-2">Confirm</th>
            <th className="border px-2 py-2">Created Date</th>
            <th className="border px-2 py-2">Closed Date</th>
            <th className="border px-2 py-2">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {actionItems.map((actionItem, index) => (
            <tr key={index} className='text-sm'>
              <td className="border px-4 py-2">{actionItem.vehicleNo}</td>
              <td className="border px-4 py-2">{actionItem.severity}</td>
              {/* <td className="border px-4 py-2">{actionItem.importance}</td> */}
              <td className="border px-4 py-2">{actionItem.description}</td>
              <td className="border px-4 py-2">{actionItem.bestPractice}</td>
              <td className="border px-4 py-2">{actionItem.actionToBeTaken}</td>
              
              {/* <td className="border px-4 py-2">
                {actionItem.confirmButtonAction}
              </td> */}
              <td className="border flex justify-center items-center"><button className='bg-green-500 p-2 px-8 hover:bg-green-800'>Confirm Action Close</button></td>
              <td className="border px-4 py-2">{actionItem.createdDate}</td>
              <td className="border px-4 py-2">{actionItem.closedDate}</td>
              <td className="border px-4 py-2">{actionItem.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // <div className="container mx-auto px-4">
    //   <h2 className="text-2xl font-bold mb-4">Action Center</h2>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    //     {actionItems.map((actionItem, index) => (
    //       <div key={index} className="bg-white p-4 rounded-lg shadow-md">
    //         <p className="font-semibold">Vehicle No: {actionItem.vehicleNo}</p>
    //         <p>Severity: {actionItem.severity}</p>
    //         <p>Importance: {actionItem.importance}</p>
    //         <p>Description: {actionItem.description}</p>
    //         <p>Best Practice: {actionItem.bestPractice}</p>
    //         <p>Action To be Taken: {actionItem.actionToBeTaken}</p>
    //         <p>Confirm: {actionItem.confirmButtonAction}</p>
    //         <p>Created Date: {actionItem.createdDate}</p>
    //         <p>Closed Date: {actionItem.closedDate}</p>
    //         <p>Due Date: {actionItem.dueDate}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default action;
