import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Checkbox, Container, Divider, Dropdown, Form, FormGroup, Icon, Popup } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn, Header } from 'semantic-ui-react'
import formToObject from 'form-to-object'
import Popuputil from '../../Utils/Popup'
import LoadingPage from '../../Utils/LoadingPage'

export default class PatientdefinesEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedpatienttype: "",
      selectedcostumertype: "",
      selectedMotherstatus: false,
      selectedFatherstatus: false,
      selectedGenderstatus: "",
      selectedFatheralaffinity: "",
      selectedMotheralaffinity: "",
    }
  }

  componentDidMount() {
    const { GetPatientdefine, match, history, GetCostumertypes, GetPatienttypes } = this.props
    if (match.params.PatientdefineID) {
      GetPatientdefine(match.params.PatientdefineID)
      GetCostumertypes()
      GetPatienttypes()
    } else {
      history.push("/Patientdefines")
    }
  }

  componentDidUpdate() {
    const { Patientdefines, Costumertypes, Patienttypes } = this.props
    const { selected_record, isLoading } = Patientdefines
    if (selected_record && Object.keys(selected_record).length > 0 && selected_record.id != 0 && Costumertypes.list.length > 0 && !Costumertypes.isLoading && Patienttypes.list.length > 0 && !Patienttypes.isLoading && !isLoading && !this.state.isDatafetched) {
      this.setState({
        selectedpatienttype: selected_record.patienttypeid,
        selectedcostumertype: selected_record.costumertypeid,
        selectedMotherstatus: selected_record.ismotheralive,
        selectedFatherstatus: selected_record.isfatheralive,
        selectedGenderstatus: selected_record.gender,
        selectedFatheralaffinity: selected_record.fatherbiologicalaffinity,
        selectedMotheralaffinity: selected_record.motherbiologicalaffinity,
        isDatafetched: true
      })
    }
  }

  render() {
    const { Costumertypes, Patienttypes, Patientdefines, removeCostumertypenotification, removePatienttypenotification, removePatientdefinenotification } = this.props
    const { selected_record } = Patientdefines
    if (Costumertypes.notifications && Costumertypes.notifications.length > 0) {
      let msg = Costumertypes.notifications[0]
      Popuputil(msg.type, msg.code, msg.description)
      removeCostumertypenotification()
    }
    if (Patienttypes.notifications && Patienttypes.notifications.length > 0) {
      let msg = Patienttypes.notifications[0]
      Popuputil(msg.type, msg.code, msg.description)
      removePatienttypenotification()
    }
    if (Patientdefines.notifications && Patientdefines.notifications.length > 0) {
      let msg = Patientdefines.notifications[0]
      Popuputil(msg.type, msg.code, msg.description)
      removePatientdefinenotification()
    }

    const Costumertypeoptions = Costumertypes.list.map(costumertype => {
      return { key: costumertype.concurrencyStamp, text: costumertype.name, value: costumertype.concurrencyStamp }
    })

    const Patienttypeoptions = Patienttypes.list.map(patienttype => {
      return { key: patienttype.concurrencyStamp, text: patienttype.name, value: patienttype.concurrencyStamp }
    })

    const Liveoptions = [
      { key: 0, text: 'HAYIR YA??AMIYOR', value: false },
      { key: 1, text: 'EVET YA??IYOR', value: true }
    ]
    const Genderoptions = [
      { key: 0, text: 'ERKEK', value: "ERKEK" },
      { key: 1, text: 'KADIN', value: "KADIN" }
    ]
    const Affinityoptions = [
      { key: 0, text: '??Z', value: "??Z" },
      { key: 1, text: '??VEY', value: "??VEY" }
    ]

    return (
      Patientdefines.isLoading || Patientdefines.isDispatching || Patienttypes.isLoading
        || Patienttypes.isDispatching || Costumertypes.isLoading || Costumertypes.isDispatching ? <LoadingPage /> :
        <div className='w-full h-[calc(100vh-59px-2rem)] mx-auto flex flex-col  justify-start items-center pb-[2rem] px-[2rem]'>
          <div className='w-full mx-auto align-middle'>
            <Header style={{ backgroundColor: 'transparent', border: 'none', color: '#3d3d3d' }} as='h1' attached='top' >
              <Breadcrumb size='big'>
                <Link to={"/Patientdefines"}>
                  <Breadcrumb.Section >Hasta Tan??mlar??</Breadcrumb.Section>
                </Link>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section>Olu??tur</Breadcrumb.Section>
              </Breadcrumb>
            </Header>
          </div>
          <Divider className='w-full  h-[1px]' />
          <div className='w-full bg-white p-4 rounded-lg shadow-md outline outline-[1px] outline-gray-200 '>
            <Form className='' onSubmit={this.handleSubmit}>
              <Form.Group widths='equal'>
                <Form.Input defaultValue={selected_record.firstname} label="Hasta Ad??" placeholder="Hasta Ad??" name="firstname" fluid />
                <Form.Input defaultValue={selected_record.lastname} label="Hasta Soyad??" placeholder="Hasta Soyad??" name="lastname" fluid />
                <Form.Input defaultValue={selected_record.fathername} label="Baba Ad??" placeholder="Baba Ad??" name="fathername" fluid />
                <Form.Input defaultValue={selected_record.mothername} label="Anne Ad??" placeholder="Anne Ad??" name="mothername" fluid />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label className='text-[#000000de]'>Anne Yak??nl??k Durumu</label>
                  <Dropdown value={this.state.selectedMotheralaffinity} placeholder='Anne Yak??nl??k Durumu' fluid selection options={Affinityoptions} onChange={(e, { value }) => { this.setState({ selectedMotheralaffinity: value }) }} />
                </Form.Field>
                <Form.Field>
                  <label className='text-[#000000de]'>Baba Yak??nl??k Durumu</label>
                  <Dropdown value={this.state.selectedFatheralaffinity} placeholder='Baba Yak??nl??k Durumu' fluid selection options={Affinityoptions} onChange={(e, { value }) => { this.setState({ selectedFatheralaffinity: value }) }} />
                </Form.Field>
                <Form.Field>
                  <label className='text-[#000000de]'>Anne Ya????yor mu?</label>
                  <Dropdown value={this.state.selectedFatherstatus} placeholder='Anne Ya????yor mu' fluid selection options={Liveoptions} onChange={(e, { value }) => { this.setState({ selectedMotherstatus: value }) }} />
                </Form.Field>
                <Form.Field>
                  <label className='text-[#000000de]'>Baba Ya????yor mu?</label>
                  <Dropdown value={this.state.selectedMotherstatus} placeholder='Baba Ya????yor mu' fluid selection options={Liveoptions} onChange={(e, { value }) => { this.setState({ selectedFatherstatus: value }) }} />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input defaultValue={selected_record.countryID} label="TC Kimlik No" placeholder="TC Kimlik No" name="countryID" fluid />
                <Form.Input defaultValue={selected_record.dateofbirth && selected_record.dateofbirth.split('T')[0]} label="Do??um Tarihi" placeholder="Do??um Tarihi" name="dateofbirth" type='date' fluid />
                <Form.Input defaultValue={selected_record.placeofbirth} label="Do??um Yeri" placeholder="Do??um Yeri" name="placeofbirth" fluid />
                <Form.Input defaultValue={selected_record.dateofdeath && selected_record.dateofdeath.split('T')[0]} label="??l??m Tarihi" placeholder="??l??m Tarihi" name="dateofdeath" type='date' fluid />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input defaultValue={selected_record.placeofdeath} label="??l??m Yeri" placeholder="??l??m Yeri" name="placeofdeath" fluid />
                <Form.Input defaultValue={selected_record.deathinfo} label="??l??m Sebebi" placeholder="??l??m Sebebi" name="deathinfo" fluid />
                <Form.Field>
                  <label className='text-[#000000de]'>Cinsiyet</label>
                  <Dropdown value={this.state.selectedGenderstatus} placeholder='Cinsiyet' fluid selection options={Genderoptions} onChange={(e, { value }) => { this.setState({ selectedGenderstatus: value }) }} />
                </Form.Field>
                <Form.Input defaultValue={selected_record.marialstatus} label="Karde?? Durumu" placeholder="Karde?? Durumu" name="marialstatus" fluid />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input defaultValue={selected_record.childnumber} label="??ocuk Say??s??" placeholder="??ocuk Say??s??" name="childnumber" type='number' fluid />
                <Form.Input defaultValue={selected_record.disabledchildnumber} label="Engelli ??ocuk Say??s??" placeholder="Engelli ??ocuk Say??s??" name="disabledchildnumber" type='number' fluid />
                <Form.Input defaultValue={selected_record.siblingstatus} label="Karde?? Durumu" placeholder="Karde?? Durumu" name="siblingstatus" fluid />
                <Form.Input defaultValue={selected_record.sgkstatus} label="Sgk Durumu" placeholder="Sgk Durumu" name="sgkstatus" fluid />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input defaultValue={selected_record.budgetstatus} label="Maa?? Durumu" placeholder="Maa?? Durumu" name="budgetstatus" fluid />
                <Form.Input defaultValue={selected_record.city} label="Kay??tl?? ??ehir" placeholder="Kay??tl?? ??ehir" name="city" fluid />
                <Form.Input defaultValue={selected_record.town} label="Kay??tl?? ??l??e" placeholder="Kay??tl?? ??l??e" name="town" fluid />
                <Form.Input defaultValue={selected_record.address1} label="Tan??ml?? Adres 1" placeholder="Tan??ml?? Adres 1" name="address1" fluid />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input defaultValue={selected_record.address2} label="Tan??ml?? Adres 2" placeholder="Tan??ml?? Adres 2" name="address2" fluid />
                <Form.Input defaultValue={selected_record.country} label="Kay??tl?? ??lke" placeholder="Kay??tl?? ??lke" name="country" fluid />
                <Form.Input defaultValue={selected_record.contactnumber1} label="??leti??im No 1" placeholder="??leti??im No 1" name="contactnumber1" fluid />
                <Form.Input defaultValue={selected_record.contactnumber2} label="??leti??im No 2" placeholder="??leti??im No 2" name="contactnumber2" fluid />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input defaultValue={selected_record.contactname1} label="??leti??im Ki??i 1" placeholder="??leti??im Ki??i 1" name="contactname1" fluid />
                <Form.Input defaultValue={selected_record.contactname2} label="??leti??im Ki??i 2" placeholder="??leti??im Ki??i 2" name="contactname2" fluid />
                <Form.Field>
                  <label className='text-[#000000de]'>M????teri T??r??</label>
                  <Dropdown value={this.state.selectedcostumertype} placeholder='M????teri T??r??' fluid selection options={Costumertypeoptions} onChange={(e, { value }) => { this.setState({ selectedcostumertype: value }) }} />
                </Form.Field>
                <Form.Field>
                  <label className='text-[#000000de]'>Hasta T??r??</label>
                  <Dropdown value={this.state.selectedpatienttype} placeholder='Hasta T??r??' fluid selection options={Patienttypeoptions} onChange={(e, { value }) => { this.setState({ selectedpatienttype: value }) }} />
                </Form.Field>
              </Form.Group>
              <div className='flex flex-row w-full justify-between py-4  items-center'>
                <Link to="/Patientdefines">
                  <Button floated="left" color='grey'>Geri D??n</Button>
                </Link>
                <Button floated="right" type='submit' color='blue'>G??ncelle</Button>
              </div>
            </Form>
          </div>
        </div>
    )
  }


  handleSubmit = (e) => {
    e.preventDefault()
    const { EditPatientdefines, history, fillPatientdefinenotification, Patientdefines } = this.props
    const data = formToObject(e.target)
    data.patienttypeid = this.state.selectedpatienttype
    console.log('this.state.selectedpatienttype: ', this.state.selectedpatienttype);
    console.log('data.patienttypeid: ', data.patienttypeid);
    data.costumertypeid = this.state.selectedcostumertype
    data.ismotheralive = this.state.selectedMotherstatus
    data.isfatheralive = this.state.selectedFatherstatus
    data.gender = this.state.selectedGenderstatus
    data.motherbiologicalaffinity = this.state.selectedMotheralaffinity
    data.fatherbiologicalaffinity = this.state.selectedFatheralaffinity



    if (!data.dateofbirth || data.dateofbirth == '') {
      data.dateofbirth = null
    }
    if (!data.dateofdeath || data.dateofdeath == '') {
      data.dateofdeath = null
    }
    if (!data.childnumber || data.childnumber == '') {
      data.childnumber = 0
    }
    if (!data.disabledchildnumber || data.disabledchildnumber == '') {
      data.disabledchildnumber = 0
    }

    let errors = []
    if (!data.firstname || data.firstname == '') {
      errors.push({ type: 'Error', code: 'Hasta Tan??mlar??', description: '??sim Bo?? Olamaz' })
    }
    if (!data.lastname || data.lastname == '') {
      errors.push({ type: 'Error', code: 'Hasta Tan??mlar??', description: 'Soyisim Bo?? Olamaz' })
    }
    if (errors.length > 0) {
      errors.forEach(error => {
        fillPatientdefinenotification(error)
      })
    } else {
      console.log('data: ', data);
      EditPatientdefines({ ...Patientdefines.selected_record, ...data }, history)
    }
  }
}