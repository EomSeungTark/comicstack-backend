import Header from '../layout/header';
import Footer from '../layout/footer';
import RegisterForm from '../components/registerForm';


function RegisterPage() {

	return (
		<>
			<Header/>
			<div className={"body-layout"}>
				<RegisterForm/>
			</div>
			<Footer/>
		</>
	)
}

export default RegisterPage;