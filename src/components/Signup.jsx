import '../css/styles.css'
import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {

const [gender, setGender] = useState('');
const [datingGender, setdatingGender] = useState('');
const [firstName, setfirstName] = useState('');
const [lastName, setlastName] = useState('');
const [emailAddress, setemailAddress] = useState('');
const [password, setPassword] = useState('');
const [city, setCity] = useState('');
const [age, setAge] = useState(18);
const [profileImage, setprofileImage] = useState([])
const [formerrors, setformErrors] = useState({});
const [isSubmit, setisSubmit] = useState(false)

let formData = new FormData();
formData.append('gender', gender);
formData.append('datingGender', datingGender);
formData.append('firstName', firstName);
formData.append('lastName', lastName);
formData.append('emailAddress', emailAddress);
formData.append('password', password);
formData.append('city', city);
formData.append('age', age)
formData.append('profileImage', profileImage);


const handleSubmit = async(e) => {
  e.preventDefault();
  setformErrors(validation(formData))
  setisSubmit(true)

  if (Object.keys(formerrors).length === 0 && isSubmit) {
    await axios.post('http://localhost:5000/newProfile', formData)
    .then(res => console.log(res.data))
    .catch(error => console.log(error))
  } else {
    console.log("nope")
  }

}

const validation = () => {
  const errors = {};

  if (!firstName) {
    errors.firstName = "Vänligen skriv ditt förnamn"
  }
  if (!gender) {
    errors.gender = "Ange om du är man eller kvinna"
  }
  if (!datingGender) {
    errors.datingGender = "Ange om du söker efter en man eller kvinna"
  }
  if (!lastName) {
    errors.lastName = "Vänligen skriv ditt efternamn"
  }
  if (!emailAddress) {
    errors.emailAddress = "Vänligen skriv in din mail"
  }
  if (!password) {
    errors.password = "Vänligen skriv in ditt lösenord"
  }
  if (!city) {
    errors.city = "Vänligen skriv in din stad"
  }
  if (age < 18) {
    errors.age = "Du måste vara över 18"
  }

  return errors
  
}

  return (
  <section className="signUp">

    <div className="innerSignup">
      <h1>Fyll i din information</h1>

    <form className="signupform" encType='multipart/form-data' onSubmit={handleSubmit}>

            <div className="Gender">
                  <input type="radio" id="Male" name="Male" value="Jag är en man" 
                  checked={gender === "Jag är en man"} onChange={e => setGender(e.target.value)} />
                  <label>Jag är en man</label>

                  <input type="radio" id="Female" name="Female" value="Jag är en kvinna" 
                  checked={gender === "Jag är en kvinna"} onChange={e => setGender(e.target.value)} />
                  <label>Jag är en kvinna</label>
            </div>
            <p>{formerrors.gender}</p>

            <div className="DatingGender">
                  <input type="radio" id="DatingMale" name="DatingMale" value="Söker en man" 
                  checked={datingGender === "Söker en man"} onChange={e => setdatingGender(e.target.value)} />
                  <label>Söker en man</label>

                  <input type="radio" id="DatingFemale" name="DatingFemale" value="Söker en kvinna" 
                  checked={datingGender === "Söker en kvinna"} onChange={e => setdatingGender(e.target.value)} />
                  <label>Söker en kvinna</label>
            </div>
            <p>{formerrors.datingGender}</p>

            <div className="Firstname">
                  <input type="text" id="Firstname" name="firstname" placeholder="Förnamn" value={firstName} 
                  onChange={e => setfirstName(e.target.value)} />
             </div> 
             <p>{formerrors.firstName}</p>

             <div className="Lastname">
                 <input type="text" id="Lastname" name="lastname" placeholder="Efternamn" value={lastName}
                 onChange={e => setlastName(e.target.value)} />
            </div>
            <p>{formerrors.lastName}</p>

            <div className="EmailAddress">
                <input type="email" id="Email" name="email" placeholder="E-mail" value={emailAddress}
                onChange={e => setemailAddress(e.target.value)} />
            </div> 
            <p>{formerrors.emailAdress}</p>

             <div className="Password">
                 <input type="password" id="Password" name="password" placeholder="Lösenord" value={password} 
                 onChange={e => setPassword(e.target.value)} />
             </div>
             <p>{formerrors.password}</p>

             <div className="Age">
                <input type="number" id="Age" name="age" value={age}
                onChange={e => setAge(e.target.value)} />
             </div>
            <span><p>{formerrors.age}</p></span> 

            <div className="City">
                <input type="text" id="City" name="city" placeholder="Stad" value={city} 
                onChange={e => setCity(e.target.value)} />
            </div>
            <p>{formerrors.city}</p>

            <div className="UploadFile">
                <input type="file" id="profileImage" name="profileImage"
                onChange={(e) => setprofileImage(e.target.files[0])} />
            </div>


            <div>
             <button className="SubmitBtn">Skapa konto</button>
             </div>

    </form>
    
    <div>
      Redan medlem? <Link to='/login'>Logga in här</Link>
    </div>
    

    </div>
</section>
  )
}

export default Signup