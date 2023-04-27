import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/RegistrationPage.css';
import axios from '../services/api/axios';

const EXPO_URL = '/event/expo/'

function RegistrationPage() {
  const { id } = useParams();

  const [project, setProject] = useState(
    { project_title: '', space_required: '', participants: [] },
  );

  const [students, setStudents] = useState([
    { name: '', ktu_id: '', gender: '', phone: '', accommodation1: false, accommodation2: false },
  ]);

  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleProjectInputChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value })
  };

  const handleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const list = [...students];
    if (type === 'checkbox') {
      list[index][name] = checked;
    } else {
      list[index][name] = value;
    }
    setStudents(list);
    if (successMsg) {
      setSuccessMsg('');
    }
    if (errMsg) {
      setErrMsg('');
    }
  };

  const handleAddStudent = () => {
    setStudents([
      ...students,
      { name: '', ktu_id: '', gender: '', phone: '', accommodation1: false, accommodation2: false },
    ]);
  };

  const handleRemoveStudent = (index) => {
    const list = [...students];
    list.splice(index, 1);
    setStudents(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...project, participants: students })
    if (validateForm()) {
      axios
        .post(EXPO_URL, { ...project, participants: students }, {
          headers: { Authorization: `Token ${localStorage.getItem('access')}` },
        })
        .then((res) => {
          setStudents([{ name: '', ktu_id: '', gender: '', phone: '', accommodation1: false, accommodation2: false }]);
          setProject({ project_title: '', space_required: '', participants: [] })
          setSuccessMsg('Registered Successfully!');
        })
        .catch((err) => setErrMsg(`Couldn't Register!`));
    } else {
      setErrMsg('All fields are required!');
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (project.project_title === '' || project.space_required === '' || students.length === 0) {
      isValid = false;
    }
    students.forEach((student) => {
      if (student.name === '' || student.ktu_id === '' || student.gender === '' || student.phone === '') {
        isValid = false;
      }
    });
    return isValid;
  };

  return (
    <div className="table-container">
      <div className={successMsg && !errMsg ? 'successMsg' : 'offscreen'}>{successMsg}</div>
      <div className={errMsg ? 'errMsg' : 'offscreen'}>{errMsg}</div>
      <table>
        <tbody>
          <tr>
            <th>Project Title</th>
            <th>Space Required</th>
          </tr>
          <tr>
            <td htmlFor="project_title">
              <input
                type="text"
                id="project_title"
                name="project_title"
                value={project.project_title}
                onChange={(e) => handleProjectInputChange(e)}
                required
              />
            </td>
            <td htmlFor="space_required">
              <input
                type="number"
                id="space_required"
                name="space_required"
                value={project.space_required}
                onChange={(e) => handleProjectInputChange(e)}
                required
              />
            </td>
          </tr>
          <tr>
            <th>Name</th>
            <th>KTU Id</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Accommodation</th>
            <th> </th>
          </tr>

          {students.map((student, index) => (
            <tr key={index}>
              <td htmlFor={`name-${index}`}>
                <input
                  type="text"
                  id={`name-${index}`}
                  name="name"
                  value={student.name}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </td>
              <td htmlFor={`ktuId-${index}`}>
                <input
                  type="text"
                  id={`ktu_id-${index}`}
                  name="ktu_id"
                  value={student.ktu_id}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </td>
              <td htmlFor={`gender-${index}`}>
                <select
                  id={`gender-${index}`}
                  name="gender"
                  value={student.gender}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </td>
              <td htmlFor={`phone-${index}`}>
                <input
                  type="tel"
                  id={`phone-${index}`}
                  name="phone"
                  value={student.phone}
                  onChange={(e) => handleInputChange(e, index)}
                  pattern="[0-9]{10}"
                  required
                />
              </td>
              <td>
                <label htmlFor={`day1-${index}`}>
                  <input
                    type="checkbox"
                    id={`day1-${index}`}
                    name="accommodation1"
                    checked={student.accommodation1}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  &nbsp;May 3
                </label>
                <label htmlFor={`day2-${index}`}>
                  <input
                    type="checkbox"
                    id={`day2-${index}`}
                    name="accommodation2"
                    checked={student.accommodation2}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  &nbsp;May 4
                </label>
              </td>
              <td>
                <button onClick={(e) => handleRemoveStudent(index)} className="btn-danger">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleAddStudent} className="btn-outline">
        Add Team Member
      </button>
      <br />
      <button type="submit" className="btn-submit" onClick={handleSubmit}>
        Register
      </button>
    </div>
  );
}

export default RegistrationPage;