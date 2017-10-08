
const React = require('react');
const Header = require('./header.jsx');
const Nav = require('./nav.jsx');
const Login = require('./login.jsx');
const Registro = require('./registro.jsx')


class Main extends React.Component {
	render() {
		return (<main>
		<Header />
		<Nav />
		<Registro />
		</main>);
	}
}

export default Main;


