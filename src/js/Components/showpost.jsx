const React = require('react');
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './header.jsx';
import Loginnav from './loginnav.jsx';
import {verify} from './helper.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';
import {getToken} from './helper.jsx';
import {savePost} from './helper.jsx';
import {getPost} from './helper.jsx';
import {createComment} from './helper.jsx';

import Face from 'material-ui/svg-icons/action/face.js';

const textfstyle = {
    width : '700px'
}
const style = {
  margin: 12,
  'background-color':'#09b83e'
};

class ShowPost extends React.Component{
    
    
     constructor () {
        super();
        
                   this.state = {
                   isLoggedIn:'',
                   title:'',
                   description:'',
                   authorid:'',
                   datetime:'',
                   newComm:'',
                   messages:[]
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendComment = this.sendComment.bind(this);
    }
    
        componentWillMount(){
            
            const postId = localStorage.getItem('itemSelected');
          //  console.log("compWillMount POSTID "+postId);
            var currentPost= getPost(postId);
            console.log(currentPost);
            localStorage.setItem('currentPost',currentPost);
            
            document.title = currentPost.title;
        this.setState({
            title:currentPost.title,
            description:currentPost.descr,
            authorid:currentPost.author,
            datetime:currentPost.datetime
        });
       // console.log('WILL MOUNT'+this.state.title);
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
         //    this.props.history.push('./');
            }else{
                this.state.isLoggedIn = false;
               
            }
	}
    
    
     componentDidMount(){
    //    console.log('componentDidMount');
            const post = localStorage.getItem('itemSelected');

        firebase.database().ref().child('posts/'+post+'/comments').on('value',(snapshot) =>{
            
            let messages = snapshot.val();
            let newState = [];
            for (let message in messages){
                 newState.push({
                     id:message,
                     comment :messages[message].comment,
                     user: messages[message].user,
                     datetime: messages[message].datetime
                    
                 });
                 //console.log(message);
            }
             //console.log(newState);
            this.setState({
               
               messages: newState 
            });
        });
    }
    sendComment(e){
        
        const user = getToken();
        const post = localStorage.getItem('itemSelected');
        console.log(user.uid);
        //console.log(this.state.newComm);
        createComment(post,user.displayName, this.state.newComm);
        
        
        
    }
    render(){
       return(<header> 
       <Header/>
        <MuiThemeProvider>
         

        <div className="showPostBox">
        	<section>
        	<Card>
    	           
    	            <CardHeader
    	                onChange={this.handleChange}
    	                title={this.state.title}
    	                subtitle={this.state.datetime}
                        avatar={<Face />}
                    />
    	            <CardText>{this.state.description}</CardText>
    	            </Card>
        	</section>
        	<section>
            	<Card>
                    <CardHeader
                      title="Danos tu opinion sobre este post"
                    />
                    <TextField
        	            className="newComm"
            	        onChange={this.handleChange}
            	        value={this.state.newComm}
                        hintText="Comenta..."
                        name="newComm"
                        style={textfstyle}
                        />  
            	    <RaisedButton label="COMENTAR" primary={true} style={style} onClick={this.sendComment} />
        	    </Card>
        	    
        	           
        	</section>
        	<section>
        	 {this.state.messages.map(item=>{
    	            return (
    	            <div  key={item.id}>
    	            <Card>

    	            <CardHeader
    	                title={item.user}
    	                subtitle={item.datetime}
                        avatar={<Face />}
                    />
    	            <CardText>{item.comment}</CardText>
    	            </Card>
    	            </div>
    	           )
    	        })
    	      }
        	</section>
        	</div>
        </MuiThemeProvider>
        </header>); 
       
    }
    
    
}export default ShowPost;