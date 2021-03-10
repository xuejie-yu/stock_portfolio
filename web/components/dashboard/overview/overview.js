import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const MY_IMAGE = "/img.png";

export default function Overview (props) {
  const { portfolio, isLoading } = props;
  return (
    <div>
      <div className="section">
        <Grid container>
          <Grid item xs={3}>
            <img className="myImage" src={MY_IMAGE}></img>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="overviewCard">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Investment
                </Typography>
                { isLoading ? 
                (<div className="text-align-center">
                  <CircularProgress></CircularProgress>
                </div>) :
                (<Typography variant="h3" component="h3" className="center">
                  {portfolio.totalInvestment || 0}
                </Typography>)}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="overviewCard">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Gain
                </Typography>
                { isLoading ? 
                  (<div className="text-align-center">
                    <CircularProgress></CircularProgress>
                  </div>) :
                  (<div>
                    <Typography variant="h3" component="h3" className={`center ${portfolio.totalGain > 0 ? "positive" : "negative"}`}>
                      {portfolio.totalGain || 0}
                    </Typography>
                    { portfolio.totalGain !== undefined && portfolio.totalGain > 0 && portfolio.totalInvestment > 0 &&
                      <Typography variant="h6" component="h3" className={`center ${portfolio.totalGain > 0 ? "positive" : "negative"}`}>
                        ({(portfolio.totalGain / portfolio.totalInvestment * 100).toFixed(2) + "%"})
                      </Typography>
                    }
                  </div>)
                }
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="overviewCard">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Todays&#39; Gain
                </Typography>
                { isLoading ? 
                  (<div className="text-align-center">
                    <CircularProgress></CircularProgress>
                  </div>) :
                  (<div>
                    <Typography variant="h3" component="h3" className={`center ${portfolio.todayGain > 0 ? "positive" : "negative"}`}>
                      {portfolio.todayGain || 0}
                    </Typography>
                    { portfolio.todayGain !== undefined && portfolio.todayGain > 0 && portfolio.totalInvestment > 0 && 
                      <Typography variant="h6" component="h3" className={`center ${portfolio.todayGain > 0 ? "positive" : "negative"}`}>
                        ({(portfolio.todayGain / portfolio.totalInvestment * 100).toFixed(2) + "%"})
                      </Typography>
                    }
                  </div>)
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
  isLoading: PropTypes.bool
};