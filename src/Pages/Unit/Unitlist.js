import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { GetAllUnits } from '../../Redux/Actions/UnitActions'

export const Unitlist = (props) => {

    useEffect(() => {
        props.GetAllUnits()
    }, [])

    return (
        <div>Unitlist</div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    GetAllUnits
}

export default connect(mapStateToProps, mapDispatchToProps)(Unitlist)