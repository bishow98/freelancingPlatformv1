import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
const filterData = [
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Machine Learning",
      "Graphic Designers",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-100k", "100k-150k"],
  },
];

const FilterCard = () => {

  const [selectedValue , setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value)=>{
    setSelectedValue(value);
  }
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue))
    
  },[selectedValue])
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Data</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <>
            
              <div>
                <h1 className="font-bold text-lg">{data.filterType}</h1>
                {
                    data.array.map((item,inx)=>{
                      const itemId = `id${index}-${inx}`
                        return <>
                        <div className="flex items-center space-x-2 my-2">
                            <RadioGroupItem htmlFor={itemId} key={itemId} value={item}/>
                            <label>{item}</label>
                        </div>
                        </>
                       
                    })
                }
              </div>
            </>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
