import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const MoreDetails = () => {
    const client = useLocation();
    const [serverDetails, setServerDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const hasLoaded = useRef(false);

    // Ensure client ID is retrieved correctly
    const client_ID = client.state?.clientId?.CLIENT_ID;

    useEffect(() => {
        if (!hasLoaded.current && client_ID) {
            console.log('Client ID:', client_ID);
            getClientDetails(client_ID);
            hasLoaded.current = true; // Set to true after loading
        }
    }, [client_ID]);

    const getClientDetails = async (client_ID) => {
        try {
            console.log('Client ID being sent:', client_ID);
            setLoading(true);

            const response = await axios.get('http://127.0.0.1:1199/api/getserverdetails', {
                params: { clientid: client_ID },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('API Response:', response.data);
            if (response.data.status) {
                setServerDetails(response.data.data[0]); // Set the server details array
                setErrorMessage('');
            } else {
                setErrorMessage(response.data.message); // Use the message for error
            }
        } catch (error) {
            console.error('Error fetching client details:', error);
            setErrorMessage('An error occurred while fetching client details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Server Details</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {loading ? (
                <p>Loading server details for Client ID: {client_ID}...</p>
            ) : (
                serverDetails.length > 0 ? (
                    serverDetails.map(server => (
                        <div key={server.ID}>
                            <h2>{server.SERVER_NAME}</h2>
                            <p>Client ID: {server.CLIENT_ID}</p>
                            <p>Environment: {server.ENVIRONMENT}</p>
                            <p>IP Address: {server.IP_ADDRESS}</p>
                            <p>Operating System: {server.OPERATING_SYSTEM}</p>
                            <p>Status: {server.STATUS}</p>
                            <p>Disk Space: {server.DISK_SPACE}</p>
                            <p>Memory: {server.MEMORY}</p>
                            <p>Username: {server.USERNAME}</p>
                            <p>Additional Notes: {server.ADDITIONAL_NOTES}</p>
                            {/* Add other fields as necessary */}
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No server details found.</p>
                )
            )}
        </div>
    );
};

export default MoreDetails;
