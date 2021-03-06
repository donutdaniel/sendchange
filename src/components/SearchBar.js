import Router from "next/router"

import { makeStyles } from "@material-ui/core/styles";
import { Search, MyLocation } from "@material-ui/icons";
import { Grid, FormControl, FormHelperText, TextField, InputAdornment, IconButton, CircularProgress } from "@material-ui/core";

import { findLocation } from "../util/util";

const useStyles = makeStyles((theme) => ({
  searchbar: {
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  input: {
    [`& fieldset`]: {
      borderRadius: 20,
    },
    minWidth: "300px"
  },
  loadingCircle: {
    paddingTop: theme.spacing(2)
  }
}));

const SearchBar = (props) => {
  const classes = useStyles();
  const [address, setAddress] = React.useState(props.address ? props.address : "");
  const [searching, setSearching] = React.useState(false);
  const toast = props.toast;

  const handleChange = (query) => {
    setAddress(query)
  }

  const handleSearch = () => {
    setSearching(true)
    Router.push({
      pathname: "/search",
      query: { address: address },
    })
    setSearching(false)
  }

  const handleLocateUser = async () => {
    setSearching(true)
    try {
      const address = await findLocation();
      setAddress(address)
      Router.push({
        pathname: "/search",
        query: { address: address },
      });
    } catch (error) {
      toast(error.message, "error")
    } finally {
      setSearching(false)
    };
  };
  
  return (
    <Grid container
      className={classes.searchbar} 
      direction="column" 
      justify="center" 
      alignItems="center"
    >
      <Grid item xs={12}>
        <FormControl variant="outlined">
          <TextField
            id="search-input"
            className={classes.input}
            variant="outlined"
            placeholder="San Francisco, Los Angeles, New York, ..."
            value={address}
            onChange={(event) => handleChange(event.target.value)}
            onKeyPress={(event) => {
              if (event.key==="Enter") {
                handleSearch();
                event.preventDefault();
              };
            }}
            InputProps={{
              endAdornment: 
                <InputAdornment position="end">
                  <IconButton
                    aria-label="search"
                    onClick={handleSearch}
                    edge="end"
                  >
                    <Search/>
                  </IconButton>
                  <IconButton
                    aria-label="locate-user"
                    onClick={handleLocateUser}
                    edge="end"
                  >
                    <MyLocation/>
                  </IconButton>
                </InputAdornment>
            }}
          />
          <FormHelperText id="search-helper-text">Find with City, County, or Zip Code</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.loadingCircle}>
          {searching ? <CircularProgress/> : <div></div>}
        </div>
      </Grid>
    </Grid>
  )
}

export default SearchBar;