import { useState } from 'react';

function StudentForm() {
  const [students, setStudents] = useState([{ name: '', ktuId: '', gender: '', phone: '', accommodation: [] }]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...students];
    list[index][name] = value;
    setStudents(list);
  };

  const handleAccommodationChange = (e, index) => {
    const { options } = e.target;
    const list = [...students];
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    list[index].accommodation = selectedOptions;
    setStudents(list);
  };

  const handleAddStudent = () => {
    setStudents([...students, { name: '', ktuId: '', gender: '', phone: '', accommodation: [] }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the list of students to the backend as JSON data
    console.log(JSON.stringify(students));
  };

  return (
    <form onSubmit={handleSubmit}>
      {students.map((student, index) => (
        <div key={index}>
          <label htmlFor={`name-${index}`}>
            Name:
            <input
              type="text"
              id={`name-${index}`}
              name="name"
              value={student.name}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
          </label>
          <label htmlFor={`ktuId-${index}`}>
            KTU ID:
            <input
              type="text"
              id={`ktuId-${index}`}
              name="ktuId"
              value={student.ktuId}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
          </label>
          <label htmlFor={`gender-${index}`}>
            Gender:
            <select
              id={`gender-${index}`}
              name="gender"
              value={student.gender}
              onChange={(e) => handleInputChange(e, index)}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label htmlFor={`phone-${index}`}>
            Phone:
            <input
              type="tel"
              id={`phone-${index}`}
              name="phone"
              value={student.phone}
              onChange={(e) => handleInputChange(e, index)}
              pattern="[0-9]{10}"
              required
            />
          </label>
          <label htmlFor={`accommodation-${index}`}>
            Accommodation:
            <select
              id={`accommodation-${index}`}
              name="accommodation"
              value={student.accommodation}
              onChange={(e) => handleAccommodationChange(e, index)}
              multiple
            >
              <option value="1">Day 1</option>
              <option value="2">Day 2</option>
            </select>
          </label>
          {index === students.length - 1 && (
            <button type="button" onClick={handleAddStudent}>
              Add another student
            </button>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default StudentForm;
