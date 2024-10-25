import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { FaFilter } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineReload } from 'react-icons/ai';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
    setIsFilterVisible(false);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="mb-6">
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          className={`flex items-center justify-center w-full py-2 px-4 rounded-md transition-colors ${
            isFilterVisible ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isFilterVisible ? (
            <>
              <AiOutlineClose className="mr-2" />
              Close Filter
            </>
          ) : (
            <>
              <FaFilter className="mr-2" />
              Filter
            </>
          )}
        </button>
      </div>

      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${isFilterVisible ? 'block' : 'hidden md:block'}`}>
        <h2 className="font-bold text-xl mb-4 text-gray-800 dark:text-white">Filter Jobs</h2>
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((data, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-semibold text-lg mb-2 text-gray-700 dark:text-gray-300">{data.filterType}</h3>
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div key={itemId} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId} className="text-gray-600 dark:text-gray-400">{item}</Label>
                  </div>
                );
              })}
            </div>
          ))}
        </RadioGroup>
      </div>

      {selectedValue && (
        <div className="md:hidden mt-4">
          <button
            onClick={() => setIsFilterVisible(true)}
            className="flex items-center justify-center w-full py-2 px-4 rounded-md bg-green-500 hover:bg-green-600 text-white transition-colors"
          >
            <AiOutlineReload className="mr-2" />
            Re-Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterCard;
