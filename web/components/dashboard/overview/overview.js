import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const MY_IMAGE = "/img.png";

export default function Overview (props) {
  const { portfolio } = props;
  return (
    <div>
      <div className="section">
        <Grid container>
          <Grid item xs={3}>
            <img className="myImage" src={MY_IMAGE}></img>
          </Grid>
          <Grid item xs={3}>
            <Card className="overviewCard">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Investment
                </Typography>
                <Typography variant="h3" component="h3" className="center">
                  {portfolio.totalInvestment || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className="overviewCard">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Gain
                </Typography>
                <Typography variant="h3" component="h3" className={`center ${portfolio.totalGain > 0 ? "positive" : "negative"}`}>
                  {portfolio.totalGain || 0}
                </Typography>
                { portfolio.totalGain !== undefined && 
                  <Typography variant="h6" component="h3" className={`center ${portfolio.totalGain > 0 ? "positive" : "negative"}`}>
                    ({(portfolio.totalGain / portfolio.totalInvestment * 100).toFixed(2) + "%"})
                  </Typography>
                }
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className="overviewCard">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Todays&#39; Gain
                </Typography>
                <Typography variant="h3" component="h3" className={`center ${portfolio.todayGain > 0 ? "positive" : "negative"}`}>
                  {portfolio.todayGain || 0}
                </Typography>
                { portfolio.todayGain !== undefined &&
                  <Typography variant="h6" component="h3" className={`center ${portfolio.todayGain > 0 ? "positive" : "negative"}`}>
                    ({(portfolio.todayGain / portfolio.totalInvestment * 100).toFixed(2) + "%"})
                  </Typography>
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

Overview.propTypes = {
  portfolio: PropTypes.any,
};