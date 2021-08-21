import React, { useState, useEffect } from "react";
import axios from 'axios';

import { MoneyBox } from './ProgressComponents/MoneyBox'
import ProgressBar from './ProgressComponents/ProgressBar'
import InformationSection from './ProgressComponents/InformationSection'

import EqualizerIcon from '@material-ui/icons/Equalizer';
import TimelineIcon from '@material-ui/icons/Timeline';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Divider } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';

import { AuthContext } from '../context/context';

import "./CSS/ProgressPage.scss";

const ProgressPage = () => {

    const { state } = React.useContext(AuthContext);

    const [incomeState, setIncomeState] = useState(0)
    const [expensesState, setExpensesState] = useState(0)
    const [bankBalanceState, setBankBalanceState] = useState(0)

    const [revenuePercentileState, setRevenuePercentileState] = useState(0)
    const [spendingPercentileState, setSpendingPercentileState] = useState(0)
    const [cashBalancePercentileState, setCashBalancePercentileState] = useState(0)


    let incomes = 0;
    let expenses = 0;
    let bankBalance = 0;

    let allCompaniesRevenue = []
    let allCompaniesSpending = []
    let allCompaniesCashBalance = []

    const transectionAPI = () => {
        let url = 'http://localhost:8080/get_transections';

        axios.defaults.headers.common['authorization'] = `${localStorage.getItem('finProtoken')}`;
        axios
            .post(url, { access_token: state.access_token })
            .then((res) => {
                console.log("TRANSACTION RECEIVED ===== " , res)
                calculations(res.data.data.plaid_data.transactions, res.data.data.plaid_data.accounts)
                companiesAPI()
            })
            .catch((err) => {
                console.log("Failed to Received Transection Data ===== ", err)
            })
    }

    const companiesAPI = () => {
        let url = "http://localhost:8080/companies"

        axios.defaults.headers.common['authorization'] = `${localStorage.getItem('finProtoken')}`;
        axios
            .get(url).then((res) => {
                console.log("RES FROM GETTING COMPANIES ======= " , res)
                percentileCalculations(res.data.companies)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(async () => {
        transectionAPI()
    }, [])

    const calculations = (transections, bankAccount) => {

        console.log("TRANSECTIOS ==== " , transections)
        console.log("BankAccount ==== " , bankAccount)

        if (transections != null) {
            transections.map((data, index) => {
                if (data.amount > 0) {
                    incomes += data.amount
                } else {
                    expenses += data.amount
                }
            })
        }
        if (bankAccount != null) {
            bankAccount.map((data, index) => {
                bankBalance += data.balances.available
            })
        }

        setIncomeState(incomes)
        setExpensesState(expenses)
        setBankBalanceState(bankBalance)
    }

    const percentileCalculations = (allCompanies) => {

        console.log("ALL COMPANIES ========= ",  allCompanies)

        if (allCompanies != null) {
            allCompanies.map((company) => {
                let oneCompanyRavenue = 0;
                let oneCompanyExpenses = 0;
                let oneCompanyCashBalance = 0;
                company.plaid_data?.transactions.map((transection) => {
                    if (transection.amount > 0) {
                        oneCompanyRavenue += transection.amount
                    }
                    if (transection.amount < 0) {
                        oneCompanyExpenses += transection.amount
                    }
                })
                company.plaid_data?.accounts.map((balance) => {
                    oneCompanyCashBalance += balance.balances.available
                })
                allCompaniesRevenue.push(oneCompanyRavenue)
                allCompaniesSpending.push(oneCompanyExpenses)
                allCompaniesCashBalance.push(oneCompanyCashBalance)
            })
        }

        const percentile = (arr, val) =>
            (100 *
                arr.reduce(
                    (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
                    0
                )) /
            arr.length;

        let RevenuePercentile = percentile(allCompaniesRevenue, incomes)
        let SpendingPercentile = percentile(allCompaniesSpending, expenses)
        let CashBalancePercentile = percentile(allCompaniesCashBalance, bankBalance)

        setRevenuePercentileState(Math.round(RevenuePercentile))
        setSpendingPercentileState(Math.round(SpendingPercentile))
        setCashBalancePercentileState(Math.round(CashBalancePercentile))
    }




    const MoneyBoxData = [
        {
            title: "REVENUE TO DATE",
            money: incomeState.toFixed(3),
            percent: "+10.19",
            icon: EqualizerIcon
        },
        {
            title: "SPENDING TO DATE",
            money: Math.abs(expensesState).toFixed(3),
            percent: "-4.29",
            icon: TimelineIcon
        },
        {
            title: "BANK BALANCE",
            money: bankBalanceState.toFixed(3),
            percent: "+9.30",
            icon: AttachMoneyIcon
        },
    ]

    const ProgressBarData = [
        {
            companyName: 'Finpro',
            title: "Revenue",
            progress: revenuePercentileState,
            industry: 'Finance',
            content: function () { return (` ${this.companyName} revenue is in the ${this.progress} percentile of ${this.industry} companies `) }
        },
        {
            companyName: 'Finpro',
            title: "Spending",
            progress: spendingPercentileState,
            industry: 'Finance',
            content: function () { return (` ${this.companyName} marketing spend is in the ${this.progress} percentile of ${this.industry} teams. `) }
        },
        {
            companyName: 'Finpro',
            title: "Cash Balance",
            progress: cashBalancePercentileState,
            industry: 'Finance',
            content: function () { return (` ${this.companyName} sales spend is in the ${this.progress} percentile of ${this.industry} teams. `) }
        },
    ]

    return (
        <>
            <div className="progresspage_container">
                {
                    incomeState == 0 ?
                        <>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh", color: "#58d99b" }}>
                                <CircularProgress color="inherit" size="5rem" />
                            </div>
                        </>
                        :
                        <>
                            <div className="moneystatus">
                                {
                                    MoneyBoxData.map((data, index) => {
                                        return (
                                            <>
                                                <MoneyBox key={index} props={data} />

                                            </>
                                        )
                                    })
                                }
                            </div>
                            <div className="progresschart">
                                <h3>
                                    How FinPro Compares
                                </h3>
                                <Divider />
                                <div className="progressbar">

                                    {
                                        ProgressBarData.map((data, index) => {
                                            return (
                                                <>
                                                    <ProgressBar props={data} />
                                                </>
                                            )
                                        })
                                    }
                                </div>
                                <div className="information">
                                    <h3> Benchmark Information <InfoOutlinedIcon /> </h3>
                                    <Divider />
                                    <InformationSection />
                                </div>

                            </div>

                        </>
                }
            </div>
        </>
    );
};



export default ProgressPage;