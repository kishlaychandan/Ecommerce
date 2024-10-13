import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig'; // Adjust the import according to your axios configuration

const AdminCoupon = () => {
    const [coupons, setCoupons] = useState([]);
    const [form, setForm] = useState({ code: '', discount: '', isPublic: false, expiresAt: '' });
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateId, setUpdateId] = useState(null); // ID of the coupon being updated

    const fetchCoupons = async () => {
        const response = await axios.get('/coupons');
        setCoupons(response.data);
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUpdating) {
            await axios.put(`/coupons/${updateId}`, form);
        } else {
            await axios.post('/coupons', form);
        }
        fetchCoupons();
        setForm({ code: '', discount: '', isPublic: false, expiresAt: '' });
        setIsUpdating(false);
        setUpdateId(null);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/coupons/${id}`);
        fetchCoupons();
    };

    const handleUpdateClick = (coupon) => {
        setForm({
            code: coupon.code,
            discount: coupon.discount,
            isPublic: coupon.isPublic,
            expiresAt: coupon.expiresAt.substring(0, 10), // Format the date for the input
        });
        setIsUpdating(true);
        setUpdateId(coupon._id);
    };

    const handleCancelUpdate = () => {
        setIsUpdating(false);
        setForm({ code: '', discount: '', isPublic: false, expiresAt: '' });
        setUpdateId(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    {isUpdating ? 'Update Coupon' : 'Manage Coupons'}
                </h1>

                {/* Coupon Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Coupon Code</label>
                        <input
                            type="text"
                            name="code"
                            value={form.code}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                            placeholder="Coupon Code"
                            required
                            disabled={isUpdating} // Disable code input during update
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                        <input
                            type="number"
                            name="discount"
                            value={form.discount}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                            placeholder="Discount (%)"
                            required
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="block text-sm font-medium text-gray-700">Public</label>
                        <input
                            type="checkbox"
                            name="isPublic"
                            checked={form.isPublic}
                            onChange={handleChange}
                            className="h-5 w-5 text-indigo-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                        <input
                            type="date"
                            name="expiresAt"
                            value={form.expiresAt}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
                        {isUpdating ? 'Update Coupon' : 'Create Coupon'}
                    </button>
                    {isUpdating && (
                        <button
                            type="button"
                            onClick={handleCancelUpdate}
                            className="w-full bg-gray-500 text-white py-2 mt-2 rounded-lg hover:bg-gray-600 transition duration-300">
                            Cancel Update
                        </button>
                    )}
                </form>

                {/* Existing Coupons List */}
                <h2 className="text-xl font-semibold text-gray-800 mt-10 mb-4">Existing Coupons</h2>
                <ul className="space-y-4">
                    {coupons.map((coupon) => (
                        <li
                            key={coupon._id}
                            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                        >
                            <div>
                                <p className="text-lg font-medium">{coupon.code}</p>
                                <p className="text-sm text-gray-500">
                                    {coupon.discount}% off - {coupon.isPublic ? 'Public' : 'Private'}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="space-x-2 flex flex-wrap justify-center items-center gap-3 ">
                                <button
                                    onClick={() => handleDelete(coupon._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleUpdateClick(coupon)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300"
                                >
                                    Update
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminCoupon;
