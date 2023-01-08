import React from 'react'
import { connect } from 'react-redux'

export const Patients = (props) => {
  return (
    <div>Patients</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Patients)