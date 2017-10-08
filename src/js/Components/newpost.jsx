const React = require('react');
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './header.jsx';
import Loginnav from './loginnav.jsx';
import {verify} from './helper.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {getToken} from './helper.jsx';
import {savePost} from './helper.jsx';
import {login} from './helper.jsx';

class NewPost extends React.Component{
    
    
     constructor () {
        super();
        
                    console.log('holiiiiiiiiiii');

               this.state = {
                   isLoggedIn:'',
                   title:'',
                   description:'',
                   userid:''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
             if(verify()){
             this.state.isLoggedIn = true;
                const user = getToken();
             //  console.log(user.uid);
                
            }else{
                this.state.isLoggedIn = false;
            }
           console.log(this.state.isLoggedIn +' ya');
            
             
    }
    
		handleChange(e){
			this.setState({
            	[e.target.name]: e.target.value
    		 });
		}
        
	handleSubmit(e) {
        e.preventDefault();
        
        
          if(verify()){
            this.state.isLoggedIn = true;
            const user = getToken();
            console.log(user);
            
            const datetime = Date();
            const newpost = {
                 title : this.state.title,
                 descr:this.state.description,
                 authorid : user.uid,
                 datetime: datetime
                
            }
            console.log(newpost);
            savePost(newpost);
		
             this.props.history.push('./');
            }else{
                this.state.isLoggedIn = false;
              
            }
            

	}
    
    
    
    
    
    render(){
       return(<header> 
       <Header/>
         
        <MuiThemeProvider>
         

        <div className="newPostBox">
         
        <h1>Agrega un nuevo post</h1>
        	<section className="newPostBox">
        	<form onSubmit={this.handleSubmit}>
        	    <TextField
        	    className="titlepost"
        	        onChange={this.handleChange}
        	        value={this.state.title}
                    hintText="Title"
                    name="title"
                    />  
                    <br />
        	    <TextField className="descpost"
        	    onChange={this.handleChange}
        	        value={this.state.description}
                    hintText="Ingresa la descripcion de tu post aqui"
                    multiLine={true}
                    rows={10}
                    name="description"

                    />
                    <br />
        	        <RaisedButton label="CREAR POST" primary={true} type='submit' />
        	
        	</form>
        	</section>
        	</div>
        </MuiThemeProvider>
        </header>); 
       
    }
    
    
}export default NewPost;