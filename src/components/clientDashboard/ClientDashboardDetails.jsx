import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import axios from 'axios';

const ClientDashboardDetails = () => {
    const navigate = useNavigate();
    const [clientDetails, setClientDetails] = useState([]);
    const [displayHeaders, setDisplayHeaders] = useState([]);
    const [dataColumns, SetDateColumns] = useState([]);
    const [action,SetAction] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const headerClass = "px-2 py-1 text-center text-xs text-gray-500 font-sans";
    const cellClass = "px-1 py-1 text-center whitespace-normal break-words text-xs text-gray-800";

    const getClientDetails = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:1199/api/getclientdetails');
            if (response.data.status) {
                setClientDetails(response.data.data[0]);
                const headers = response.data.header[0].DISPLAY_HEADERS;
                const datacol = response.data.header[0].DISPLAY_COLUMN;
                const action = response.data.header[0].ACTIONS;
                console.log(headers);
                console.log(datacol);
                setDisplayHeaders(headers.split(','));
                SetDateColumns(datacol.split(','));
                SetAction(action.split(','));
            } else {
                setErrorMessage(response.data.error);
            }
        } catch (error) {
            console.error('Error fetching client details:', error);
            setErrorMessage('An error occurred while fetching client details.');
        }
    };

    useEffect(() => {
        getClientDetails();
    }, []);

  

    const searchClientDetails = async (searchValue) => {
      try {
          const response = await axios.get('http://127.0.0.1:1199/api/searchclientdetails', {
              params: { search: searchValue },
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
          if (response.data.status) {
              setClientDetails(response.data.data[0]);
          } else {
              setErrorMessage(response.data.error);
          }
      } catch (error) {
          console.error('Error fetching client details:', error);
          setErrorMessage('An error occurred while fetching client details.');
      }
  };

      function searchOnChange(event) {
        let inputFieldValue = event.target.value;
        setSearchInput(inputFieldValue);
        const delayInMilliseconds = 1000;
        setTimeout(() => {
          searchClientDetails(inputFieldValue);
        }, delayInMilliseconds);
      }
  

      function moreDetails(client) {
        navigate('/moreDetails', { state: { clientId: client } });
      }
      
  

    return (
        <div style={{ height: 'calc(100vh - 80px)'}} className='px-5 flex justify-center items-center' >
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            <div className="flex justify-between items-center">
            <div className='flex justify-between items-center flex-row w-2/6'>
              <label htmlFor="bank" className="mr-4">Search</label>
              <input type="text" id="searchVal" name="bank" placeholder="ID,Client ID,Bank Name,Country,SPOC...." value={searchInput}
               className="border w-full px-2 py-1 mr-4 rounded-full text-sm transition duration-300 focus:border-green-500" onChange={searchOnChange}></input>
            </div>
            <div>
                BACK
            </div>
            </div>
            {/* Table layout for client details */}
            <div className="flex flex-col mt-2">
                <div className="mx-4 overflow-x-auto mt-4">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-y-auto" style={{ height: '25rem' }}>
                            <table id="table" className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100 sticky top-0 z-10">
                                <tr>
                                    {displayHeaders.map((displayHeader, index) => (
                                        <th key={index} className={headerClass}>{displayHeader}</th>
                                    ))}
                                   {action.length ? (
                                        <th key="actions" className={headerClass}>Actions</th>
                                    ) : null}
                                </tr>

                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {clientDetails.map(client => (
                                        <tr key={client.ID} className="hover:bg-gray-200">
                                                {dataColumns.map((displayData, index) => (
                                                    <td key={index} className={cellClass}>{client[displayData]}</td>
                                                ))}
                                                {action.length ? (
                                                        <td className="px-1 py-1 text-center whitespace-normal text-xs font-medium space-x-2">
                                                        <button type="button" onClick={() => moreDetails(client)} >
                                                            More
                                                        </button>
                                                        <button type="button" >
                                                            Edit
                                                        </button>
                                                        <button type="button" >
                                                            Delete
                                                        </button>
                                                    </td>
                                                    ) : null}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ClientDashboardDetails;
