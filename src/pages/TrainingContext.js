import React, { createContext, useState } from 'react';

export const TrainingContext = createContext();

export const TrainingProvider = ({ children }) => {
    const [trainings, setTrainings] = useState({
        localTrainings: [],
        internationalTrainings: [],
        refresherTrainings: []
    });

    return (
        <TrainingContext.Provider value={{ trainings, setTrainings }}>
            {children}
        </TrainingContext.Provider>
    );
};
