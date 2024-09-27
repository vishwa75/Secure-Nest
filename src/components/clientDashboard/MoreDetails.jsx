import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const MoreDetails = () => {
    const client = useLocation();
    const [serverDetails, setServerDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const hasLoaded = useRef(false);

    const client_ID = client.state?.clientId?.CLIENT_ID;

    useEffect(() => {
        if (!hasLoaded.current && client_ID) {
            console.log('Client ID:', client_ID);
            getClientDetails(client_ID);
            hasLoaded.current = true;
        }
    }, [client_ID]);

    const getClientDetails = async (client_ID) => {
        try {
            setLoading(true);
            const response = await axios.get('http://127.0.0.1:1199/api/getserverdetails', {
                params: { clientid: client_ID },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status) {
                setServerDetails(response.data.data[0]);
                setErrorMessage('');
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage('An error occurred while fetching client details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ height: 'calc(100vh - 80px)'}} className='p-5 flex justify-center items-center'>
        <div className='w-full'>
            <div className="flex justify-center items-center flex-wrap">
                <span className='text-2xl font-bold text-slate-800'>Server Details</span>
            </div>
        <div className="overflow-y-auto px-6 py-6 mt-5" style={{height:'30rem'}} > {/* Adjust height as needed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {serverDetails.map((server) => (
                    <div key={server.ID} className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-full">
                        <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                            <span className="text-sm font-medium text-slate-600">
                                Environment : <span className='font-bold'>{server.ENVIRONMENT}</span>
                            </span>
                        </div>

                        <div className="p-4">
                            <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                                Server Name : {server.SERVER_NAME}
                            </h5>
                            <p className="text-slate-600 leading-normal font-light">
                                IP Addess : {server.IP_ADDRESS}
                            </p>
                            <p className="text-slate-600 leading-normal font-light">
                                Port : {server.PORT}
                            </p>
                            <p className="text-slate-600 leading-normal font-light">
                                User Name : {server.USERNAME}
                            </p>
                            <p className="text-slate-600 leading-normal font-light">
                                OS : {server.OPERATING_SYSTEM}
                            </p>
                            <p className="text-slate-600 leading-normal font-light">
                                Disk Space : {server.DISK_SPACE}
                            </p>
                            <p className="text-slate-600 leading-normal font-light">
                                Memory : {server.MEMORY}
                            </p>
                            <p className="text-slate-600 leading-normal font-light">
                                Notes : {server.ADDITIONAL_NOTES}
                            </p>
                            {/* Repeat details or dynamically render based on data */}
                        </div>

                        <div className="mx-3 border-t border-slate-200 pb-3 pt-2 px-1">
                            <span className="text-sm text-slate-600 font-medium">
                                Last updated: {server.UPDATED_AT}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    </div>
    );
};

export default MoreDetails;
