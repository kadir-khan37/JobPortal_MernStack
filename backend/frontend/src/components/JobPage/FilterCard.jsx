import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../../redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Noida", "Pune", "Mumbai"],
  },
  {
    filterType: "Salary",
    array: [
      { label: "0-20k", min: 0, max: 20000 },
      { label: "20k-50k", min: 20000, max: 50000 },
      { label: "50k to 1-lakh", min: 50000, max: 100000 },
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
    dispatch(setSearchQuery(value)); // ✅ correct dispatch
  };

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={data.filterType}>
            <h1 className="font-bold text-lg mt-1">
              {data.filterType}
            </h1>

            {data.array.map((item, idx) => {
              const id = `id-${index}-${idx}`;

              const value =
                data.filterType === "Salary"
                  ? JSON.stringify(item)
                  : item;

              return (
                <div
                  key={id}
                  className="flex items-center space-x-2 mt-1"
                >
                  <RadioGroupItem value={value} id={id} />
                  <Label htmlFor={id} className="text-lg cursor-pointer">
                    {data.filterType === "Salary"
                      ? item.label
                      : item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
