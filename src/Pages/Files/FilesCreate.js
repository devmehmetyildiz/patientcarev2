import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Checkbox, Container, Divider, Form, Icon, Table } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn, Header } from 'semantic-ui-react'
import formToObject from 'form-to-object'
import Popup from '../../Utils/Popup'
import LoadingPage from '../../Utils/LoadingPage'
import jsonToFormData from 'json-form-data';

export class FilesCreate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedFiles: []
    }
  }

  render() {

    const { removeFilenotification, Files, isLoading, isDispatching } = this.props
    const { notifications, } = Files

    if (notifications && notifications.length > 0) {
      let msg = notifications[0]
      Popup(msg.type, msg.code, msg.description)
      removeFilenotification()
    }

    return (
      isLoading || isDispatching ? <LoadingPage /> :
        <div className='w-full h-[calc(100vh-59px-2rem)] mx-auto flex flex-col  justify-start items-center pb-[2rem] px-[2rem]'>
          <div className='w-full mx-auto align-middle'>
            <Header style={{ backgroundColor: 'transparent', border: 'none', color: '#3d3d3d' }} as='h1' attached='top' >
              <Breadcrumb size='big'>
                <Link to={"/Files"}>
                  <Breadcrumb.Section >Dosyalar</Breadcrumb.Section>
                </Link>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section>Oluştur</Breadcrumb.Section>
              </Breadcrumb>
            </Header>
          </div>
          <Divider className='w-full  h-[1px]' />
          <div className='w-full bg-white p-4 rounded-lg shadow-md outline outline-[1px] outline-gray-200 '>
            <Form onSubmit={this.handleSubmit}>
              <Table celled className='list-table' key='product-create-type-conversion-table' >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={3}>Dosya Adı</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Üst ID</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Kullanım Türü</Table.HeaderCell>
                    <Table.HeaderCell width={9}>Dosya</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.selectedFiles.map((file, index) => {
                    return <Table.Row key={index}>
                      <Table.Cell>
                        <Form.Input placeholder="Dosya Adı" name="name" fluid onChange={(e) => { this.selectedFilesChangeHandler(file.key, 'name', e.target.value) }} />
                      </Table.Cell>
                      <Table.Cell>
                        <Form.Input placeholder="Üst ID" name="parentid" fluid onChange={(e) => { this.selectedFilesChangeHandler(file.key, 'parentid', e.target.value) }} />
                      </Table.Cell>
                      <Table.Cell>
                        <Form.Input placeholder="Kullanım Türü" name="usagetype" fluid onChange={(e) => { this.selectedFilesChangeHandler(file.key, 'usagetype', e.target.value) }} />
                      </Table.Cell>
                      <Table.Cell>
                        <Form.Input placeholder="file" type='file' name="file" fluid onChange={(e) => { this.selectedFilesChangeHandler(file.key, 'file', e) }} />
                      </Table.Cell>
                    </Table.Row>
                  })}
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan='6'>
                      <Button type="button" color='green' className='addMoreButton' size='mini' onClick={() => { this.AddNewFile() }}>Dosya Ekle</Button>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
              <div className='flex flex-row w-full justify-between py-4  items-center'>
                <Link to="/Files">
                  <Button floated="left" color='grey'>Geri Dön</Button>
                </Link>
                <Button floated="right" type='submit' color='blue'>Kaydet</Button>
              </div>
            </Form>
          </div>
        </div>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { AddFiles, history, fillFilenotification } = this.props
    const files = this.state.selectedFiles

    files.forEach(data => {
      delete data.key
    });

    const formData = new FormData();
    files.forEach((data, index) => {
      Object.keys(data).forEach(element => {
        console.log('data: ', data);
        formData.append(`list[${index}].${element}`, data[element])
      });
    })

    let errors = []
    this.state.selectedFiles.forEach(data => {
      if (!data.name || data.name == '') {
        errors.push({ type: 'Error', code: 'Files', description: 'İsim Boş Olamaz' })
      }
    });
    if (errors.length > 0) {
      errors.forEach(error => {
        fillFilenotification(error)
      })
    } else {
      AddFiles(formData, history)
    }
  }

  AddNewFile = () => {
    this.setState({
      selectedFiles: [...this.state.selectedFiles,
      {
        id: 0,
        name: '',
        parentid: '',
        filename: '',
        filefolder: '',
        filepath: '',
        filetype: '',
        usagetype: '',
        canteditfile: false,
        file: {},
        key: Math.random(),
        concurrencyStamp: '',
        createdUser: '',
        updatedUser: '',
        deleteUser: '',
        isActive: true,
      }]
    })
  }

  selectedFilesChangeHandler = (key, property, value) => {
    let selectedFiles = this.state.selectedFiles
    const index = selectedFiles.findIndex(file => file.key === key)
    if (property === 'file') {
      if (value.target.files && value.target.files.length > 0) {
        selectedFiles[index][property] = value.target.files[0]
      }
    } else {
      selectedFiles[index][property] = value
    }
    this.setState({ selectedFiles: selectedFiles })
  }

}
export default withRouter(FilesCreate)
