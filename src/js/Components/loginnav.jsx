
const React = require('react');
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app.js';
import PostAdd from 'material-ui/svg-icons/action/note-add.js';
import Build from 'material-ui/svg-icons/action/build.js';

import {logout} from './helper.jsx';
import {getToken} from './helper.jsx';
import {verify} from './helper.jsx';
import {login} from './helper.jsx';

const horizontal = {
	
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
 'marginBottom':'50px',
};

class Loginnav extends React.Component {
	
	constructor () {
        super();
               this.state = {
                   isLoggedIn:false,
                   messages:[]
        }
            if(verify()){
             this.state.isLoggedIn = true;
                const user = getToken();
             //  console.log(user.uid);
                
            }else{
                this.state.isLoggedIn = false;	
                
            }
           console.log(this.state.isLoggedIn +' ya');
          //  const datetime = Date.now();
          //  console.log(datetime);
            //localStorage.setItem('currentUser',user);
    }
    
	
	
	
 signOutOnClick(e){
   
   logout();
   console.log('Done');
 }


	render() {
		return (<section>

            <div >
            <MuiThemeProvider>
            
            <List style={horizontal}>
                    <ListItem primaryText="Mi perfil" leftIcon={<Build />} href="./profile" />
                    <ListItem primaryText="Nuevo Post" leftIcon={<PostAdd />} href="./newpost" />
                    <ListItem primaryText="Cerrar sesion" leftIcon={<ExitToApp />} href="/" onClick={this.signOutOnClick}/>
                    
                  
            </List>
            
            </MuiThemeProvider>
            </div>

				</section>);
	}
}

export default Loginnav;
