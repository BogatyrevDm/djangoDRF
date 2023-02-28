import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';
import Menu from './components/Menu';
import Footer from './components/Footer';
import axios from 'axios';
import { HashRouter,Route, BrowserRouter, Link } from 'react-router-dom';
import LoginForm from './components/Auth';
import Cookies from "universal-cookie";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token':''
        }
    }
    
    load_data(){
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }

                )

            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(response => {
            const projects = response.data.results
            this.setState(
                {
                    'projects': projects
                }

            )

        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos/', {headers})
            .then(response => {
                const todos = response.data.results
                console.dir(response.data)
                this.setState(
                    {
                        'todos': todos
                    }

                )

            }).catch(error => console.log(error))
    }

    set_token(token){
        const cookies = new Cookies()
        cookies.set(token)
        this.setState({'token':token}, ()=>this.load_data())
    }

    get_token(username, password){
        axios.get('http://127.0.0.1:8000/api/api-token-auth/', {'username':username, password:password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Login or password is wrong!'))
    }
        
    is_auth(){
        return !!this.state.token
    }

    get_headers(){
        let headers = {
            'Content-Type':'applications/json'
        }
        if (this.is_auth){
            headers['Authorization'] = `Token ${this.state.token}`
        }
        return headers
    }

    logout(){
        this.set_token('')
    }

    get_token_from_cookies(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token':token}, ()=>this.load_data())
    }

    componentDidMount() {

        this.get_token_from_cookies()    
        
    }
    
    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <Link to='/'>Users</Link>
                        </ul>
                        <ul>
                            <Link to='/projects'>Projects</Link>
                        </ul>
                        <ul>
                            <Link to='/todos'>Todos</Link>
                        </ul>
                        <ul>{this.is_auth()?<button onClick={()=>this.logout()}>Logout</button>:
                            <Link to='/login'>Login</Link>}
                        </ul>
                    </nav>
                    <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />}/>
                    <Route exact path='/todos' component={() => <TodoList todos={this.state.todos} />}/>
                    <Route exact path='/login' component={()=><LoginForm get_token={(username, password)=>this.get_token(username, password)} />}/>
                </BrowserRouter>
            </div>
        )
    }
}
export default App;
