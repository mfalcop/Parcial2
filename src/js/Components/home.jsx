
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
class Home extends React.Component {
    
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
             localStorage.setItem('currentUser',user);
                
            }else{
                this.state.isLoggedIn = false;
            }
           console.log(this.state.isLoggedIn +' ya');
          //  const datetime = Date.now();
          //  console.log(datetime);
            
    }
    
    
    
    componentWillMount(){
        var padre = this;
        firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            padre.setState({ auth: true});
            console.log(padre.state.auth);
        } else {
            padre.setState({ auth: false});
            console.log(padre.state.auth);
        }
        });
    }
    
    componentDidMount(){
    //    console.log('componentDidMount');
        firebase.database().ref().child('posts').on('value',(snapshot) =>{
            
            let messages = snapshot.val();
            let newState = [];
            for (let message in messages){
                 newState.push({
                     id:message,
                     title: messages[message].title,
                     descr: messages[message].description,
                     author: messages[message].author,
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

    onMyItemClick(itemid){
        var ref = firebase.database().ref("post");
        ref.orderByChild("uid").equalTo(itemid).on("child_added", function(snapshot) {
            console.log(snapshot.key);  
            
        });
        
        localStorage.setItem('itemSelected',itemid);
        
      
        this.props.history.push('/showpost');
    }
    
	render() {
	    if(this.state.isLoggedIn){
		return (<header>
            <div>
            <Header/>
        
             <Loginnav/>
      
          <MuiThemeProvider>
          
                <div >
                {this.state.messages.map(item=>{
    	            return (
    	            <div  key={item.id}>
    	            <Card>
    	            <a  onClick={()=>  this.onMyItemClick(item.id)}>
    	            <CardHeader
    	                title={item.title}
    	                subtitle={item.datetime}
                        avatar={<Face />}
                    /></a>
    	            <CardText>{item.descr.substring(0, 230)+'... <Ver más>'}</CardText>
    	            </Card>
    	            </div>
    	           )
    	        })
    	      }
                
                
                </div>

        
            </MuiThemeProvider>
            </div>
    		</header>);
		
	    }else{
    	 return (<header>
            <div>
            <Header/>
        
             <Nav/>
      
             <h1>Pagina Home</h1>
            </div>
    		</header>);
	    }
	}
}

export default Home;