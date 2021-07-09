import React from 'react'

import {Table} from 'react-bootstrap'

import './CSS/TablePage.scss'


const TablePage = () => {
    return (
        <>
            <div className="table_conatiner">
                <table>
                    <tr>
                        <th>Revenue</th>
                        <th>2021</th>
                        <th>2022</th>
                        <th>2023</th>
                    </tr>
                    <tr>
                        <td className="headingtd">Standered Monthly</td>
                        <td>
                            <td className="nesttd">$36,000.00</td>
                            <td className="nesttd">25%</td>
                        </td>
                        <td>
                            <td className="nesttd">$61,200.00</td>
                            <td className="nesttd">25%</td>
                        </td>
                        <td>
                            <td className="nesttd">$104,040.00</td>
                            <td className="nesttd">25%</td>
                        </td>
                    </tr>
                    <tr>
                    <td className="totalheading" >Total Revenue</td>
                        <td>
                            <td className="total">$36,000.00</td>
                            <td className="total">25%</td>
                        </td>
                        <td>
                            <td className="total">$61,200.00</td>
                            <td className="total">25%</td>
                        </td>
                        <td>
                            <td className="total">$104,040.00</td>
                            <td className="total">25%</td>
                        </td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default TablePage
