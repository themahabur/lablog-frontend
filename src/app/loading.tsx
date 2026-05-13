import { Spinner } from '@/components/ui/spinner';
import React from 'react';

const loading = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">

            <Spinner/>
        
        </div>
    );
};

export default loading;