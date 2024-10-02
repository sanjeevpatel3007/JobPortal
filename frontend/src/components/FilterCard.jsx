import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { FaFilter } from 'react-icons/fa'; // Importing filter icon
import { AiOutlineClose } from 'react-icons/ai'; // Importing close icon
import { AiOutlineReload } from 'react-icons/ai'; // Importing reload icon for reselect

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false); // State to control visibility on mobile
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
    setIsFilterVisible(false); // Close filter on selection for mobile
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div>
      {/* Toggle Button for mobile view */}
      <div className="block md:hidden">
        {!isFilterVisible ? (
          <button
            onClick={() => setIsFilterVisible(true)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            <FaFilter className="mr-2" /> {/* Filter Icon */}
            Filter
          </button>
        ) : (
          <button
            onClick={() => setIsFilterVisible(false)}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md"
          >
            <AiOutlineClose className="mr-2" /> {/* Close Icon */}
            Close Filter
          </button>
        )}
      </div>

      {/* Filter Box - visible on mobile when toggled, always visible on larger screens */}
      <div
        className={`w-full bg-[#fff] dark:bg-gray-800 dark:shadow-xl p-3 rounded-md mt-3 ${
          isFilterVisible ? 'block' : 'hidden md:block'
        }`}
      >
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <hr className="mt-3" />
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {fitlerData.map((data, index) => (
            <div key={index}>
              <h1 className="font-bold text-lg">{data.fitlerType}</h1>
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div key={itemId} className="flex items-center space-x-2 my-2">
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                );
              })}
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Reselect Button - visible only after a selection on mobile */}
      {selectedValue && (
        <div className="block md:hidden mt-3">
          <button
            onClick={() => setIsFilterVisible(true)}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md"
          >
            <AiOutlineReload className="mr-2" /> {/* Reload Icon for Re-Select */}
            Re-Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterCard;



// import React, { useEffect, useState } from 'react'
// import { RadioGroup, RadioGroupItem } from './ui/radio-group'
// import { Label } from './ui/label'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice'

// const fitlerData = [
//     {
//         fitlerType: "Location",
//         array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
//     },
//     {
//         fitlerType: "Industry",
//         array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
//     },
//     {
//         fitlerType: "Salary",
//         array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
//     },
// ]

// const FilterCard = () => {
//     const [selectedValue, setSelectedValue] = useState('');
//     const dispatch = useDispatch();
//     const changeHandler = (value) => {
//         setSelectedValue(value);
//     }
//     useEffect(()=>{
//         dispatch(setSearchedQuery(selectedValue));
//     },[selectedValue]);
//     return (

//         <div className='w-full bg-[#fff]  dark:bg-gray-800 dark:shadow-xl p-3 rounded-md'>
//             <h1 className='font-bold text-lg'>Filter Jobs</h1>
//             <hr className='mt-3' />
//             <RadioGroup value={selectedValue} onValueChange={changeHandler}>
//                 {
//                     fitlerData.map((data, index) => (
//                         <div>
//                             <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
//                             {
//                                 data.array.map((item, idx) => {
//                                     const itemId = `id${index}-${idx}`
//                                     return (
//                                         <div className='flex items-center space-x-2 my-2'>
//                                             <RadioGroupItem value={item} id={itemId} />
//                                             <Label htmlFor={itemId}>{item}</Label>
//                                         </div>
//                                     )
//                                 })
//                             }
//                         </div>
//                     ))
//                 }
//             </RadioGroup>
//         </div>
//     )
// }

// export default FilterCard