import { useState } from 'react';
import PropTypes from 'prop-types';
import { skillsArray } from './utils/skillsArray';

const InputSkills = ({ input, changeEventHandler }) => {
//   const skillsArray = [
//     'React',
//     'Node.js',
//     'JavaScript',
//     'MongoDB',
//     'HTML',
//     'CSS',
//     'Python',
//     'Django',
//     'TypeScript',
//     'Express.js',
//     'Flutter',
//     'Java',
//     'C++',
//     'AWS',
//     'Docker'
//   ];

  const [inputValue, setInputValue] = useState('');
  const [selectedSkills, setSelectedSkills] = useState(input.skills || []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      const updatedSkills = [...selectedSkills, skill];
      setSelectedSkills(updatedSkills);
      changeEventHandler({ target: { name: 'skills', value: updatedSkills } });
    }
    setInputValue('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = selectedSkills.filter((skill) => skill !== skillToRemove);
    setSelectedSkills(updatedSkills);
    changeEventHandler({ target: { name: 'skills', value: updatedSkills } });
  };

  const filteredSkills = skillsArray.filter(
    (skill) =>
      skill.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedSkills.includes(skill)
  );

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <label htmlFor="skills" className="text-right">
        Skills:
      </label>
      <div className="col-span-3 relative">
        <input
          id="skills"
          name="skills"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a skill..."
          className="w-full border rounded-md pl-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {inputValue && filteredSkills.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow-lg">
            {filteredSkills.map((skill, index) => (
              <li
                key={index}
                onClick={() => handleSelectSkill(skill)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedSkills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-slate-100 text-slate-800 px-3 py-1 rounded-full shadow-sm"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="ml-2 text-slate-500 hover:text-slate-800"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
InputSkills.propTypes = {
  input: PropTypes.shape({
    skills: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  changeEventHandler: PropTypes.func.isRequired
};

export default InputSkills;

