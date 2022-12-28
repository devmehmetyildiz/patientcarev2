import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Button, Divider, Dropdown, Form, FormGroup, Header, Icon, Image } from 'semantic-ui-react'
import Popup from '../../Utils/Popup'
import formToObject from 'form-to-object'
import LoadingPage from '../../Utils/LoadingPage'
import img from '../../Assets/img'

export default class ProfileEdit extends Component {

    constructor(props) {
        super(props)
        const selectedimage = {}
        const showImg = false
        this.state = { selectedimage, showImg }
    }

    componentDidMount() {
        const { GetUserMeta, Profile } = this.props
        GetUserMeta()
    }

    render() {

        const { Profile, removenotification, fillnotification, removeUsernotification, Users } = this.props
        const { meta, username } = Profile

        if (Profile.notifications && Profile.notifications.length > 0) {
            let msg = Profile.notifications[0]
            Popup(msg.type, msg.code, msg.description)
            removenotification()
        }
        if (Users.notifications && Users.notifications.length > 0) {
            let msg = Users.notifications[0]
            Popup(msg.type, msg.code, msg.description)
            removeUsernotification()
        }

        return (
            Users.isLoading || Users.isDispatching ||
                Profile.isLogging || Object.keys(meta).length <= 0 ? < LoadingPage /> :
                <div className='w-full h-[calc(100vh-59px-2rem)] mx-auto flex flex-col  justify-start items-center pb-[2rem] px-[2rem]'>
                    <div className='w-full mx-auto align-middle'>
                        <Header style={{ backgroundColor: 'transparent', border: 'none', color: '#3d3d3d' }} as='h1' attached='top' >
                            <Breadcrumb size='big'>
                                <Link to={"/Home"}>
                                    <Breadcrumb.Section>Profil</Breadcrumb.Section>
                                </Link>
                                <Breadcrumb.Divider icon='right chevron' />
                                <Breadcrumb.Section>{username}</Breadcrumb.Section>
                                <Breadcrumb.Divider icon='right chevron' />
                                <Breadcrumb.Section>Düzenle</Breadcrumb.Section>
                            </Breadcrumb>
                        </Header>
                    </div>
                    <Divider className='w-full  h-[1px]' />
                    <div className='w-full bg-white p-4 rounded-lg shadow-md outline outline-[1px] outline-gray-200 '>
                        <Form className='' onSubmit={this.handleSubmit}>
                            <Form.Group widths={'equal'}>
                                <Form.Field className='flex flex-col justify-between items-center h-[100%]  relative'>
                                    <Icon className='absolute right-[30%] z-50 top-0' size='medium' name='close' />
                                    <Image className='mb-4' src={this.state.showImg ? URL.createObjectURL(this.state.selectedimage) : img.avatar} circular size='medium' />
                                    <Form.Input type='file' onChange={this.imageChange} ></Form.Input>
                                </Form.Field>
                                <Form.Field >
                                    <Form.Group widths={'equal'}>
                                        <Form.Input label="İsim" placeholder="İsim" name="name" fluid defaultValue={meta.name} />
                                        <Form.Input label="Soyisim" placeholder="Soyisim" name="surname" fluid defaultValue={meta.surname} />
                                    </Form.Group>
                                    <Form.Group widths={'equal'}>
                                        <Form.Input label="Kayıtlı Şehir" placeholder="Kayıtlı Şehir" name="city" fluid defaultValue={meta.city} />
                                        <Form.Input label="Kayıtlı İlçe" placeholder="Kayıtlı İlçe" name="town" fluid defaultValue={meta.town} />
                                    </Form.Group>
                                    <Form.Group widths={'equal'}>
                                        <Form.Input label="Adres" placeholder="Adres" name="address" fluid defaultValue={meta.address} />
                                    </Form.Group>
                                </Form.Field>
                            </Form.Group>
                            <div className='flex flex-row w-full justify-between py-4  items-center'>
                                <Link to="/Users">
                                    <Button floated="left" color='grey'>Geri Dön</Button>
                                </Link>
                                <Button floated="right" type='submit' color='blue'>Güncelle</Button>
                            </div>
                        </Form>
                    </div>
                </div >
        )
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { EditUsers, history, fillnotification, Users, Profile } = this.props
        const data = formToObject(e.target)
        let errors = []
        if (!data.name || data.name == '') {
            errors.push({ type: 'Error', code: 'Kullanıcılar', description: 'İsim boş olamaz' })
        }
        if (!data.surname || data.surname == '') {
            errors.push({ type: 'Error', code: 'Kullanıcılar', description: 'Soy isim boş olamaz' })
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                fillnotification(error)
            })
        } else {
            EditUsers({ ...Profile.meta, ...data })
        }
    }

    imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            this.setState({ selectedimage: e.target.files[0], showImg: true });
        }
    }

}
