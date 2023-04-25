import { useState } from 'react';
import '../styles/RegistrationPage.css'

function StudentForm() {
    const [students, setStudents] = useState([{ name: '', ktuId: '', college: '', gender: '', phone: '', accommodation: [] }]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...students];
        list[index][name] = value;
        setStudents(list);
    };

    const handleAccommodationChange = (e, index) => {
        const { name, checked } = e.target;
        const list = [...students];
        const selectedOptions = list[index].accommodation.slice();
        if (checked) {
            selectedOptions.push(name);
        } else {
            const index = selectedOptions.indexOf(name);
            if (index > -1) {
                selectedOptions.splice(index, 1);
            }
        }
        list[index].accommodation = selectedOptions;
        setStudents(list);
    };

    const handleAddStudent = () => {
        setStudents([...students, { name: '', ktuId: '', college: '', gender: '', phone: '', accommodation: [] }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the list of students to the backend as JSON data
        console.log(JSON.stringify(students));
    };

    return (
        <form onSubmit={handleSubmit} className='registration-form'>
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
                    <label htmlFor={`college-${index}`}>
                        College:
                        <input
                            type="text"
                            id={`college-${index}`}
                            name="college"
                            value={student.college}
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
                    <label>Accommodation:</label>
                    <div>
                        <label htmlFor={`day1-${index}`}>
                            May 3
                            <input
                                type="checkbox"
                                id={`day1-${index}`}
                                name="1"
                                checked={student.accommodation.includes('1')}
                                onChange={(e) => handleAccommodationChange(e, index)}
                            />
                        </label>
                        <label htmlFor={`                        day2-${index}`}>
                            May 4
                            <input
                                type="checkbox"
                                id={`day2-${index}`}
                                name="2"
                                checked={student.accommodation.includes('2')}
                                onChange={(e) => handleAccommodationChange(e, index)}
                            />
                        </label>
                        <label htmlFor={`day3-${index}`}>
                            May 5
                            <input
                                type="checkbox"
                                id={`day3-${index}`}
                                name="3"
                                checked={student.accommodation.includes('3')}
                                onChange={(e) => handleAccommodationChange(e, index)}
                            />
                        </label>
                    </div>
                </div>
            ))}
            <button type="button" onClick={handleAddStudent} className='btn-outline'>
                Add Team Member
            </button><br/>
            <button type="submit" className='btn-submit'>Register</button>
        </form>
    );
}

export default StudentForm;
