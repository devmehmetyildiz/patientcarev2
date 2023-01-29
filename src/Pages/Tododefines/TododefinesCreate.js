
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Checkbox,Divider, Form } from 'semantic-ui-react'
import { Breadcrumb, Button,  Header } from 'semantic-ui-react'
import formToObject from 'form-to-object'
import LoadingPage from '../../Utils/LoadingPage'
import Notification from '../../Utils/Notification'

export default class TododefinesCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRequired: false,
      isNeedactivation: false
    }
  }

  componentDidUpdate() {
    const { notifications, removeTododefinenotification } = this.props
    Notification(notifications, removeTododefinenotification)
  }

  render() {

    const { Tododefines } = this.props
    const { isLoading, isDispatching } = Tododefines

    return (
      isLoading || isDispatching ? <LoadingPage /> :
        <div className='w-full h-[calc(100vh-59px-2rem)] mx-auto flex flex-col  justify-start items-center pb-[2rem] px-[2rem]'>
          <div className='w-full mx-auto align-middle'>
            <Header style={{ backgroundColor: 'transparent', border: 'none', color: '#3d3d3d' }} as='h1' attached='top' >
              <Breadcrumb size='big'>
                <Link to={"/Tododefines"}>
                  <Breadcrumb.Section>Yapılacaklar</Breadcrumb.Section>
                </Link>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section>Oluştur</Breadcrumb.Section>
              </Breadcrumb>
            </Header>
          </div>
          <Divider className='w-full  h-[1px]' />
          <div className='w-full bg-white p-4 rounded-lg shadow-md outline outline-[1px] outline-gray-200 '>
            <Form className='' onSubmit={this.handleSubmit}>
              <Form.Group widths={'equal'}>
                <Form.Field>
                  <label className='text-[#000000de]'>Yapılacak İş</label>
                  <Form.Input placeholder="Yapılacak İş" name="name" fluid />
                </Form.Field>
                <Form.Field>
                  <label className='text-[#000000de]'>Açıklama</label>
                  <Form.Input placeholder="Açıklama" name="info" fluid />
                </Form.Field>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <Form.Field>
                  <Checkbox toggle className='m-2'
                    onClick={(e) => { this.setState({ isRequired: !this.state.isRequired }) }}
                    label="Zorunlu alan mı?" />
                </Form.Field>
                <Form.Field>
                  <Checkbox toggle className='m-2'
                    onChange={(e) => {
                      this.setState({ isNeedactivation: !this.state.isNeedactivation })
                    }}
                    label="Onay Gerekir mi?" />
                </Form.Field>
              </Form.Group>
              <div className='flex flex-row w-full justify-between py-4  items-center'>
                <Link to="/Tododefines">
                  <Button floated="left" color='grey'>Geri Dön</Button>
                </Link>
                <Button floated="right" type='submit' color='blue'>Oluştur</Button>
              </div>
            </Form>
          </div>

        </div>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { AddTododefines, history, fillTododefinenotification } = this.props

    const data = formToObject(e.target)
    data.isRequired = this.state.isRequired
    data.isNeedactivation = this.state.isNeedactivation
    data.id = 0
    data.concurrencyStamp = null
    data.createdUser = null
    data.updatedUser = null
    data.deleteUser = null
    data.createTime = null
    data.updateTime = null
    data.deleteTime = null
    data.isActive = true

    let errors = []
    if (!data.name || data.name == '') {
      errors.push({ type: 'Error', code: 'Yapılacaklar', description: 'İsim Boş Olamaz' })
    }
    if (errors.length > 0) {
      errors.forEach(error => {
        fillTododefinenotification(error)
      })
    } else {
      AddTododefines(data, history)
    }
  }


}
