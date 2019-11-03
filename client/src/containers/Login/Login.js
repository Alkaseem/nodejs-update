import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import EmailLoader from '../Loader/EmailLoader'
import './Login.css';
const Login = ({ login, history ,loading}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>

      <div class="reg-container">
    		<h2>Login</h2>
    		<form onSubmit={e => {
          e.preventDefault();
          login(email, password, history);
        }}>

    			<label for="email"></label>
    			<input id='email'
          onChange={e => onChange(e)}
          value={email}
          type='email'
          name='email'
          required
          placeholder="&#xf0e0;  email"
          style="font-family:Arial, FontAwesome"/>

    			<label for="password"></label>
    			<input
          id='password'
          onChange={e => onChange(e)}
          value={password}
          type='password'
          name='password'
          required
          placeholder="&#xf023;  *******"
          style="font-family:Arial, FontAwesome">

          {!loading ? (
            <button className='btn'>Login</button>
          ) : (
            <EmailLoader />
          )}

    		</form>

        <p>
          Don't have an account? <Link to='/register'>Sign Up</Link>{' '}
        </p>

    	</div>

    </div>
  );
};
const mapStateToProps=state=>({
  loading:state.auth.loading
})
export default connect(
  mapStateToProps,
  { login }
)(Login);
