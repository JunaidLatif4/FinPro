import React from 'react'

import './CSS/TablePage.scss'


const TablePage = () => {

    const AccountData = [
        [
            ["StandardMonthly", [["36,000.00", "25"], ["61,200.00", "25"], ["104,040.00", "25"]]],
            ["Standardyearly", [["36,000.00", "25"], ["61,200.00", "25"], ["104,040.00", "25"]]],
            ["StartupMonthly", [["36,000.00", "25"], ["61,200.00", "25"], ["104,040.00", "25"]]],
            ["Startupyearly", [["36,000.00", "25"], ["61,200.00", "25"], ["104,040.00", "25"]]],
        ],
        [
            ["Sales", [["36,000.00", "25"], ["21,200.00", "25"], ["104,040.00", "11"]]],
            ["Markiting Hire", [["36,000.00", "25"], ["61,200.00", "40"], ["104,040.00", "25"]]],
            ["R & D", [["36,000.00", "25"], ["91,200.00", "25"], ["104,040.00", "25"]]],
            ["G & A", [["36,000.00", "25"], ["71,200.00", "25"], ["104,040.00", "99"]]],
        ],

    ]

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

                    {
                        AccountData[0].map((data, index) => {
                            return (
                                <>
                                    <tr>
                                        <td className="headingtd"> {data[0]} </td>
                                        {
                                            data[1].map((data, index) => {
                                                return (
                                                    <>
                                                        <td className="nesttd">
                                                            <td>${data[0]}</td>
                                                            <td>{data[1]}%</td>
                                                        </td>
                                                    </>
                                                )
                                            })
                                        }
                                    </tr>
                                </>
                            )
                        })
                    }

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
                    <br />
                    <tr>
                        <th>Expenses</th>
                        <th>2021</th>
                        <th>2022</th>
                        <th>2023</th>
                    </tr>

                    {
                        AccountData[1].map((data, index) => {
                            return (
                                <>
                                    <tr>
                                        <td className="headingtd"> {data[0]} </td>
                                        {
                                            data[1].map((data, index) => {
                                                return (
                                                    <>
                                                        <td className="nesttd">
                                                            <td>${data[0]}</td>
                                                            <td>{data[1]}%</td>
                                                        </td>
                                                    </>
                                                )
                                            })
                                        }
                                    </tr>
                                </>
                            )
                        })
                    }

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
                    <br />
                    <tr>
                        <th className="headingtd"> Operating Profit </th>
                        <th className="noborder">
                            <th> $36,000.00 </th>
                            <td className="nobold"> 100% </td>
                        </th>
                        <th className="noborder">
                            <th> $44,000.00 </th>
                            <td className="nobold"> 80% </td>
                        </th>
                        <th className="noborder">
                            <th> $99,000.00 </th>
                            <td className="nobold"> 10% </td>
                        </th>
                    </tr>
                    <br />
                    <tr>
                        <th className="headingtd"> EBIT </th>
                        <th className="noborder">
                            <th> $36,000.00 </th>
                            <td className="nobold"> 100% </td>
                        </th>
                        <th className="noborder">
                            <th> $44,000.00 </th>
                            <td className="nobold"> 80% </td>
                        </th>
                        <th className="noborder">
                            <th> $99,000.00 </th>
                            <td className="nobold"> 10% </td>
                        </th>
                    </tr>
                </table>
            </div>
        </>
    )
}


export default TablePage