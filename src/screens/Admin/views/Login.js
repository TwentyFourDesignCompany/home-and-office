
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Logo from "../../../assets/logo.png";
import {saveUser} from "../../../helper/user-helper";
import {Alert} from "react-bootstrap";

const mode = 'login';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode
    }
  }
  toggleMode() {
    var newMode = this.state.mode === 'login' ? 'signup' : 'login';
    this.setState({ mode: newMode});
  }
  render() {
    return (
      <div>
        <div className={`form-block-wrapper form-block-wrapper--is-${this.state.mode}`} ></div>
        <section className={`form-block form-block--is-${this.state.mode}`}>
          <header className="form-block__header" style={{flexDirection: "column", alignItems: "center"}}>
            <img src={Logo} height="100" width="100"/>
            <br/>
            {this.props.error.error && <Alert variant="danger" className="w-100 mb-1 text-center">
              {this.props.error.errorMessage}
            </Alert>}
          </header>
          <LoginForm mode={this.state.mode} onSubmit={this.props.onSubmit} hanleChange={this.props.hanleChange}/>
        </section>
      </div>
    )
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <form onSubmit={this.props.onSubmit}>
      <div className="form-block__input-wrapper">
        <div className="form-group form-group--login">
          <Input type="text" name="email" id="email" label="Email" onChange={this.props.hanleChange}/>
          <Input type="password" name="password" id="password" label="password" onChange={this.props.hanleChange}/>
        </div>
        <div className="form-group form-group--signup">
          <Input type="text" id="fullname" label="full name" disabled={this.props.mode === 'login'} />
          <Input type="email" id="email" label="email" disabled={this.props.mode === 'login'} />
          <Input type="password" id="createpassword" label="password" disabled={this.props.mode === 'login'} />
          <Input type="password" id="repeatpassword" label="repeat password" disabled={this.props.mode === 'login'} />
        </div>
      </div>
      <button className="button button--primary full-width mt-2" type="submit">{this.props.mode === 'login' ? 'Log In' : 'Sign Up'}</button>
    </form>
    )
  }
}

const Input = ({id, type, label, name, onChange}) => (
  <input className="form-group__input" type={type} id={id} placeholder={label} onChange={onChange} name={name}/>
);

const App = ({setUser, user}) => {

  const [error, setError] = useState({
    error: false,
    errorMessage: ""
  });
  const navigate = useNavigate();

  function handleChange(e){
    setUser({...user, [e.target.name]: e.target.value});
  }

  return <div className={`app app--is-${mode}`}>
    <LoginComponent
      mode={mode}
      hanleChange={handleChange}
      error={error}
      onSubmit={
        function(e){
          e.preventDefault();
          if (user.email.trim() === "info@homeandoffice.com.ng"){
            if (user.password.trim() === "DeepSky24!"){
              saveUser({
                email: user.email.trim()
              });
              navigate("/admin/shop");
            } else {
              setError({
                error: true,
                errorMessage: "Invalid Password"
              })
            }
          } else {
            setError({
              error: true,
              errorMessage: "Invalid Email Address"
            })
          }
        }
      }
    />
  </div>
};

export default App;
