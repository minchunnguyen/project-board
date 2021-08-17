import { Avatar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import { FormattedMessage } from "react-intl";
import Layout from "../components/shared/Layout";
import { withAuthSync } from "../utils/auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
    },
    avatar: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(2),
      },
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      left: 18,
    },
    content: {
      textAlign: "justify",
    },
    name: {
      placeItems: "center",
    },
    avatar1: {
      borderRadius: "36%",
      margin: "16px auto",
      fontSize: 72,
      textTransform: "uppercase",
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
);

const MyMapComponent = withScriptjs(
  withGoogleMap((props: any) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 10.797384, lng: 106.673357 }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: 10.797384, lng: 106.673357 }} />
      )}
    </GoogleMap>
  ))
);

const AboutPage = () => {
  const classes = useStyles();
  return (
    <Layout title="About Us">
      <h1>
        <FormattedMessage id="sidebar.aboutUs" defaultMessage="About Us" />
      </h1>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <img
                className="imgholder"
                src="/static/logo.png"
                alt=""
              />
            </Grid>
            <Grid item xs={8}>
              <p className={classes.content}>
                Capgemini is a global leader in consulting, digital
                transformation, technology and engineering services. The Group
                is at the forefront of innovation to address the entire breadth
                of clients’ opportunities in the evolving world of cloud,
                digital and platforms.
              </p>
              <p className={classes.content}>
                Building on its strong 50-year+ heritage and deep
                industry-specific expertise, Capgemini enables organizations to
                realize their business ambitions through an array of services
                from strategy to operations. Capgemini is driven by the
                conviction that the business value of technology comes from and
                through people.
              </p>
              <p className={classes.content}>
                Today, it is a multicultural company of 270,000 team members in
                almost 50 countries. With Altran, the Group reported 2019
                combined revenues of €17billion.
              </p>
              <p className={classes.content}>
                Visit us at{" "}
                <a href="https://www.capgemini.com">
                  https://www.capgemini.com
                </a>
                . &nbsp;
                <b>People matter, results count.</b>
              </p>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <h2>Team Members</h2>
          <Grid item xs={12}>
            <div className={classes.avatar}>
              <figure>
                <Avatar className={classes.large} src="/static/ava1.jpg" />
                <figcaption>
                  <p>Nhan NGUYEN</p>
                </figcaption>
              </figure>
              <figure>
                <Avatar className={classes.large} src="/static/ava2.png" />
                <figcaption>
                  <p>Trung NGUYEN</p>
                </figcaption>
              </figure>
              <figure>
                <Avatar className={classes.large} src="/static/ava3.jpg" />
                <figcaption>
                  <p>&nbsp;Hien NGUYEN</p>
                </figcaption>
              </figure>
              <figure>
                <Avatar className={classes.large} src="/static/ava4.jpg" />
                <figcaption>
                  <p>&emsp;Tien TRAN</p>
                </figcaption>
              </figure>
              <figure>
                <Avatar className={classes.large} src="/static/ava5.jpg" />
                <figcaption>
                  <p>&nbsp;Hung HUYNH</p>
                </figcaption>
              </figure>
              <figure>
                <Avatar className={classes.large} src="/static/ava6.png" />
                <figcaption>
                  <p>&nbsp;Tam NGUYEN</p>
                </figcaption>
              </figure>
              <figure>
              <Avatar className={classes.large} src="/static/ava7.png" />
                <figcaption>
                  <p>&ensp;&nbsp;Kien PHAM</p>
                </figcaption>
              </figure>
              <figure>
              <Avatar className={classes.large} src="/static/ava8.jpg" />
                <figcaption>
                  <p>&ensp;&nbsp;Thu PHAN</p>
                </figcaption>
              </figure>
            </div>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid item xs={12}>
            <section>
              <h2>Contact Us</h2>
              <ul>
                <li>
                  <b>Address:</b> 2nd Floor - 106 Nguyen Van Troi Street, Phu
                  Nhuan District, Ho Chi Minh City, Viet Nam
                </li>
                <li>
                  <b>Website:</b> https://www.capgemini.com/
                </li>
                <li>
                  <b>Phone Number:</b> 028 3997 8100
                </li>
                <li>
                  <b>Fax: </b>capgemini-trainingreactjs.com
                </li>
              </ul>
              <MyMapComponent
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfNljaG3CMQf-7rqU9w1GZE6LcR_7gJPk&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `1000%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                isMarkerShown={true}
              />
            </section>
          </Grid>
        </Paper>
      </div>
    </Layout>
  );
};

export default withAuthSync(AboutPage);
