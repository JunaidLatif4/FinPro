import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlaidLink } from "react-plaid-link";

import { Button, makeStyles } from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import CircularProgress from '@material-ui/core/CircularProgress';

import "./CSS/IntegrationsStep3.scss";

const Styles = makeStyles({
    btn: {
        backgroundColor: "#5ac2de",
        fontSize: "1rem",
    },
});

const getAccessToken = async (public_token, data) => {
    console.log("The PublicToken ========= ", public_token);
    console.log("The PublicToken's DATA ========= ", data);

    let url = "http://localhost:8080/get_access_token";

    axios
        .post(url, { public_token: public_token })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log("Something Went Wrong CREATE LINK TOKEN == ", err);
        });
};

const IntegrationsStep3 = () => {
    const classes = Styles();
    const [link_token, setLinkToken] = useState(null);

    useEffect(() => {
        let url = "http://localhost:8080/create_link_token";

        axios
            .post(url)
            .then((res) => {
                console.log(res.data.link_token);
                setLinkToken(res.data.link_token)
            })
            .catch((err) => {
                console.log("SomeThing went wrong CREATING LINK TOKEN === ", err);
            });
    }, []);

    return (
        <>
            <div className="integrationsstep3_container">
                <h2> Sync your company finances </h2>
                <div className="integration_btn">
                    {
                        link_token == null ?
                            <> <CircularProgress color="inherit" />  </> :
                            <>
                                <Button variant="outlined" className={classes.btn} endIcon={<ArrowRightIcon />}>
                                    <PlaidLink
                                        style={{ backgroundColor: "inherit", border: "none" }}
                                        token={link_token}
                                        onSuccess={(public_token, data) => {
                                            getAccessToken(public_token, data);
                                        }}
                                    >
                                        Connect Bank Account
                                    </PlaidLink>
                                </Button>
                            </>
                    }

                </div>
            </div>
        </>
    );
};

export default IntegrationsStep3;
