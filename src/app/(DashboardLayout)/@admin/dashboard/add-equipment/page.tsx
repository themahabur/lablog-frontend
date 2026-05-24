"use client";

import React, { useState } from "react";

const CreateEquipmentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    status: "AVAILABLE",
    location: "",
    metadata: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      metadata: formData.metadata
        ? JSON.parse(formData.metadata)
        : null,
    };

    console.log(payload);

    // TODO: API call here
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <div className="mx-auto w-full max-w-md  rounded-2xl bg-white p-8 ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Equipment
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Add new equipment to the inventory system.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Equipment Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Equipment Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter equipment name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Serial Number */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Serial Number
            </label>
            <input
              type="text"
              name="serialNumber"
              placeholder="Enter serial number"
              value={formData.serialNumber}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="IN_USE">IN USE</option>
              <option value="MAINTENANCE">MAINTENANCE</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter equipment location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Metadata */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Metadata (JSON)
            </label>
            <textarea
              name="metadata"
              rows={5}
              placeholder='e.g. {"brand":"Dell","model":"XPS 15"}'
              value={formData.metadata}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              className="rounded-xl border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Create Equipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEquipmentPage;