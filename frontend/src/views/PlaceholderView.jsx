import React from 'react';

const PlaceholderView = ({ title, icon }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
            <div className="mb-4 text-slate-700">
                {icon}
            </div>
            <h2 className="text-xl font-bold text-slate-300 font-display">{title}</h2>
            <p className="text-sm mt-2">This module is currently offline or under construction.</p>
        </div>
    );
};

export default PlaceholderView;
