import React from 'react';

const BreweryDetailsSkeleton: React.FC = () => {
    return (
        <div className="p-4 text-black">
            <div className="mb-12">
                <div className="h-6 bg-gray-200 rounded-full w-1/4 mb-12"></div>
                <div className="h-6 bg-gray-200 rounded-full w-1/2"></div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 mb-12">
                <div className="h-6 bg-gray-200 rounded-full w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-full w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-full w-1/3 mb-2"></div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4">
                <div className="h-6 bg-gray-200 rounded-full w-1/4 mb-4"></div>
                <div className="h-48 bg-gray-200 rounded-md"></div>
            </div>
        </div>
    );
};

export default BreweryDetailsSkeleton;
