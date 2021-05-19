import React, { Component } from 'react'
import Column from '../components/Column'
import Row from '../components/Row'

export default class Confirmation extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Column size={12} >
                       <div className="text-center">
                       <h1 className="text-success fw-bolder">Order Is Confirmed</h1>
                       </div>
                    </Column>
                </Row>
            </div>
        )
    }
}
