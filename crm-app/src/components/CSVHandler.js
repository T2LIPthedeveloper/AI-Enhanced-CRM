import React, { useRef } from 'react';

const CSVHandler = ({ onUpload }) => {
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const text = event.target.result;
                const data = parseCSV(text);
                onUpload(data);
            };
            reader.readAsText(file);
        }
    };

    const parseCSV = (csvText) => {
        const lines = csvText.split(/\r\n|\n/);
        const headers = lines[0].split(',');
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length === headers.length) {
                const entry = {};
                headers.forEach((header, index) => {
                    entry[header.trim()] = values[index].trim();
                });
                data.push(entry);
            }
        }

        return data;
    };

    return (
        <div>
            <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
            />
            <button className="btn btn-primary m-1 ms-2" onClick={() => fileInputRef.current.click()}>
                Upload CSV
            </button>
        </div>
    );
};

export default CSVHandler;
