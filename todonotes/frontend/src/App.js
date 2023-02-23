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

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],

        }
    }
    componentDidMount() {
        const users = [
            // {
            //     'username': 'User1',
            //     'first_name': 'Ivan',
            //     'last_name': 'Ivanov',
            //     'email': 'Ivan@gmail.com'
            // },
            // {
            //     'username': 'User2',
            //     'first_name': 'Boris',
            //     'last_name': 'Petrovich',
            //     'email': 'Boris@gmail.com'
            // },


        ]
        const projects = []
        const todos = []

        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }

                ).catch(error => console.log(error))

            })

        axios.get('http://127.0.0.1:8000/api/projects')
        .then(response => {
            const projects = response.data
            this.setState(
                {
                    'projects': projects
                }

            ).catch(error => console.log(error))

        })

        axios.get('http://127.0.0.1:8000/api/todos')
            .then(response => {
                const todos = response.data
                this.setState(
                    {
                        'todos': todos
                    }

                ).catch(error => console.log(error))

            })
    }
    render() {
        return (
            <div>
                <Footer/>
                <Menu/>
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
                    </nav>
                    <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />}/>
                    <Route exact path='/todos' component={() => <TodoList todos={this.state.todos} />}/>
                </BrowserRouter>
            </div>
        )
    }
}
export default App;
