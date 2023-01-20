
import React, { Component, useContext } from 'react'
import img from "../../Assets/img"
import { Button, Form, Grid, Header, Divider } from 'semantic-ui-react'
import formToObject from 'form-to-object'
import Popup from '../../Utils/Popup'
import { useNavigate, withRouter } from 'react-router-dom'
import { AuthContext } from '../../Provider/AuthProvider'

class Login extends Component {



    render() {
        const { history, match, LogIn, LogOut, Profile, removenotification, fillnotification } = this.props

        if (Profile.notifications && Profile.notifications.length > 0) {
            let msg = Profile.notifications[0]
            Popup(msg.type, msg.code, msg.description)
            removenotification()
        }

        return (
            <div style={{ backgroundImage: `url(${img.loginbg})` }} className=' font-Common w-full h-[100vh] justify-center items-center flex ' >
                <div className='bg-white rounded-lg w-4/5 md:w-[40vmin] lg:w-[40vmin]  shadow-sm shadow-white'>
                    <div className=' bg-[#42A5F5] w-[20%] pb-[20%]   rounded-tl-lg rounded-br-[100%] ' />
                    <Grid textAlign='center' verticalAlign='middle'>
                        <Grid.Column verticalAlign='middle'>
                            <div className='w-full flex justify-center items-center'>
                                <img className='w-1/3' src={img.patient} alt="" />
                            </div>
                            <Header as='h3' color='blue' textAlign='center'>
                                <br />
                                <p>Patient Care Hasta Bakım Sistemi</p>
                            </Header>
                            <Form size='large' className='p-4' onSubmit={this.LoginHandler}>
                                <Form.Input transparent placeholder="Kullanıcı Adı" name="username" fluid icon='user' iconPosition='left' />
                                <Divider />
                                <Form.Input type='password' transparent placeholder="Parola" name="password" fluid icon='lock' iconPosition='left' />
                                <Divider />
                                <div className='mt-4 w-full flex justify-end items-center'>
                                    <div className='w-1/3 '>
                                        {Profile.isLogging ? <Button loading className='mt-4' color='blue' fluid size='medium' >Giriş Yap</Button>
                                            : <Button className='mt-4' color='blue' fluid size='medium' type='submit' >Giriş Yap</Button>}
                                    </div>
                                </div>
                                <div className='mt-4 flex flex-col justify-center items-center'>
                                    <p className='text-[#777] text-sm '>
                                        <span>Terms of Use</span><br />
                                        <span>ARMSTeknoloji 2022</span></p>
                                </div>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        )
    }
    LoginHandler = (event) => {
        event.preventDefault()
        const { location,history, match, logIn, LogOut, Profile, removenotification, fillnotification } = this.props

        let redirectUrl = null
        const paths = history.location.search?.split('=')
        if (Array.isArray(paths) && paths.length > 0) {
            paths[0] === "?redirecturl" && (redirectUrl = paths[1])
        }

        if (Profile.isLogging) {
            return false
        }
        const data = formToObject(event.target)
        if (data.username && data.password) {
            logIn(data, history, redirectUrl)
        } else {
            fillnotification({ type: 'Error', code: 'USERNAME_PASSWORD_REQUIRED', description: 'Lütfen Kullanıcı ve ya şifre giriniz' })
        }
    }
}
export default withRouter(Login)
