
import React, { Component, useContext } from 'react'
import img from "../../Assets/img"
import { Button, Form, Grid, Header, Divider, Icon } from 'semantic-ui-react'
import formToObject from 'form-to-object'
import Notification from '../../Utils/Notification'
import { Link, withRouter } from 'react-router-dom'

class Login extends Component {

    componentDidUpdate() {
        const { Profile, removenotification } = this.props
        Notification(Profile.notifications, removenotification)
    }


    render() {
        const { Profile } = this.props

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
                                <div className='mt-4 w-full flex flex-col justify-end items-end'>
                                    <Link to='/Forgetpassword' className='text-[#3d3d3d] text-sm whitespace-nowrap'><Icon className='text-blue-300' name='key' /> Parolamı Unuttum</Link>
                                    <div className='w-1/3 mt-2'>
                                        <Button loading={Profile.isLogging} className='mt-8' color='blue' fluid size='medium' >Giriş Yap</Button>
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
        const { history, logIn, Profile, fillnotification } = this.props

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
