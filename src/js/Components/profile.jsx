
const React = require('react');
import Header from './header.jsx';
import Nav from './nav.jsx';
import Loginnav from './loginnav.jsx';
import {verify} from './helper.jsx';
import {getToken} from './helper.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import firebase from 'firebase';
import Face from 'material-ui/svg-icons/action/face.js';
class Profile extends React.Component {
    
    constructor () {
        super();
               this.state = {
                   isLoggedIn:false,
                   messages:[]
        }
            if(verify()){
             this.state.isLoggedIn = true;
                const user = getToken();
                console.log(user);
            }else{
                this.state.isLoggedIn = false;
            }
           console.log(this.state.isLoggedIn +' ya');
          
            
    }
    
    render(){
        return (<header>
            <div>
            <Header/>
        
             <Nav/>
      
             <h1>Perfil </h1>
             
             
             
             
             
             
             
             
             
             
            </div>
    		</header>);
        
        
    }
    
    
    
    
    
    
    
    
}export default Profile;