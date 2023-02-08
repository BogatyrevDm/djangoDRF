import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import Menu from './components/Menu';
import Footer from './components/Footer';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
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

        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }

                ).catch(error => console.log(error))

            })
    }
    render() {
        return (
            <div>
                <Footer/>
                <Menu/>
                <UserList users={this.state.users} />
            </div>
        )
    }
}
export default App;
