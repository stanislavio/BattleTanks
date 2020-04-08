import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { setLogout } from "../../actions/login";
import { connect } from "react-redux";
import "./header.css";

const StyledAppBar = withStyles({
  colorPrimary: {
    background:
      "linear-gradient(90deg, rgba(30, 139, 195, 0.2), rgba(255,192,203,0.2))",
  },
})(AppBar);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const RenderProfileMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const signOut = () => {
    handleClose();
    props.signOut();
    localStorage.clear();
  };

  return (
    <div>
      <IconButton onClick={(event) => handleMenu(event)} color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={() => handleClose()}
      >
        {props.user && props.user.id !== null ? (
          <React.Fragment>
            <MenuItem onClick={() => handleClose()}>
              <Link
                style={{ textDecoration: "none" }}
                to={"/profile/" + props.user.id}
              >
                Profile
              </Link>
            </MenuItem>

            <MenuItem style={{ color: "#007bff" }} onClick={() => signOut()}>
              Sign Out
            </MenuItem>
          </React.Fragment>
        ) : (
          <MenuItem onClick={() => handleClose()}>
            <Link style={{ textDecoration: "none" }} to="/login">
              Sign In
            </Link>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

function Header(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className="Logotype" to="/home">
              Battle-Tanks
            </Link>
          </Typography>
          <RenderProfileMenu
            user={props.user}
            signOut={props.signOut}
          ></RenderProfileMenu>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(setLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
