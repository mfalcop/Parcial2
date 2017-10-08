
const React = require('react');
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/social/person';
import ActionGrade from 'material-ui/svg-icons/action/grade';


const horizontal = {
	
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
 'marginBottom':'50px',
};

class Nav extends React.Component {
	


	render() {
		return (<section className="nav">

                <div >
                <MuiThemeProvider>
                
                    <List style={horizontal}>
                          <ListItem primaryText="Iniciar Sesion" leftIcon={<ContentInbox />} href="./login" />
                          <ListItem primaryText="Registrarme" leftIcon={<ActionGrade />} href="./registro" />
                    </List>
                
                </MuiThemeProvider>
                </div>

				</section>);
	}
}

export default Nav;
