import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 
import { auth, sendData } from '../Firebase/firebasemethods';

function Addblog() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    
    const navigate = useNavigate(); 
    const onsubmit = (data) => {
        console.log(data);
        const sendingData = {
            title: data.title,
            description: data.content,
            uid: auth.currentUser.uid,
            userName: auth.currentUser.displayName
        };
        console.log(sendingData);
        sendData(sendingData, "Blogs").then(() => {
            alert("Blog successfully added!"); 
        }).catch((error) => {
            console.error("Error adding blog:", error);
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Add New Blog</h2>
                <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
                  
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            {...register('title', { required: 'Title is required' })}
                            className={`mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500 ${
                                errors.title ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            {...register('content', { required: 'Content is required' })}
                            className={`mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500 ${
                                errors.content ? 'border-red-500' : ''
                            }`}
                            rows="5"
                        />
                        {errors.content && (
                            <p className="text-sm text-red-600 mt-1">{errors.content.message}</p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Add Blog
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Addblog;
