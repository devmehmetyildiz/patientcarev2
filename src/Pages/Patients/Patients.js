import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Accordion, Breadcrumb, Button, Card, Divider, Grid, GridColumn, GridRow, Header, Icon, Image, Segment, Transition } from 'semantic-ui-react'
import LoadingPage from '../../Utils/LoadingPage'
import NoDataScreen from '../../Utils/NoDataScreen'
import Notification from "../../Utils/Notification"
//TODO: animate css import edeceksin unutma yorumda suan 
//npm install animate.css
import 'animate.css/animate.min.css';

export default class Patients extends Component {
  constructor(props) {
    super(props)
    this.state = { activeIndex: [] }
  }

  componentDidMount() {
    const { GetPatients } = this.props
    GetPatients()
  }

  componentDidUpdate() {
    const { Patients, removePatientnotification } = this.props
    Notification(Patients.notifications, removePatientnotification)
  }

  render() {
    const { Patients } = this.props
    const { list, isLoading, isDispatching } = Patients
    const { activeIndex } = this.state



    const floorList = [...new Set(list.map(item => { return item.floornumber }))]

    return (
      isLoading || isDispatching ? <LoadingPage /> :
        <React.Fragment>
          <div className='w-full h-[calc(100vh-59px-2rem)] mx-auto flex flex-col  justify-start items-center pb-[2rem] px-[2rem]'>
            <div className='w-full mx-auto align-middle'>
              <Header style={{ backgroundColor: 'transparent', border: 'none' }} as='h1' attached='top' >
                <Grid columns='2' >
                  <GridColumn width={8} className="">
                    <Breadcrumb size='big'>
                      <Link to={"/Patients"}>
                        <Breadcrumb.Section>Kurumdaki Hastalar</Breadcrumb.Section>
                      </Link>
                    </Breadcrumb>
                  </GridColumn>
                </Grid>
              </Header>
            </div>
            <Divider className='w-full  h-[1px]' />
            <Segment className='w-full overflow-y-auto max-h-[calc(100vh-2.2rem)]'>
              {list.length > 0 ?
                <div className='w-full mx-auto '>
                  <Accordion
                    className='transition-all ease-in-out duration-500'
                    styled
                    fluid
                  >
                    {floorList.map((floor, index) => {
                      return <React.Fragment key={index}>
                        <Accordion.Title
                          active={activeIndex.includes(index)}
                          index={index}
                          onClick={this.handleClick}>
                          <Icon name='dropdown' />
                          {`${floor}.Kat`}
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex.includes(index)}>
                          <Transition visible={activeIndex.includes(index)} animation='slide left' duration={500}>
                            <Grid stackable divided fluid>
                              {list.filter(u => u.floornumber === floor).map(patient => {
                                return <Grid.Column mobile={9} tablet={6} computer={3}>
                                  <Card>
                                    <Card.Content>
                                      <Image
                                        floated='right'
                                        size='mini'
                                        src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                      />
                                      <Card.Header>{`${patient?.patientdefine?.firstname} ${patient?.patientdefine?.lastname}`}</Card.Header>
                                      <Card.Meta>{`${patient?.patientdefine?.costumertype?.name}`}</Card.Meta>
                                      <Card.Meta>{`Oda no:${patient?.roomnumber}  Yatak no:${patient?.bednumber}`}</Card.Meta>
                                      <Card.Description>
                                        <Grid>
                                          <GridRow>
                                            <div className='ml-2'>
                                              <Icon name='bell' />
                                            </div>
                                          </GridRow>

                                        </Grid>
                                      </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                      <div className='ui two buttons'>
                                        <Button basic color='green'>
                                          İlaç Ver
                                        </Button>
                                        <Button basic color='red'>
                                          İlaç Al
                                        </Button>
                                      </div>
                                    </Card.Content>
                                  </Card>
                                </Grid.Column>
                              })}
                            </Grid>
                          </Transition>
                        </Accordion.Content>
                      </React.Fragment>
                    })}
                  </Accordion>
                </div> : <NoDataScreen message="Kurumda Hasta Yok" />
              }
            </Segment>
          </div>
        </React.Fragment >
    )
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const items = [...this.state.activeIndex]
    if (items.includes(index)) {
      const x = items.filter(item => item !== index);
      this.setState({ activeIndex: x })
    } else {
      items.push(index)
      this.setState({ activeIndex: items })
    }
  }
}
