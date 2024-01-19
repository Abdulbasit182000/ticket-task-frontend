import Register from './components/Register/register';
import Home from './components/Home/Home';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Login from './components/Login/login';
import Project from './components/Project/project'
import { Provider } from 'react-redux'; 
import {store} from './Store/store'
import Task from './components/Tasks/tasks';
import Comment from './components/Comment/comment';
import Document from './components/Document/document';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/project" element={<Project/>} />
            <Route path="/task/:id" element={<Task/>} />
            <Route path="/comment/:id" element={<Comment/>}/>
            <Route path="/document/:id" element={<Document/>} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
