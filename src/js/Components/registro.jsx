const React = require('react');
import Header from './header.jsx';
import Nav from './nav.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {auth} from './helper.jsx';
import {saveUser} from'./helper.jsx';

  const card ={
	display:'flex',
	'justifycontent':'center',
	padding:'0px',
	'paddingTop':'16px',
	'flexDirection': 'column',
	'alignItems':'center'
	
}

class Registro extends React.Component {
    
   	 constructor () {
        super();
        this.state = {  name: '',
                        email: '',
                        password: '',
                        confirmpassword:'',
                        message:''
                     }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
    
    handleSubmit(e) {
      
      e.preventDefault();
      auth(this.state.email,this.state.password)
      
      .then((user) => {
        console.log(this.state.name);
        const newUser = {
            email: user.email,
            uid: user.uid, 
            name:this.state.name
        }
      
      saveUser(newUser);
      user.updateProfile({displayName: this.state.name});
      console.log(this.state.name);
      
        console.log(user);
        this.props.isAuthenticated();
          
      })
      .catch((error) => {
        this.setState({message: error.message});
      })
    }
	
	
	render() {
		return (
		<MuiThemeProvider>
		
		    
		        
		<section>
		
		<form onSubmit={this.handleSubmit}>
		
		    <Card>
		        <CardActions>
		        <CardHeader style={card}  textStyle={card} titleStyle={card}  title="Registro"  />
                  <TextField floatingLabelText="Name" value={this.state.name} onChange={this.handleChange}  name="name" type="text"/>
                   <br />
                    <TextField 
                      value={this.state.email}    
                      onChange={this.handleChange} 
                      name="email"    
                      type="email" 
                      floatingLabelText="Ingrese su email"/>
                      <br />
                    Password    
                    <TextField 
                      value={this.state.password}     
                      onChange={this.handleChange} 
                      name="password"    
                      type="password" 
                      floatingLabelText="Ingrese su contrasena" />
                      <br />
                    <button>Registrar</button>
                    </CardActions>
            </Card>
        </form>
              
              {
                this.state.message==='' ? '' : <p>{this.state.message}</p>
              }
		</section>
		
		    
		</MuiThemeProvider>
		);
	}
}

export default Registro;