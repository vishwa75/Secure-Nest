import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Test = () => {
    return (
        <div style={{ height: 'calc(100vh - 80px)'}} className='bg-slate-600 p-10'>
            <div className='bg-green-600 h-full w-full p-10'>
                <div className='bg-red-600 h-full w-full p-10'>
                    <div className='bg-blue-600 h-full w-full p-10'>
                        <div className='bg-purple-600 h-full w-full p-10'>
                            <div className='bg-rose-600 h-full w-full p-10'>
                                <div className='bg-white h-full w-full p-10 flex justify-center items-center'>
                                    <div className='text-5xl font-bold'>HELLO</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;
