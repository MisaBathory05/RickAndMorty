import { useState, useEffect } from 'react';
import './App.css';
// import Card from './components/Card/Card.jsx';
import Cards from './components/Cards/Cards.jsx';
import NavBar from './components/NavBar/NavBar';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import About from './components/About/About';
import Form from './components/Form/Form';
import PathRoutes from "./components/Helpers/Routes.helper";
import Detail from './components/Detail/Detail';
import Favorites from './components/Favorites/Favorites';
// import SearchBar from './components/SearchBar/SearchBar.jsx';
// import characters from './data.js';


function App() {
   const personajes = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: {
         name: 'Earth (C-137)',
         url: 'https://rickandmortyapi.com/api/location/1',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
   };
   const [characters, setCharacters]=useState([]);
   const location = useLocation()
   const navigate = useNavigate();
   const [access, setAccess] = useState(false);
   const EMAIL = ' ';
   const PASSWORD = ' ';
   
   useEffect(() => {
      !access && navigate('/');
   },[access]);


   // const onSearch= () => {
   //    setCharacters([...characters, personajes])
   // }
   function onSearch(id) {
      axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   }
   const onClose = (id) => {
      // const characterFiltered = characters.filter((char) => char.id !== id)
      setCharacters(characters.filter((char) => char.id !== Number(id)))
      }

      function login(userData) {
         const { email, password } = userData;
         const URL = 'http://localhost:3001/rickandmorty/login/';
         axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
            const { access } = data;
            setAccess(data);
            access && navigate('/home');
         });
      }

   return (
      <div className='App'>
         {location.pathname !== '/' && <NavBar onSearch={onSearch}/>}
         
         <Routes>
            <Route path = {PathRoutes.FORM} element={<Form login ={login}/>}></Route> 
            <Route path = {PathRoutes.HOME} element={<Cards characters={characters} onClose={onClose}/>}></Route>
            <Route path = {PathRoutes.ABOUT} element={<About/>}></Route>   
            <Route path = {PathRoutes.DETAIL} element={<Detail/>}></Route> 
            <Route path = {PathRoutes.FAVORITES} element={<Favorites/>}></Route>      
         </Routes>
         {/* <NavBar onSearch={onSearch}/> */}         {/* /* <SearchBar onSearch={(characterID) => window.alert(characterID)} /> */}
         {/* <Cards characters={characters} onClose={onClose}/> */}
         {/* <Card
            id={Rick.id}
            name={Rick.name}
            status={Rick.status}
            species={Rick.species}
            gender={Rick.gender}
            origin={Rick.origin.name}
            image={Rick.image}
            onClose={() => window.alert('Emulamos que se cierra la card')}
         /> */}
      </div>
   );
}

export default App;
