import React,{useState, useEffect} from 'react'
import Moment from 'moment'

const Home = () => {
    
// States to capture input from users
  const [names, setNames] = useState("")
  const [sexs, setSexs] = useState("")
  const [courses, setCourses] = useState("")
  const [ages, setAges] = useState("")

// Setting state to add age
  const [totalAge, setTotalAge] = useState(0)

// State for image upload
  const [avatar, setAvatar] = useState(null)

// Creating state for our JSON/Database
  const [state, setState] = useState([])

  const Time = Date.now()


// Function to handle Image upload
  const uploadImage = (e) => {
    const file = e.target.files[0];
    const res = URL.createObjectURL(file);
    setAvatar(res)
  }

// Function to make post to our JSON/Database (state, setState)
  const Post = () => {
    const Items = {
      id : state.length + 1,
      names : names,
      sex : sexs,
      course : courses,
      ages : parseInt(ages),
      image : avatar,
      time : Date.now()
    }
    setState([...state, Items]);

// To empty input after sending post
    setNames('');
    setAges('');
    setCourses('');
    setSexs('');
  }

// Delete Function
const Delete = (id) => {
  const removeItem = state.filter((el) => el.id !== id)
  setState(removeItem)
}

// Writing the add age function inside the useEffect
useEffect(() => {
    const calculateTotalAge = () => {
      const newTotalAge = state.reduce((acc, el) => acc + el.ages, 0);
      setTotalAge(newTotalAge);
    };

    calculateTotalAge();
  }, [state]);

useEffect(() => {
  const state = JSON.parse(localStorage.getItem('state'));
  if (state) {
    setState(state);
  }
}, []);

useEffect(() => {
  localStorage.setItem('state', JSON.stringify(state))
}, [state])

  return (
     <div className="Container">
      
      
      <div className="App">
        <div className="Wrap">
          <input placeholder= "Name" value={names} onChange={(e) =>{
            setNames(e.target.value)
          }}/>
          <input placeholder= "Sex" value={sexs} onChange={(e) =>{
            setSexs(e.target.value)
          }}/>
          <input placeholder= "Course" value={courses} onChange={(e) =>{
            setCourses(e.target.value)
          }}/>
          <input placeholder= "Age" value={ages} onChange={(e) =>{
            setAges(e.target.value)
          }}/>
          <input type="file"  onChange={uploadImage}/>
          <button onClick={Post}>POST</button>
        </div>
      </div>

{/* Showing the total age here... */}
      Total Age: {totalAge}
      
      <div className= "Cardwrapper">
{/* Mapping Datas to Card */}
        {state && state.map((el) =>{
          return(
          <div className="Card" key={el.id}>

              <p>Posted {Moment(el.time).fromNow()}</p>
              <img src={el.image} alt="avatar" style={{width:'50px'}}/>

              <span>{el.id}</span>
              <span>{el.name}</span>
              <span>{el.sex}</span>
              <span>{el.course}</span>
              <span>{el.ages}</span>
              <button  className="Delete-button" onClick={() => {
                Delete(el.id) 
                }}>Delete</button>
          </div>
          )
        })} 
      </div>
    </div>
  )
}

export default Home