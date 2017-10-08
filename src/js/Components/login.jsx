
const React = require('react');
import { BrowserRouter as Router } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import * as firebase from 'firebase';
import {auth} from './helper.jsx';
import {login} from './helper.jsx';


const card ={
	display:'flex',
	'justifyContent':'center',
	padding:'0px',
	'paddingTop':'16px',
	'fontSize':'120%'
}


class Login extends React.Component {
	
    constructor() {
        super();
        this.state = {
            mail: '',
            password: ''
            
        }
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);

        
    }
	
	handleSubmit(e) {
        e.preventDefault();
		const mail = this.state.mail;
		const password = this.state.password;
		const messagesRef = firebase.database().ref().child('cuenta');
		
		console.log(this.props);
		
 
		login(mail,password)
			.then((userRecord) => {
              console.log("Login successful");
           localStorage.setItem('currentPass',password);

              this.props.history.push('./');
              //console.log(this.props);
              
			})
			.catch((error) => {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  console.log(errorMessage);
			  if (errorCode === 'auth/wrong-password') {
			    alert('Contraseña incorrecta');
			  } else {
			    //alert("Credenciales incorrectas, intente nuevamente");
			  }
			});
	}
	
	
		handleChange(e){
			this.setState({
            	[e.target.name]: e.target.value
    		 });
		}
        

	
	render() {
		return (<header>
<MuiThemeProvider>

		<div className="login">
		<form    onSubmit={this.handleSubmit} >
		<Card  className="loginCard">
		<CardHeader style={card}  textStyle={card} titleStyle={card}  title="Iniciar Sesion"  />
		
    	<CardActions>

        <TextField value={this.state.mail} onChange={this.handleChange}  name="mail"    type="email" 
    		floatingLabelText="Ingrese Correo Electronico" fullWidth={true}/>
    		<br />
    	<TextField
       value={this.state.password} onChange={this.handleChange}  name="password"    type="password" 
      floatingLabelText="Ingrese Contraseña"fullWidth={true}
    /><br />
        
		<RaisedButton type='submit' label="LOGIN" primary={true} fullWidth={true}/>
		<br/>
		</CardActions>
        </Card>
        </form>
		</div>
		
</MuiThemeProvider>
		</header>);
	}
	
}

export default Login;
