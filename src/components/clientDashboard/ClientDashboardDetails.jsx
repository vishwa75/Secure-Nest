import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import axios from 'axios';

const ClientDashboardDetails = () => {
    const navigate = useNavigate();
    const [clientDetails, setClientDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const headerClass = "px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase";
    const cellClass = "px-2 py-1 text-center whitespace-normal break-words text-sm font-medium text-gray-800";

    const getClientDetails = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:1199/api/getclientdetails');
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
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            <div className="flex justify-center items-center flex-wrap my-4">
              <label htmlFor="bank" className="mr-4">Search</label>
              <input type="text" id="searchVal" name="bank" placeholder="ID,Client ID,Bank Name,Country,SPOC...." value={searchInput}
               className="border w-1/4 px-2 py-1 mr-4 rounded-full text-sm transition duration-300 focus:border-green-500" onChange={searchOnChange}></input>
            </div>
            {/* Table layout for client details */}
            <div className="flex flex-col" id="table_content">
                <div className="mx-4 my-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                        <div className="overflow-y-auto" style={{ height: '40rem' }}>
                            <table id="table" className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100 sticky top-0 z-10">
                                <tr>
                                    <th className={headerClass}>Client ID</th>
                                    <th className={headerClass}>Establishment Name</th>
                                    <th className={headerClass}>Country</th>
                                    <th className={headerClass}>Preferred Contact Method</th>
                                    <th className={headerClass}>Client SPOC</th>
                                    <th className={headerClass}>SPOC Contact</th>
                                    <th className={headerClass}>Support SPOC</th>
                                    <th className={headerClass}>Support SPOC Contact</th>
                                    <th className={headerClass}>Additional Notes</th>
                                    {/* <th className={headerClass}>Created At</th> */}
                                    <th className={headerClass}>Updated At</th>
                                    <th className={headerClass}>Actions</th>
                                </tr>

                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {clientDetails.map(client => (
                                        <tr key={client.ID} className="hover:bg-gray-200">
                                            <td className={cellClass}>{client.CLIENT_ID}</td>
                                            <td className={cellClass}>{client.ESTABLISHMENT_NAME}</td>
                                            <td className={cellClass}>{client.COUNTRY}</td>
                                            <td className={cellClass}>{client.PREFERRED_CONTACT_METHOD}</td>
                                            <td className={cellClass}>{client.CLIENT_SPOC}</td>
                                            <td className={cellClass}>{client.CLIENT_SPOC_CONTACT_DETAIL}</td>
                                            <td className={cellClass}>{client.SUPPORT_SPOC}</td>
                                            <td className={cellClass}>{client.SUPPORT_SPOC_CONTACT_DETAIL}</td>
                                            <td className={cellClass}>{client.ADDITIONAL_NOTES}</td>
                                            {/* <td className={cellClass}>{client.CREATED_AT}</td> */}
                                            <td className={cellClass}>{client.UPDATED_AT}</td>
                                            <td className="px-2 py-1 text-center whitespace-normal break-words text-sm font-medium">
                                                <button type="button" onClick={() => moreDetails(client)} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800">
                                                    More
                                                </button>
                                                <button type="button"  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800">
                                                    Edit
                                                </button>
                                                <button type="button"  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800">
                                                    Delete
                                                </button>
                                            </td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboardDetails;
