import { React, useState } from 'react';
import '../styles/RegistrationPage.css';
import axios from '../services/api/axios';
import { ProductList } from '../sections/@dashboard/products';

const EXPO_URL = '/event/expo-reg/';

function RegistrationPage() {

  const [project, setProject] = useState({ title: '', space_required: '', department: '', participants: [] });

  const [students, setStudents] = useState([
    { name: '', ktu_id: '', gender: '', phone: '', accommodation1: false, accommodation2: false },
  ]);

  const [dept, setDept] = useState('');
  const [otherDepartment, setOtherDepartment] = useState(false);

  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  // const axiosPrivate = useAxiosPrivate()

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    console.log(isAuthenticated)
    if (isAuthenticated === 'false') {
      navigate(
        '/login',
        { replace: true },
      )
    }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(JSON.stringify({ ...project, department: dept, participants: students }));
    if (validateForm()) {
      axios
        .post(
          EXPO_URL,
          { ...project, department: dept, participants: students },
          {
            headers: { Authorization: `Token ${localStorage.getItem('access')}` },
          }
        )
        .then((res) => {
          setStudents([{ name: '', ktu_id: '', gender: '', phone: '', accommodation1: false, accommodation2: false }]);
          setProject({ title: '', space_required: '', department: '', participants: [] });
          setSuccessMsg('Registered Successfully!');
        })
        .catch((err) => setErrMsg(`Couldn't Register!`));
    } else {
      setErrMsg('All fields are required!');
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (
      project.title === '' ||
      project.space_required === '' ||
      dept === '' ||
      students.length === 0
    ) {
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
            <th>Department</th>
            {otherDepartment && <th>Enter Your Department</th>}
          </tr>
          <tr>
            <td htmlFor="title">
              <input
                type="text"
                id="title"
                name="title"
                value={project.title}
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
            <td htmlFor="department">
              <select id="department" name="department" onChange={(e) => handleProjectInputChange(e)} required>
                <option value="">Select Department</option>
                <option value="AE">Aeronautical Engineering</option>
                <option value="AEI">Applied Electronics and Instrumentation Engineering</option>
                <option value="AU">Automobile Engineering</option>
                <option value="BT">Biotechnology</option>
                <option value="BME">Biomedical Engineering</option>
                <option value="CE">Civil Engineering</option>
                <option value="CSE">Computer Science and Engineering</option>
                <option value="EBE">Electronics & Biomedical Engineering</option>
                <option value="ECE">Electronics and Communication Engineering</option>
                <option value="EEE">Electrical and Electronics Engineering</option>
                <option value="FT">Food Technology</option>
                <option value="ICE">Instrumentation and Control Engineering</option>
                <option value="IE">Industrial Engineering</option>
                <option value="IT">Information Technology</option>
                <option value="ME">Mechanical Engineering</option>
                <option value="MT">Mechatronics</option>
                <option value="MTY">Metallurgy</option>
                <option value="NA">Naval Architecture & Ship Building Engg</option>
                <option value="PE">Production Engineering</option>
                <option value="PE">Polymer Engineering</option>
                <option value="SFE">Safety and Fire Engineering</option>
                <option value="Other">Other</option>
              </select>
            </td>
            {otherDepartment && (
              <td>
                <input
                  type="text"
                  id="otherDepartment"
                  name="otherDepartment"
                  onChange={(e) => handleProjectInputChange(e)}
                  required
                />
              </td>
            )}
          </tr>
          <tr>
            <th>Name</th>
            <th>KTU Id</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Accommodation</th>
            <th> </th>
          </tr>

        <ProductList products={events} />
      </Container>
    </>
  );
}
