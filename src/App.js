import { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { moviedata } from "./data";
import NavBar from "./components/NavBar/NavBar";
import MovieList from "./components/MovieList/MovieList";
import AddMovie from "./components/AddMovie/AddMovie";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/NavBar/Home";
import Login from "./components/NavBar/Login";
import Details from "./components/Details/Details";


function App() {
  const [movielist, setMovielist] = useState(moviedata);
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  }

  const [rate, setRate] = useState(0);
  const ratingChanged = (newRating) => {
    setRate(newRating);
  }

  const handleAdd = (newMovie) => {
    setMovielist([...movielist, newMovie]);
  }

  //Delete movie from list of movies
  const handleDelete = (id) => {
    setMovielist(movielist.filter((movie) => movie.id !== id))
  }

  /* const routes = {
    "/": () => <Home />,
  "/about": () => <MovieList movies={movielist.filter((movie) => movie.title.toUpperCase().includes(title.toUpperCase()) && movie.rate >= rate)} handleDelete={handleDelete} />,
  "/contact": () => <AddMovie handleAdd={handleAdd} />
  } */

  return (
    <div className="App">
      <Router>
        <NavBar title={title} handleChange={handleChange} rate={rate} ratingChanged={ratingChanged} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/movielist/:id" render={(props) => <Details {...props} mvlst={movielist} />} />
        </Switch>
        <MovieList movies={movielist.filter((movie) => movie.title.toUpperCase().includes(title.toUpperCase()) && movie.rate >= rate)} handleDelete={handleDelete} />
        <AddMovie handleAdd={handleAdd} />
      </Router>
    </div>
  );
}

export default App;