import React, { useState } from 'react';
import { FaRegFileWord } from "react-icons/fa";
import axios from 'axios';

const Home = () => {
    const [file, setFile] = useState(null); // Use the file object instead of just the file name
    const [convert, setConvert] = useState("");
    const [downloadError, setDownloadError] = useState("");

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleFileConvert = async () => {
        if (!file) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file); // Append the actual file, not the file name

        try {
            const response = await axios.post('http://localhost:4001/convertFile', formData, {
                responseType: "blob", 
            });

            const blobUrl = URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', file.name.replace('.docx', '.pdf'));
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setFile(null);
            setDownloadError("");
            setConvert('File converted successfully');
        } catch (error) {
            console.log('Conversion error:', error);
            setDownloadError("There was an error converting the file.");
        }
    };

    return (
        <div className='max-w-screen-2xl container mx-auto px-6 md:px-40'>
            <div className='flex h-screen items-center justify-center'>
                <div className='border-2 border-dashed border-indigo-400 rounded-lg shadow-lg px-4 py-2 md:px-8 md:py-6'>
                    <h1 className='text-3xl font-bold mb-3 text-center'>Convert your file</h1>
                    <p className='text-sm mb-5 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, odio?</p>

                    <div className='flex flex-col items-center py-6'>
                        <input 
                            type="file" 
                            accept='.doc,.docx'
                            className='hidden'
                            id='fileInput'
                            onChange={handleFileUpload}
                        />
                        <label htmlFor="fileInput" className='flex space-x-2 w-full items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-500 hover:bg-blue-500 duration-200 hover:text-white'>
                            <FaRegFileWord className='text-3xl'/> 
                            <span className='text-2xl mr-2'>{file ? file.name : "Choose file"}</span>
                        </label>
                        <button 
                            onClick={handleFileConvert}
                            disabled={!file} 
                            className='text-white font-bold disabled:bg-gray-300 disabled:pointer-events-none bg-blue-500 rounded-md px-4 py-2 mt-2 hover:bg-blue-700'
                        >
                            Convert File
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
