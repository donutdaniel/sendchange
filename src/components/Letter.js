import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Link, FormControlLabel, Switch } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";

const useStyles = makeStyles((theme) => ({
  body: {
    fontFamily: "inherit",
    margin: theme.spacing(0)
  },
  switch: {
    marginLeft: "auto",
    marginRight: 0,
  }
}));

const Letter = ({ title, officials, emails, subject, body, tags, url, toast }) => {
  const classes = useStyles();
  const [showNames, setShowNames] = React.useState(false)

  const autoFill = () => {
    
  }

  const sendMail = () => {
    const mailtoBody = body.replace(/\r?\n/g, "%0D%0A")
    return `mailto:${emails}?subject=${subject}&body=${mailtoBody}`
  }

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4">
          {title} 📍
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row" justify="space-between">
          <Typography variant="body1">
            <b>To: </b>
          </Typography>
          <FormControlLabel
            className={classes.switch}
            control={
              <Switch
                checked={showNames}
                onChange={() => {setShowNames((prev) => !(prev))}}
                name="showNames"
                color="primary"
                size="small"
              />
            }
            label="Names"
          />
        </Grid>
        <Typography variant="body1">
          {showNames ? officials : emails}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          <b>Subject: </b> 
          {subject}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          <b>
            Message:
          </b>
        </Typography>
        <Typography variant="body1">
          {body.split(/\r?\n/g).map((part, index) => {
            return (
              <span key={index}>
                {part}
                <br/>
              </span>
            )
          })}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Link href={sendMail()}>
          <Button size="large" fullWidth>
            Send 🚀
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <CopyToClipboard text={url}>
          <Button size="large" onClick={() => {toast("URL Copied to Clipboard", "success")}} fullWidth>
            Share 🌎
          </Button>
        </CopyToClipboard>
      </Grid>
    </Grid>
  );
};

export default Letter